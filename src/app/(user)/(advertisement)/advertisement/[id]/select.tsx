import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import Separator from "@/components/Separator";

export default function AdvertisementSelect() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <View className="flex-1 bg-white w-full h-full px-6 flex gap-8 pt-6">
      <View className="w-full bg-primary rounded-[25px] h-[162px] px-6 py-[25px] justify-between">
        <Pressable className="flex gap-1" onPress={() => router.push(`/(advertisement)/advertisement/${id}/review`)}>
          <Text className="text-white text-lg font-medium">{id}</Text>
          <Text className="text-white text-xs">Edmundo Larenas 219, Concepción</Text>
        </Pressable>
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row gap-5">
            <View className="bg-[#3389FD] px-[10px] py-[5px] rounded-md">
              <Text className="text-white text-sm">Limpieza</Text>
            </View>
            <View className="bg-[#3389FD] px-[10px] py-[5px] rounded-md">
              <Text className="text-white text-sm">Otras</Text>
            </View>
          </View>
          <Text className="text-white font-medium text-lg">
            $25.000
          </Text>
        </View>
      </View>
      <Separator text="Ordenar por: Recomendado" />
    </View>
  );
}
