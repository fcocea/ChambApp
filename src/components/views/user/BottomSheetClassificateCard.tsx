import { RefObject, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Send } from "lucide-react-native";
import { Star } from "lucide-react-native";

const BottomSheetClassificateCard = ({ bottomSheetModalRef }: { bottomSheetModalRef: RefObject<BottomSheetModal> }) => {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState<number>(0);
  return (
    <BottomSheetView className="px-8 py-4 w-full">
      <Text className="text-center text-2xl font-semibold">
        Calificar servicio
      </Text>
      <View className="flex flex-row items-center justify-center gap-2 my-16">
        {
          Array.from({ length: 5 }).map((_, index) => (
            <Pressable key={index} onPress={() => setRating(index + 1)}>
              <Star key={index} size={32} color={rating >= index + 1 ? "#1b456d" : "#e0e0e0"} fill={rating >= index + 1 ? "#1b456d" : "#e0e0e0"} />
            </Pressable>
          ))
        }
      </View>
      <View className="flex flex-col gap-2 mt-4" style={{ marginBottom: insets.bottom }}>
        <TouchableOpacity
          className="w-full py-4 px-3 bg-white border-borderGray border rounded-xl"
          onPress={() => {
            bottomSheetModalRef.current?.close();
          }}
        >
          <View className="self-center flex flex-row items-center justify-center gap-2">
            <Send size={18} color="#1b456d" />
            <Text className="text-primary text-center text-base font-medium w-fit">Cancelar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full py-4 px-3 bg-primary rounded-xl disabled:opacity-50"
        >
          <View className="self-center flex flex-row items-center justify-center gap-2">
            <Star size={18} color="#ffffff" />
            <Text className="text-white text-center text-base font-medium w-fit">Enviar</Text>
          </View>
        </TouchableOpacity>

      </View>
    </BottomSheetView>
  );
};

export default BottomSheetClassificateCard;
