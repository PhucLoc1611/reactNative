import { View, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import TodoItem from "../../components/TodoItem";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text,
        completed: false,
      },
    ]);
    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add" onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => toggleTodo(item.id)}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f3fb", // ⭐ nền sáng
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10, // ⭐ bo góc
    marginBottom: 10,
    fontSize: 16,
  },
});
