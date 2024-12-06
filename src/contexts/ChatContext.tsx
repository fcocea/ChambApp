import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { IMessage } from "react-native-gifted-chat";
import { useRouter, useSegments } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL.replace("/v1", "");

type ChatContextType = {
  activeChat: ActiveChatType | null;
  goToChat: (chat: ActiveChatType) => void;
  addMessage: (message: IMessage) => void;
  activeMessages: IMessage[] | null;
  getMessages: (chatId: string) => IMessage[] | null;
  activeSocket: WebSocket | null;
  connectToSocket: (chatId: string) => void;
  setUpdatedChat: (chatId: string) => void;
  isChatUpdated: boolean;
  loadingChats: boolean;
  chats: IChat[];
  fetchChats: () => Promise<void>;
};

export const ChatContext = createContext<ChatContextType>({
  activeChat: null,
  goToChat: () => {},
  addMessage: () => {},
  activeMessages: null,
  getMessages: () => null,
  activeSocket: null,
  connectToSocket: () => {},
  setUpdatedChat: () => {},
  isChatUpdated: false,
  loadingChats: false,
  chats: [],
  fetchChats: async () => {}
});

type ActiveChatType = {
  id: string | null;
  name: string | null;
  photo: string | null;
};

interface IChat {
  chat_id: string;
  chamber_name: string;
  created_by_name: string;
  you_are_chamber: boolean;
  last_message: string;
  you_sent: boolean;
  last_message_date: string;
}

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [activeChat, setActiveChat] = useState<ActiveChatType | null>(null);
  const [storedMessages, setStoredMessages] = useState<Record<string, IMessage[]>>({});
  const { authState } = useAuth();
  const [connectedSocket, setConnectedSocket] = useState<Record<string, WebSocket>>({});
  const [updatedChats, setUpdatedChats] = useState<Record<string, boolean>>({});
  const [loadingChats, setLoadingChats] = useState<boolean>(false);
  const [chats, setChats] = useState<IChat[]>([]);
  const segment = useSegments();
  const router = useRouter();

  const goToChat = useCallback((chat: ActiveChatType) => {
    if (!authState?.mode) {
      return;
    }
    if (segment[2] !== "(messages)") {
      router.replace(`/(${authState?.mode})/(tabs)/(messages)`);
    }
    setTimeout(() => {
      router.push(`/(${authState?.mode})/(tabs)/(messages)/chat/${chat.id}`);
    }, 100);
    setActiveChat(chat);
  }, [router, authState, segment]);

  const addMessageToChat = useCallback((chatId: string, message: IMessage) => {
    setStoredMessages(previousMessages => ({
      ...previousMessages,
      [chatId]: [message, ...(previousMessages[chatId] || [])]
    }));
  }, []);

  const addMessage = useCallback((message: IMessage) => {
    if (!activeChat?.id) {
      return;
    }
    addMessageToChat(activeChat.id, message);
  }, [activeChat, addMessageToChat]);

  const connectToSocket = useCallback((chatId: string) => {
    if (!authState?.token) {
      return;
    }
    if (connectedSocket[chatId]) {
      return;
    }
    const socket = new WebSocket(`${API_ENDPOINT}/chat/${chatId}?token=${authState?.token}`);
    socket.onopen = () => {
      console.log("Connected to socket", chatId);
    };
    socket.onerror = () => {
      console.log("Error connecting to socket", chatId);
    };
    socket.onmessage = event => {
      console.log("Message received", chatId);
      const { message, user_id, date, message_id } = JSON.parse(event.data);
      addMessageToChat(chatId, {
        _id: message_id,
        text: message,
        createdAt: new Date(date),
        user: { _id: user_id }
      });
    };
    setConnectedSocket(previousSockets => ({
      ...previousSockets,
      [chatId]: socket
    }));
  }, [authState, addMessageToChat, connectedSocket]);

  const setUpdatedChat = useCallback((chatId: string) => {
    setUpdatedChats(previousMessages => ({
      ...previousMessages,
      [chatId]: true
    }));
  }, []);

  const fetchChats = useCallback(async () => {
    if (!authState?.token) {
      return;
    }
    setLoadingChats(true);
    const response = await fetch(`${API_ENDPOINT}/chat`, {
      headers: { access_token: `Bearer ${authState?.token}` }
    });
    const data = await response.json();
    setChats(data);
    setLoadingChats(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    if (chats.length > 0) {
      for (const chat of chats) {
        connectToSocket(chat.chat_id);
      }
    }
  }, [chats, connectToSocket]);

  const isChatUpdated = useMemo(() => updatedChats[activeChat?.id as string] || false, [activeChat, updatedChats]);
  const activeSocket = useMemo(() => connectedSocket[activeChat?.id as string] || null, [activeChat, connectedSocket]);
  const getMessages = useCallback((chatId: string) => storedMessages[chatId] || null, [storedMessages]);
  const activeMessages = useMemo(() => storedMessages[activeChat?.id as string] || null, [activeChat, storedMessages]);
  const values = useMemo(() => ({ activeChat, goToChat, addMessage, activeMessages, getMessages, activeSocket, connectToSocket, setUpdatedChat, isChatUpdated, loadingChats, chats, fetchChats }), [activeChat, goToChat, addMessage, activeMessages, getMessages, activeSocket, connectToSocket, setUpdatedChat, isChatUpdated, loadingChats, chats, fetchChats]);

  return (
    <ChatContext.Provider value={values}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
