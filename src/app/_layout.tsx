import { useEffect } from "react";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";

import AuthProvider from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";

import "@/global.css";

SplashScreen.preventAutoHideAsync();

const DynamicStack = () => {
  const { authState, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }
    console.log(segments);
    if (!authState && segments[0] !== "(auth)") {
      router.replace("/(auth)");
    } else if (authState?.mode === "user" && segments[0] !== "(user)") {
      router.replace("/(user)");
    } else if (authState?.mode === "chamber" && segments[0] !== "(chamber)") {
      router.replace("/(chamber)");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, segments]);
  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <DynamicStack />
    </AuthProvider>
  );
}
