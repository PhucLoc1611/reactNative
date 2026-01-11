import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{todo.text}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.icon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#9b9dd6", // xanh tím nhạt
    padding: 16,
    marginVertical: 8,
    borderRadius: 14, // bo tròn
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
  subTitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  icon: {
    fontSize: 18,
  },
});
