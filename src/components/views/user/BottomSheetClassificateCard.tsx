import { RefObject, useState } from "react";
import { ActivityIndicator, Pressable, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Star } from "lucide-react-native";

import { useAuth } from "@/hooks/useAuth";

const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;

const BottomSheetClassificateCard = ({ bottomSheetModalRef, ad_id, updateHistoryScore }: { bottomSheetModalRef: RefObject<BottomSheetModal>; ad_id: string; updateHistoryScore: (ad_id: string, score: number) => void }) => {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useAuth();

  const handleSend = async () => {
    setLoading(true);
    const response = await fetch(`${API_ENDPOINT}/advertisements/${ad_id}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${authState?.token}`
      },
      body: JSON.stringify({
        score: `${rating}`
      })
    });
    if (response.ok) {
      updateHistoryScore(ad_id, rating);
      bottomSheetModalRef.current?.close();
    }
    setLoading(false);
  };

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
            bottomSheetModalRef.current?.dismiss();
          }}
        >
          <View className="self-center flex flex-row items-center justify-center gap-2">
            <Text className="text-primary text-center text-base font-medium w-fit">Cancelar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full py-4 px-3 bg-primary rounded-xl disabled:opacity-50"
          disabled={loading}
          onPress={handleSend}
        >
          <View className="self-center">
            {loading
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text className="text-white text-center text-base font-medium w-fit">Enviar</Text>}
          </View>
        </TouchableOpacity>

      </View>
    </BottomSheetView>
  );
};

export default BottomSheetClassificateCard;
