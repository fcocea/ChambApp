import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Bubble, GiftedChat, IMessage, InputToolbar, Send } from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Redirect } from "expo-router";

import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";

const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL.replace("/v1", "");

export default function Chat() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { activeMessages, addMessage, activeSocket, setUpdatedChat, isChatUpdated } = useChat();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    (async () => {
      if (isChatUpdated && activeMessages) {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, activeMessages)
        );
        return;
      }
      setIsLoading(true);
      const response = await fetch(`${API_ENDPOINT}/chat/${id}/messages`, {
        headers: {
          access_token: `Bearer ${authState?.token}`
        }
      });
      const data = await response.json();
      const messages = data.map((message: any) => ({
        _id: message.id,
        text: message.message,
        createdAt: new Date(message.created_at),
        user: {
          _id: message.sender_rut
        }
      }));
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
      for (const message of messages) {
        addMessage(message);
      }
      setIsLoading(false);
      setUpdatedChat(id);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeMessages) {
      setMessages(previousMessages => activeMessages
      );
    }
  }, [activeMessages]);

  const onSend = useCallback((messages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    for (const message of messages) {
      addMessage(message);
    }
    if (!activeSocket) {
      return;
    }
    activeSocket.send(JSON.stringify({
      message: messages[0].text,
      message_id: messages[0]._id,
      user_id: authState?.user?.rut || -1,
      date: new Date(),
      chat_id: id
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.user?.rut, activeSocket, id]);

  const sortedMessages = useMemo(() => messages.sort((a: IMessage, b: IMessage) => (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime()), [messages]);

  if (!id) {
    return <Redirect href="/(messages)" />;
  }

  return (
    <View
      className="flex-1 bg-background w-full h-full min-h-[90vh] px-4"
      style={{
        paddingBottom: insets.bottom
      }}
    >
      {isLoading
        ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator />
            </View>
          )
        : (
            <GiftedChat
              messages={sortedMessages}
              onSend={messages => onSend(messages)}
              user={{ _id: authState?.user?.rut || -1 }}
              renderAvatar={null}
              renderUsernameOnMessage={false}
              placeholder="Mensaje"
              isLoadingEarlier={true}
              alwaysShowSend
              textInputProps={{
                className: "bg-[#F3F6F6] rounded-full px-4 w-full flex items-center mr-6 justify-center"
              }}
              maxComposerHeight={40}
              minComposerHeight={40}
              renderBubble={props => (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    right: {
                      backgroundColor: "#1B456D"
                    },
                    ...props.wrapperStyle
                  }}
                />
              )}
              renderInputToolbar={props => (
                <InputToolbar
                  {...props}
                  containerStyle={{ borderTopWidth: 0, height: 60, display: "flex", alignContent: "center", justifyContent: "center" }}
                />
              )}
              renderSend={props => (
                <Send
                  {...props}
                  containerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginRight: 15
                  }}
                >
                  <View className="bg-primary rounded-full flex items-center justify-center w-[40px] h-[40px]">
                    <Feather name="send" size={18} color="white" />
                  </View>
                </Send>
              )}
            />

          )}
    </View>
  );
}
