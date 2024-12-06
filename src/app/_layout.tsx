import { useEffect } from "react";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import * as SystemUI from "expo-system-ui";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import es from "javascript-time-ago/locale/es";

import AuthProvider from "@/contexts/AuthContext";
import ChatProvider from "@/contexts/ChatContext";
import { useAuth } from "@/hooks/useAuth";

import "@/global.css";

TimeAgo.addLocale(es);
TimeAgo.addLocale(en);

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("#FAFAFA");

const DynamicStack = () => {
  const { authState, firstLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!firstLoading) {
      SplashScreen.hideAsync();
    }
  }, [firstLoading]);

  useEffect(() => {
    if (firstLoading) {
      return;
    }
    if (!authState && segments[0] !== "(auth)") {
      router.replace("/(auth)/");
    } else if (authState?.mode === "user" && segments[0] !== "(user)") {
      router.replace("/(user)");
    } else if (authState?.mode === "chamber" && segments[0] !== "(chamber)") {
      router.replace("/(chamber)");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, segments, firstLoading]);

  return !firstLoading && <Slot screenOptions={{ animation: "slide_from_right" }} />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ChatProvider>
        <DynamicStack />
      </ChatProvider>
    </AuthProvider>
  );
}
