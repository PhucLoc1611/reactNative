import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

const STORAGE_KEY = "@todos";

type Todo = {
  id: string;
  title: string;
  text: string;
  completed: boolean;
};

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visible, setVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  /* ---------- LOAD ---------- */
  const loadTodos = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    setTodos(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  /* ---------- ADD ---------- */
  const openAdd = () => {
    setEditingTodo(null);
    setTitle("");
    setText("");
    setVisible(true);
  };

  /* ---------- EDIT ---------- */
  const openEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setText(todo.text);
    setVisible(true);
  };

  /* ---------- TOGGLE COMPLETE ---------- */
  const toggleTodo = async (id: string) => {
    const newTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(newTodos);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  };

  /* ---------- SAVE ---------- */
  const saveTodo = async () => {
    if (!title.trim() || !text.trim()) return;

    let newTodos: Todo[];

    if (editingTodo) {
      newTodos = todos.map((t) =>
        t.id === editingTodo.id ? { ...t, title, text } : t
      );
    } else {
      newTodos = [
        {
          id: Date.now().toString(),
          title,
          text,
          completed: false,
        },
        ...todos,
      ];
    }

    setTodos(newTodos);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    setVisible(false);
  };

  /* ---------- DELETE ---------- */
  const removeTodo = async (id: string) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  };

  /* ---------- RENDER ITEM ---------- */
  const renderItem = ({ item }: { item: Todo }) => (
    <View style={[styles.todo, item.completed && styles.todoCompleted]}>
      {/* CHECKBOX */}
      <TouchableOpacity onPress={() => toggleTodo(item.id)}>
        <Feather
          name={item.completed ? "check-circle" : "circle"}
          size={22}
          color={item.completed ? "#22C55E" : "#6366F1"}
        />
      </TouchableOpacity>

      {/* TEXT */}
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, item.completed && styles.textCompleted]}>
          {item.title}
        </Text>
        <Text style={[styles.text, item.completed && styles.textCompleted]}>
          {item.text}
        </Text>
      </View>

      {/* ACTION */}
      <TouchableOpacity onPress={() => openEdit(item)}>
        <Feather name="edit" size={20} color="#4F46E5" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => removeTodo(item.id)}>
        <Feather name="trash" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>📝 Todo App</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* ADD BUTTON */}
      <TouchableOpacity style={styles.fab} onPress={openAdd}>
        <Feather name="plus" size={26} color="#fff" />
      </TouchableOpacity>

      {/* FULL SCREEN ADD / UPDATE */}
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalFull}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Feather name="arrow-left" size={24} />
            </TouchableOpacity>

            <Text style={styles.modalHeaderTitle}>
              {editingTodo ? "Update Todo" : "New Todo"}
            </Text>

            <View style={{ width: 24 }} />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Content"
            value={text}
            onChangeText={setText}
            multiline
          />

          <TouchableOpacity style={styles.btn} onPress={saveTodo}>
            <Text style={styles.btnText}>{editingTodo ? "Update" : "Add"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

/* ---------- STYLE ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C6EE8",
  },

  header: {
    padding: 20,
    backgroundColor: "#1E1FBF",
  },

  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
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

  todoCompleted: {
    opacity: 0.5,
  },

  title: {
    fontWeight: "700",
    fontSize: 16,
  },

  text: {
    color: "#555",
  },

  textCompleted: {
    textDecorationLine: "line-through",
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#4F46E5",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  modalFull: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },

  modalHeaderTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  textArea: {
    height: 140,
    textAlignVertical: "top",
  },

  btn: {
    marginTop: 20,
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});
