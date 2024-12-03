import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Star } from "lucide-react-native";

import formatMoney from "@/utils/formatMoney";
export default function HistoryView() {
  return (
    <View className="flex-1 bg-background flex-grow p-4">
      <View className="flex w-full border border-borderGray rounded-2xl overflow-hidden p-4 bg-white gap-2">
        <View className="rounded-xl overflow-hidden ">
          <Image source={{ uri: "https://i.pinimg.com/564x/b7/21/3d/b7213d2e2ca6435c504bfd4294c86288.jpg" }} style={{ width: "100%", height: 180 }} />
        </View>
        <View className="flex flex-col">
          <Text className="text-lg font-semibold text-[#333]">Mallplaza Trébol</Text>
          <Text className="text-sm text-[#50647D]">{new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
          <Text className="text-sm text-[#50647D]">
            {formatMoney(100000)}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center">
          <Pressable className="flex flex-row items-center gap-2 bg-primary rounded-xl px-4 py-2">
            <Text className="text-sm text-[#FFFF]">Calificar</Text>
            <Star size={16} color="#FFFF" />
          </Pressable>
        </View>
      </View>
      <View className="flex-1">

      </View>
    </View>
  );
}
