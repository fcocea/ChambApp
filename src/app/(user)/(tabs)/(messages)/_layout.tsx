import type { Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";

import { Avatar } from "@/components/ui";

type ActiveChatType = {
  id: string | null;
  name: string | null;
  photo: string | null;
};

type ActiveChatContextType = {
  setActiveChat: Dispatch<SetStateAction<ActiveChatType>>;
};

export const ActiveChatContext = createContext<ActiveChatContextType>({
  setActiveChat: () => {}
});

export const unstable_settings = {
  initialRouteName: "index"
};

export default function MessagesLayout() {
  const [activeChat, setActiveChat] = useState<ActiveChatType>({
    id: "12",
    name: "Chat de prueba",
    photo: ""
  });
  const router = useRouter();
  return (
    <ActiveChatContext.Provider value={{
      setActiveChat
    }}
    >
      <Stack screenOptions={{
        headerTintColor: "#333333",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "#FAFAFA"
        },
        animation: "slide_from_right",
        headerShadowVisible: false,
        headerBackButtonMenuEnabled: false,
        headerBackVisible: false
      }}
      >
        <Stack.Screen name="index" options={{ title: "Mensajes" }} />
        <Stack.Screen
          name="chat/[id]"
          options={{
            title: "",
            headerLeft: () => (
              <Pressable onPress={() => router.back()} className="mr-2">
                <Feather name="chevron-left" size={24} color="black" />
              </Pressable>
            ),
            headerTitle: () => (
              <View className="flex flex-row items-center gap-2 pb-1">
                <Avatar size={36} name={activeChat.name || ""} src={activeChat?.photo || ""} />
                <Text className="font-medium text-xl">{activeChat.name}</Text>
              </View>
            )
          }}
        />
      </Stack>
    </ActiveChatContext.Provider>
  );
}
