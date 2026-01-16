import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#9b9dd6",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },
        tabBarActiveTintColor: "#4F46E5",
      }}
    >
      {/* TAB TODO */}
      <Tabs.Screen
        name="index"
        options={{
          title: "To-Do List",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />

      {/* TAB COMPLETED */}
      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed",
          tabBarIcon: ({ color, size }) => (
            <Feather name="check-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
