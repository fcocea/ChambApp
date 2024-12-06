import type { PropsWithChildren } from "react";
import { createContext, useCallback, useMemo, useState } from "react";
import { IMessage } from "react-native-gifted-chat";
import { useRouter } from "expo-router";

type ChatContextType = {
  activeChat: ActiveChatType | null;
  goToChat: (chat: ActiveChatType) => void;
  addMessage: (message: IMessage) => void;
  activeMessages: IMessage[] | null;
  getMessages: (chatId: string) => IMessage[] | null;
};

export const ChatContext = createContext<ChatContextType>({
  activeChat: null,
  goToChat: () => {},
  addMessage: () => {},
  activeMessages: null,
  getMessages: () => null
});

type ActiveChatType = {
  id: string | null;
  name: string | null;
  photo: string | null;
};

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [activeChat, setActiveChat] = useState<ActiveChatType | null>(null);
  const [storedMessages, setStoredMessages] = useState<Record<string, IMessage[]>>({});

  const router = useRouter();

  const goToChat = useCallback((chat: ActiveChatType) => {
    router.push(`./(messages)/chat/${chat.id}`);
    setActiveChat(chat);
  }, [router]);

  const addMessage = useCallback((message: IMessage) => {
    if (!activeChat?.id) {
      return;
    }
    setStoredMessages(previousMessages => ({
      ...previousMessages,
      [activeChat.id as string]: [message, ...(previousMessages[activeChat.id as string] || [])]
    }));
  }, [activeChat]);

  const getMessages = useCallback((chatId: string) => storedMessages[chatId] || null, [storedMessages]);
  const activeMessages = useMemo(() => storedMessages[activeChat?.id as string] || null, [activeChat, storedMessages]);
  const values = useMemo(() => ({ activeChat, goToChat, addMessage, activeMessages, getMessages }), [activeChat, goToChat, addMessage, activeMessages, getMessages]);

  return (
    <ChatContext.Provider value={values}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
