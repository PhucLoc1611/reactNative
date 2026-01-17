// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Feather } from "@expo/vector-icons";

// type Todo = {
//   id: string;
//   title: string;
//   text: string;
//   completed: boolean;
// };

// type Props = {
//   todo: Todo;
//   onToggle: () => void;
//   onDelete: () => void;
//   onEdit: () => void;
// };

// export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
//   return (
//     <View style={styles.item}>
//       {/* Toggle */}
//       <TouchableOpacity onPress={onToggle} style={styles.left}>
//         <View
//           style={[styles.checkbox, todo.completed && styles.checkboxDone]}
//         />
//         <View>
//           <Text style={[styles.title, todo.completed && styles.doneText]}>
//             {todo.title}
//           </Text>
//           <Text style={styles.text}>{todo.text}</Text>
//         </View>
//       </TouchableOpacity>

//       {/* Actions */}
//       <View style={styles.actions}>
//         {/* ✏️ EDIT */}
//         <TouchableOpacity onPress={onEdit}>
//           <Feather name="edit" size={20} color="#6C6EE8" />
//         </TouchableOpacity>

//         {/* 🗑 DELETE */}
//         <TouchableOpacity onPress={onDelete}>
//           <Feather name="trash-2" size={20} color="#FF5A5A" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   item: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 14,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   left: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     flex: 1,
//   },
//   checkbox: {
//     width: 22,
//     height: 22,
//     borderRadius: 6,
//     borderWidth: 2,
//     borderColor: "#6C6EE8",
//   },
//   checkboxDone: {
//     backgroundColor: "#6C6EE8",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   text: {
//     fontSize: 13,
//     color: "#666",
//   },
//   doneText: {
//     textDecorationLine: "line-through",
//     color: "#999",
//   },
//   actions: {
//     flexDirection: "row",
//     gap: 12,
//   },
// });
