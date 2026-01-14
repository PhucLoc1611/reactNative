import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@todos";

export default function AddTodoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const isEdit = !!params.id;

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (isEdit) {
        setTitle(String(params.title));
        setText(String(params.text));
      } else {
        setTitle("");
        setText("");
      }
    }, [isEdit])
  );

  const saveTodo = async () => {
    if (!title.trim() || !text.trim()) return;

    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const todos = data ? JSON.parse(data) : [];

    let newTodos;

    if (isEdit) {
      newTodos = todos.map((t: any) =>
        t.id === params.id ? { ...t, title, text } : t
      );
    } else {
      newTodos = [
        { id: Date.now().toString(), title, text, completed: false },
        ...todos,
      ];
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* 🔙 NÚT QUAY VỀ */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Quay về</Text>
      </TouchableOpacity>

      <Text style={styles.header}>
        {isEdit ? "✏️ Update Todo" : "➕ New Todo"}
      </Text>

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
        <Text style={styles.btnText}>{isEdit ? "Update" : "Add"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F6FB",
  },

  /* 🔙 BACK BUTTON */
  backBtn: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f22e5",
  },

  header: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  btn: {
    backgroundColor: "#6C6EE8",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});
