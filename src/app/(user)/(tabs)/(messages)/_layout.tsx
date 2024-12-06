import { Pressable, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";

import { Avatar } from "@/components/ui";
import { useChat } from "@/hooks/useChat";

export default function MessagesLayout() {
  const router = useRouter();
  const { activeChat } = useChat();
  return (
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
              <Avatar size={36} name={activeChat?.name || ""} src={activeChat?.photo || ""} />
              <Text className="font-medium text-xl">{activeChat?.name}</Text>
            </View>
          )
        }}
      />
    </Stack>

  );
}
