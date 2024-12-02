import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Tabs, useSegments } from "expo-router";
import { CircleUserRound, FileClock, House, Send } from "lucide-react-native";

import { TabBar } from "@/components/ui";

export default function TabLayout() {
  const segments = useSegments();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Tabs
          screenOptions={{ tabBarActiveTintColor: "#1B456D", tabBarInactiveTintColor: "#3333" }}
          tabBar={props => <TabBar {...props} />}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Inicio",
              headerShown: false,
              tabBarIcon: ({ color, size }) => <House width={size} color={color} />
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: "Historial",
              // headerShown: false,
              headerTintColor: "#FFFF",
              headerStyle: {
                backgroundColor: "#1B456D"
              },
              tabBarIcon: ({ color, size }) => <FileClock size={size} color={color} />
            }}
          />
          <Tabs.Screen
            name="(messages)"
            options={{
              title: "Mensajes",
              headerShown: false,
              tabBarIcon: ({ color, size }) => <Send size={size} color={color} />,
              headerShadowVisible: false,
              tabBarStyle: {
                display: segments[4] === "[id]" ? "none" : "flex"
              }
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Perfil",
              headerShown: true,
              headerShadowVisible: false,
              headerTintColor: "#FFFF",
              headerStyle: {
                backgroundColor: "#1B456D"
              },
              tabBarIcon: ({ color, size }) => <CircleUserRound size={size} color={color} />
            }}
          />
        </Tabs>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
