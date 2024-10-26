import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";

import AuthProvider from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";

import "@/global.css";

const DynamicStack = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  useEffect(() => {
    if (!authState && segments[0] !== "(unauthenticated)") {
      return router.replace("/(unauthenticated)");
    }
    if (authState?.mode === "user" && segments[0] !== "(user)") {
      return router.replace("/(user)");
    }
    if (authState?.mode === "chamber" && segments[0] !== "(chamber)") {
      return router.replace("/(chamber)");
    }
  }, [authState, router, segments]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(unauthenticated)" />
      <Stack.Screen name="(user)" />
      <Stack.Screen name="(chamber)" />
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
