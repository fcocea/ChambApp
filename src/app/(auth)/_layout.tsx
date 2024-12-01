import { Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

export default function RootLayout() {
  const { authState } = useAuth();
  const router = useRouter();
  return (
    <Stack screenOptions={{
      headerTitle: "",
      headerTintColor: "#333333",
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#FAFAFA"
      },
      headerShadowVisible: false
    }}
    >
      <Stack.Screen name="index" redirect={authState !== null} />
      <Stack.Screen
        name="sign-up"
        redirect={authState !== null}
        options={{
          headerLeft: () => (
            <Pressable onPress={() => router.back()} className="w-8 h-8 flex items-center justify-center">
              <Feather name="chevron-left" size={24} color="black" />
            </Pressable>
          )
        }}
      />
    </Stack>
  );
}
