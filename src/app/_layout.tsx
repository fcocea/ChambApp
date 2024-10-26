import { Stack } from "expo-router";

import AuthProvider from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";

import "@/global.css";

const DynamicStack = () => {
  const { authState } = useAuth();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(user)" redirect={authState} />
      <Stack.Screen name="(chamber)" redirect={authState === null} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <DynamicStack />
    </AuthProvider>
  );
}
