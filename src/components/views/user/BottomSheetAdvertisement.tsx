import { RefObject, useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { CheckCheck, Send } from "lucide-react-native";

import { Avatar, Separator } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import formatMoney from "@/utils/formatMoney";

import AdvertisementLocation from "./AdvertisementLocation";

const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;

const BottomSheetAdvertisement = ({ data, bottomSheetModalRef, handleRefresh }: { data: any; bottomSheetModalRef: RefObject<BottomSheetModal>
; handleRefresh?: () => void; }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { authState } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const taxService = useMemo(() => (data.price || 0) * 0.02, [data]);
  const iva = useMemo(() => ((data?.price || 0) + taxService) * 0.19, [data, taxService]);

  const handleFinalizeService = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`${API_ENDPOINT}/advertisements/${data?.ad_id}/end`, {
      method: "POST",
      headers: {
        Authorization: `${authState?.token}`
      }
    });
    if (response.ok) {
      setLoading(false);
      handleRefresh?.();
      bottomSheetModalRef.current?.close();
    } else {
      setLoading(false);
      const data = await response.json();
      Alert.alert("Error", data?.detail || "Error al finalizar el servicio");
    }
  }, [data, authState, handleRefresh, bottomSheetModalRef]);

  return (
    <BottomSheetView className="h-[550px] px-8 py-4 w-full">
      <View className="flex flex-row justify-between">
        <Text className="text-2xl font-semibold text-[#333]">{data?.title}</Text>
        <View className="flex flex-row gap-2">
          {data?.areas?.map((area: string, index: number) => (
            <View key={index} className="bg-primary rounded-md px-2 py-1 items-center justify-center">
              <Text className="text-xs text-white">{area}</Text>
            </View>
          ))}
        </View>
        {/* <View className="flex flex-row items-center gap-1">
              <Text className="text-base font-semibold text-[#50647D]">
                {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(data?.price)}
              </Text>
            </View> */}
      </View>
      <Separator className="my-4" color="#FAFAFA" />
      <View className="rounded-xl overflow-hidden border border-separator mb-4">
        <AdvertisementLocation />
      </View>
      <View className="flex flex-col gap-4">
        <View className="flex flex-row justify-between gap-6">
          <View className="flex flex-1">
            <Text className="text-base font-semibold text-[#333]">Descripción</Text>
            <Text className="text-sm text-[#50647D] truncate line-clamp-2">
              {data?.description}
            </Text>
          </View>
          <View className="flex flex-col items-center gap-1">
            {/* <Text className="text-base font-semibold text-[#333]">Chamber</Text> */}
            <Avatar size={36} name={data?.accepted_chamber} />
            <Text className="text-sm text-[#50647D]">
              {data?.accepted_chamber}
            </Text>
          </View>
        </View>
        <Text className="text-xs text-[#50647D] mt-auto">
          La tarea comenzó el
          {" "}
          <Text className="font-semibold">
            {new Date(data?.start_date).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </Text>
          {" "}
          Al finalizar la tarea, podrás calificar al
          {" "}
          <Text className="font-semibold">
            chamber
          </Text>
          {" "}
          y se te desconectará automáticamente el costo del servicio (
          {formatMoney(iva + taxService + (data?.price || 0))}
          )
        </Text>
      </View>
      <View className="flex flex-col gap-2 mt-auto" style={{ marginBottom: insets.bottom }}>
        <TouchableOpacity
          className="w-full py-4 px-3 bg-white border-borderGray border rounded-xl"
          onPress={() => {
            bottomSheetModalRef.current?.close();
            router.push(`./(messages)/chat/12`);
          }}
        >
          <View className="self-center flex flex-row items-center justify-center gap-2">
            <Send size={18} color="#1b456d" />
            <Text className="text-primary text-center text-base font-medium w-fit">Continuar al chat</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full py-4 px-3 bg-primary rounded-xl disabled:opacity-50"
          disabled={loading}
          onPress={handleFinalizeService}
        >
          <View className="self-center flex flex-row items-center justify-center gap-2">
            {loading
              ? <ActivityIndicator size="small" color="#fff" />
              : <CheckCheck size={18} color="#ffffff" />}
            <Text className="text-white text-center text-base font-medium w-fit">Finalizar servicio</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );
};

export default BottomSheetAdvertisement;
