import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { Avatar, Skeleton } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import convertHour from "@/utils/convertHour";
import TimeAgo from "@/utils/timeAgo";

const API_URL = process.env.EXPO_PUBLIC_API_URL.replace("/v1", "");

interface IChat {
  chat_id: string;
  chamber_name: string;
  created_by_name: string;
  you_are_chamber: boolean;
  last_message: string;
  you_sent: boolean;
  last_message_date: string;
}

function RecentChatSkeleton() {
  return (
    <View className="flex flex-row justify-between">
      <View className="flex-1 flex flex-row gap-3 items-center">
        <Skeleton circle width={48} />
        <View className="flex justify-between py-1 gap-1">
          <Skeleton width={120} height={16} />
          <Skeleton width={200} height={12} />
        </View>
      </View>
      <View className="flex justify-between py-1">
        <Skeleton width={30} height={12} />
      </View>
    </View>
  );
}

function RecentChat({ data }: { data: IChat }) {
  const { goToChat, getMessages } = useChat();
  const lastMessage = getMessages(data.chat_id)?.[0];
  const { authState } = useAuth();
  return (
    <Pressable
      className="flex flex-row justify-between"
      onPress={() => {
        goToChat({
          id: data.chat_id,
          name: data.you_are_chamber ? data.created_by_name : data.chamber_name,
          photo: ""
        });
      }}
    >
      <View className="flex-1 flex flex-row gap-3 items-center">
        <Avatar size={48} name={data.you_are_chamber ? data.created_by_name : data.chamber_name} />
        <View className="flex justify-between py-1">
          <Text className="text-lg font-semibold">
            {data.you_are_chamber ? data.created_by_name : data.chamber_name}
          </Text>
          <Text className="text-base font-light">
            {data.you_sent || lastMessage?.user._id === authState?.user?.rut ? "Tú: " : ""}
            {lastMessage?.text || data.last_message}
          </Text>
        </View>
      </View>
      <View className="flex justify-between py-1">
        <Text className="text-base font-light">
          {data?.last_message_date && <TimeAgo date={convertHour(new Date(lastMessage?.createdAt || data.last_message_date))} />}
        </Text>
      </View>
    </Pressable>
  );
}
export default function Messages() {
  const [loading, setLoading] = useState<boolean>(true);
  const { authState } = useAuth();
  const [data, setData] = useState<IChat[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_URL}/chat`, {
        headers: {
          access_token: `Bearer ${authState?.token}`
        }
      });
      const data = await response.json();
      setData(data);
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 w-full h-full flex px-4 gap-3">
          <View className="flex flex-row bg-foreground border border-separator w-full h-12 justify-center items-center gap-2 px-3 rounded-2xl">
            <Feather name="search" size={20} color="333333" />
            <TextInput className="flex-1 h-full w-full py-[7px]" placeholder="Buscar mensaje" />
          </View>
          <ScrollView className="w-full h-full flex flex-col" contentContainerClassName="gap-3 pb-8" showsVerticalScrollIndicator={false}>
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                <RecentChatSkeleton key={index} />
              ))
              : data.map((data, index) => (
                <RecentChat key={index} data={data} />
              ))}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
