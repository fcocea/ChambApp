import { Stack } from "expo-router";

import ChatProvider from "@/contexts/ChatContext";

export const unstable_settings = {
  initialRouteName: "(tabs)"
};

export default function RootLayout() {
  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(advertisement)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
}
