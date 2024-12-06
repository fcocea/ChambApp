import { useMemo } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, Pressable, RefreshControl, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import Feather from "@expo/vector-icons/Feather";

import { Avatar, Skeleton } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import convertHour from "@/utils/convertHour";
import TimeAgo from "@/utils/timeAgo";

const SCREEN_HEIGHT = Dimensions.get("window").height;

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
  const recentMessage = useMemo(() => lastMessage ? lastMessage?.createdAt > new Date(data?.last_message_date) ? lastMessage : data : data, [lastMessage, data]);
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
            {(recentMessage as IMessage)?.user?._id === authState?.user?.rut || (recentMessage as IChat)?.you_sent ? "Tú: " : ""}
            {(recentMessage as IMessage)?.text || (recentMessage as IChat)?.last_message}
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
export default function ChatList() {
  const { loadingChats, chats, fetchChats } = useChat();

  const onRefresh = async () => {
    fetchChats();
  };

  return (
    <KeyboardAvoidingView
      className="flex bg-background flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full flex px-4 gap-3 flex-1" style={{ height: SCREEN_HEIGHT }}>
          <View className="flex flex-row bg-foreground border border-separator w-full h-12 justify-center items-center gap-2 px-3 rounded-2xl">
            <Feather name="search" size={20} color="333333" />
            <TextInput className="flex-1 h-full w-full py-[7px]" placeholder="Buscar mensaje" />
          </View>
          <View className="flex-grow h-full flex-1">
            <ScrollView
              contentContainerClassName="flex-grow"
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              refreshControl={(
                <RefreshControl
                  refreshing={loadingChats}
                  onRefresh={onRefresh}
                  colors={["#1B456D"]}
                  progressBackgroundColor="#1B456D"
                />
              )}
            >
              {loadingChats
                ? Array.from({ length: 8 }).map((_, index) => (
                  <RecentChatSkeleton key={index} />
                ))
                : chats?.length > 0
                  ? (
                      <Pressable className="h-full">
                        {chats.map((chat, index) => (
                          <RecentChat key={index} data={chat} />
                        ))}
                      </Pressable>
                    )
                  : (
                      <Pressable className="h-full items-center justify-center">
                        <Text className="text-base font-light">No hay mensajes recientes</Text>
                      </Pressable>
                    )}
            </ScrollView>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
