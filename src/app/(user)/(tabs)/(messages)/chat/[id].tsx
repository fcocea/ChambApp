import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Bubble, GiftedChat, IMessage, InputToolbar, Send } from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

export default function Chat() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { authState } = useAuth();

  const socket = useMemo(() => new WebSocket(`${process.env.EXPO_PUBLIC_API_URL.replace("/v1", "")}/messages/${id}`), [id]);

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket.onmessage = event => {
      const { message, user_id, date, message_id } = JSON.parse(event.data);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [{
          _id: message_id,
          text: message,
          createdAt: new Date(date),
          user: {
            _id: user_id
          }
        }])
      );
    };
    return () => {
      socket.close();
    };
  }, [socket, id]);

  const onSend = useCallback((messages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    socket.send(JSON.stringify({
      message: messages[0].text,
      message_id: messages[0]._id,
      user_id: authState?.user?.rut || -1,
      date: new Date(),
      chat_id: id
    }));
  }, [authState?.user?.rut, socket, id]);

  return (
    <View
      className="flex-1 bg-background w-full h-full min-h-[90vh] px-4"
      style={{
        paddingBottom: insets.bottom
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: authState?.user?.rut || -1 }}
        renderAvatar={null}
        renderUsernameOnMessage={false}
        placeholder="Mensaje"
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
    </View>
  );
}
