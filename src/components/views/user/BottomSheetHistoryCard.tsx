import { RefObject, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Star } from "lucide-react-native";

import { Avatar, Separator } from "@/components/ui";
import formatMoney from "@/utils/formatMoney";

import AdvertisementLocation from "./AdvertisementLocation";

const BottomSheetHistoryCard = ({ data, bottomSheetModalRef, handleClassificate }: { data: any; bottomSheetModalRef: RefObject<BottomSheetModal>; handleClassificate: () => void }) => {
  const insets = useSafeAreaInsets();
  const taxService = useMemo(() => (data.price || 0) * 0.02, [data]);
  const iva = useMemo(() => ((data?.price || 0) + taxService) * 0.19, [data, taxService]);
  const isItClassifiable = useMemo(() => !data?.score_to_chamber, [data]); // Do logic to limit the time to classify

  return (
    <BottomSheetView className="px-8 py-4 w-full">
      <View>
        <View className="flex flex-row justify-between">
          <Text className="text-2xl font-semibold text-[#333]">{data?.title}</Text>
          <View className="flex flex-row gap-2">
            {data?.score_to_chamber
              ? (
                  <View className="flex flex-row items-center gap-1">
                    <Text>{data?.score_to_chamber}</Text>
                    <Star size={18} color="#1b456d" />
                  </View>
                )
              : (
                  <View className="bg-primary rounded-md px-2 py-1 items-center justify-center">
                    <Text className="text-xs text-white">Finalizado</Text>
                  </View>
                )}
          </View>
        </View>
        <Text className="text-sm text-[#50647D]">{"Finalizado el " + new Date(data?.end_date).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
      </View>
      <Separator className="my-4" color="#FAFAFA" />
      <View className="rounded-xl overflow-hidden border border-separator mb-4">
        <AdvertisementLocation />
      </View>
      <View className="flex flex-col gap-1">
        <View className="flex flex-row justify-between gap-6">
          <View className="flex flex-1">
            <Text className="text-base font-semibold text-[#333]">Descripción</Text>
            <Text className="text-sm text-[#50647D] truncate line-clamp-2">
              {data?.description}
            </Text>
          </View>
          <View className="flex flex-col items-center gap-1">
            <Avatar size={36} name={data?.assigned_to_first_name + " " + data?.assigned_to_last_name} />
            <Text className="text-sm text-[#50647D]">
              {data?.assigned_to_first_name + " " + data?.assigned_to_last_name}
            </Text>
          </View>
        </View>
        <Separator className="my-2" color="#E5E7EB" />
        <View className="justify-between flex items-center flex-row">
          <Text className="text-base font-semibold text-[#333]">Areas</Text>
          <Text className="text-base">
            {data?.areas?.join(", ")}
          </Text>
        </View>
        <View className="justify-between flex items-center flex-row">
          <Text className="text-base font-semibold text-[#333]">Dirección</Text>
          <Text className="text-base">
            {data?.address}
          </Text>
        </View>
        <Separator className="my-2" color="#E5E7EB" />
        <View className="flex flex-col gap-2">
          <Text className="font-medium">Precio</Text>
          <View className="flex flex-col pl-1">
            <View className="flex justify-between w-full flex-row">
              <Text className="text-base">Servicio</Text>
              <Text className="text-base font-light">{formatMoney(data?.price || 0)}</Text>
            </View>
            <View className="flex justify-between w-full flex-row">
              <Text className="text-base">Tarifa de servicio</Text>
              <Text className="text-base font-light">{formatMoney(taxService)}</Text>
            </View>
            <View className="flex justify-between w-full flex-row">
              <Text className="text-base">IVA</Text>
              <Text className="text-base font-light">{formatMoney(iva)}</Text>
            </View>
          </View>
          <Separator className="px-8" color="#E5E7EB" />
          <View className="flex justify-between w-full flex-row">
            <Text className="font-medium text-base">Total</Text>
            <Text>
              {formatMoney(iva + taxService + (data?.price || 0))}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-col gap-2 mt-4" style={{ marginBottom: insets.bottom }}>
        {/* <TouchableOpacity
          className="w-full py-4 px-3 bg-white border-borderGray border rounded-xl"
          onPress={() => {
            bottomSheetModalRef.current?.close();
            router.push("/(user)/(tabs)/(messages)");
            setTimeout(() => {
              router.push("/(user)/(tabs)/(messages)/chat/12");
            }, 100);
          }}
        >
          <View className="self-center flex flex-row items-center justify-center gap-2">
            <Send size={18} color="#1b456d" />
            <Text className="text-primary text-center text-base font-medium w-fit">Ver chat</Text>
          </View>
        </TouchableOpacity> */}
        {
          isItClassifiable && (
            <TouchableOpacity
              className="w-full py-4 px-3 bg-primary rounded-xl disabled:opacity-50"
              onPress={handleClassificate}
            >
              <View className="self-center flex flex-row items-center justify-center gap-2">
                <Star size={18} color="#ffffff" />
                <Text className="text-white text-center text-base font-medium w-fit">Calificar servicio</Text>
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    </BottomSheetView>
  );
};

export default BottomSheetHistoryCard;
