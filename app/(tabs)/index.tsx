import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from "../../components/TodoItem";

type Todo = {
  id: string;
  title: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = "@todos";

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const router = useRouter();

  // 🔄 Load lại khi quay về screen
  useFocusEffect(
    useCallback(() => {
      loadTodos();
    }, [])
  );

  const loadTodos = async (): Promise<void> => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    setTodos(data ? JSON.parse(data) : []);
  };

  const toggleTodo = async (id: string): Promise<void> => {
    const newTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(newTodos);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  };

  const deleteTodo = async (id: string): Promise<void> => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  };

  const goEdit = (todo: Todo): void => {
    router.push({
      pathname: "/add",
      params: {
        id: todo.id,
        title: todo.title,
        text: todo.text,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Todo App</Text>

      {/* ➕ ADD */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => toggleTodo(item.id)}
            onDelete={() => deleteTodo(item.id)}
            onEdit={() => goEdit(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#6a64e8",
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
    padding: 16,
    backgroundColor: "#1810b9",
    color: "#fff",
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 40,
  },
  addBtn: {
    position: "absolute",
    right: 20,
    bottom: 30, // 👈 QUAN TRỌNG: đưa xuống dưới
    width: 60,
    height: 60,
    borderRadius: 30, // 👈 hình tròn chuẩn FAB
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },

  addText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "600",
  },
});
