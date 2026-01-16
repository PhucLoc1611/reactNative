import { View, Text, FlatList, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { Feather } from "@expo/vector-icons";

const STORAGE_KEY = "@todos";

type Todo = {
  id: string;
  title: string;
  text: string;
  completed: boolean;
};

export default function CompletedScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const all: Todo[] = data ? JSON.parse(data) : [];
    setTodos(all.filter((t) => t.completed));
  };

  // RẤT QUAN TRỌNG cho Tabs
  useFocusEffect(
    useCallback(() => {
      loadTodos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={styles.empty}>Chưa có todo nào hoàn thành</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.todo}>
            <Feather name="check-circle" size={22} color="#22C55E" />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
  },
  todo: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  text: {
    color: "#555",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
  },
});
