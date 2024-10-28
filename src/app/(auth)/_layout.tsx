import { Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";

import { useAuth } from "../../hooks/useAuth";
export default function RootLayout() {
  const { authState } = useAuth();
  const router = useRouter();
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} redirect={authState !== null} />
      <Stack.Screen
        name="sign-up"
        redirect={authState !== null}
        options={{
          headerTitle: "",
          headerTintColor: "#333333",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#ffffff"
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="chevron-left" size={24} color="black" />
            </Pressable>
          )
        }}
      />
    </Stack>
  );
}
