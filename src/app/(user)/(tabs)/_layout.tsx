import Feather from "@expo/vector-icons/Feather";
import { Tabs, useSegments } from "expo-router";

export default function TabLayout() {
  const segments = useSegments();
  return (
    <Tabs sceneContainerStyle={{ backgroundColor: "#FFFF" }} screenOptions={{ tabBarActiveTintColor: "#2F80ED", tabBarInactiveTintColor: "#000000" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={24} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="(messages)"
        options={{
          title: "Mensajes",
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={24} name="message-square" color={color} />,
          headerShadowVisible: false,
          tabBarStyle: {
            display: segments[4] === "[id]" ? "none" : "flex"
          }
        }}
      />
    </Tabs>
  );
}
