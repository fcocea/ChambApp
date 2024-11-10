import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#2F80ED", tabBarInactiveTintColor: "#000000" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={24} name="home" color={color} />
        }}
      />
    </Tabs>
  );
}
