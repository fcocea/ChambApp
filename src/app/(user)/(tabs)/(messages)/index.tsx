import { useContext, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

import { Avatar, Skeleton } from "@/components/ui";

import { ActiveChatContext } from "./_layout";

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

const dummyData = [
  {
    id: "12",
    name: "Chat de prueba",
    photo: ""
  }
];

function RecentChat({ data }: { data: { id: string; name: string; photo: string } }) {
  const router = useRouter();
  const { setActiveChat } = useContext(ActiveChatContext);
  return (
    <Pressable
      className="flex flex-row justify-between"
      onPress={() => {
        setActiveChat({
          id: "12",
          name: data.name,
          photo: ""
        });
        router.push(`./(messages)/chat/${data.id}`);
      }}
    >
      <View className="flex-1 flex flex-row gap-3 items-center">
        <Avatar size={48} name={data.name} />
        <View className="flex justify-between py-1">
          <Text className="text-lg font-semibold">
            {data.name}
          </Text>
          <Text className="text-base font-light">
            Tú: Hola, ¿cómo estás?
          </Text>
        </View>
      </View>
      <View className="flex justify-between py-1">
        <Text className="text-base font-light">
          1 min
        </Text>
      </View>
    </Pressable>
  );
}
export default function Messages() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 w-full h-full flex px-4 gap-3">
          <View className="flex flex-row bg-[#F3F6F6] w-full h-9 justify-center items-center gap-2 px-3 rounded-2xl">
            <Feather name="search" size={20} color="333333" />
            <TextInput className="flex-1 h-full w-full py-[7px]" placeholder="Buscar mensaje" />
          </View>
          <ScrollView className="w-full h-full flex flex-col" contentContainerClassName="gap-3 pb-8" showsVerticalScrollIndicator={false}>
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                <RecentChatSkeleton key={index} />
              ))
              : dummyData.map((data, index) => (
                <RecentChat key={index} data={data} />
              ))}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
