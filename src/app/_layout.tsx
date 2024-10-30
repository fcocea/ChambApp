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
    if (segments[0] === "_sitemap") {
      return;
    }
    if (!authState && segments[0] !== "(auth)") {
      router.replace("/(auth)");
    } else if (authState?.mode === "user" && segments[0] !== "(user)" && segments[0] !== "") {
      router.replace("/(user)");
    } else if (authState?.mode === "chamber" && segments[0] !== "(chamber)") {
      router.replace("/(chamber)");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, segments]);
  return <Slot screenOptions={{ animation: "slide_from_right" }} />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <DynamicStack />
    </AuthProvider>
  );
}
