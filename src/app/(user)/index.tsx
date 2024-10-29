import { Pressable, ScrollView, Text, View } from "react-native";

// import { useAuth } from "../../hooks/useAuth";

export default function Index() {
  // const { setAuthState } = useAuth();
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="font-bold">Hola Juan</Text>
      <View className="flex flex-row gap-8">
        <Pressable className="rounded-[12px] bg-[#2F80ED] px-4 p-2 ">
          <Text className="font-bold text-white">Tus anuncios</Text>
        </Pressable>
        <Pressable className="rounded-[12px] bg-[#2F80ED] px-4 p-2 ">
          <Text className="font-bold text-white">Historial</Text>
        </Pressable>
        <Pressable className="rounded-[25px] bg-[#2F80ED] px-4 p-2 ">
          <Text className="font-bold text-white">+</Text>
        </Pressable>
      </View>
      <ScrollView>

      </ScrollView>
    </View>
  );
}
