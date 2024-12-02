import { useCallback, useContext, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Avatar, Separator } from "@/components/ui";
import AdvertisementLocation from "@/components/views/user/AdvertisementLocation";
import { useAuth } from "@/hooks/useAuth";
import formatMoney from "@/utils/formatMoney";

import { AdvertisementContext } from "../../_layout";

const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;

export default function AdvertisementReview() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { authState } = useAuth();
  const { advertisementData } = useContext(AdvertisementContext);
  const insets = useSafeAreaInsets();
  const taxService = useMemo(() => (advertisementData.info?.price || 0) * 0.02, [advertisementData]);
  const iva = useMemo(() => ((advertisementData.info?.price || 0) + taxService) * 0.19, [advertisementData, taxService]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const confirmAdvertisement = useCallback(() => {
    setLoading(true);
    (async () => {
      const response = await fetch(`${API_ENDPOINT}/advertisements/${id}/applications/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${authState?.token}`
        },
        body: JSON.stringify({
          rut: advertisementData?.selected?.rut
        })
      });
      if (response.ok) {
        setLoading(false);
        router.replace("/(user)/(tabs)");
      }
    })();
  }, [advertisementData, id, router, authState]);

  return (
    <View
      className="flex flex-1 w-full h-full bg-background px-6 pt-6 gap-6"
      style={{
        paddingBottom: insets.bottom
      }}
    >
      <View className="rounded-xl overflow-hidden border border-separator">
        <AdvertisementLocation />
      </View>
      <Separator color="#E5E7EB" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-5 pb-8" alwaysBounceVertical={false}>
        <View className="flex gap-3">
          <Text className="text-[#333333] text-lg font-bold">{advertisementData.info?.title}</Text>
          <View className="flex flex-row justify-between">
            <View className="flex flex-1 flex-col justify-between">
              <View className="flex flex-row items-center gap-1">
                <Feather name="calendar" size={18} color="black" />
                <Text className="text-base">{new Date(advertisementData?.info?.start_date || new Date()).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}</Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <Feather name="clock" size={18} color="black" />
                <Text className="text-base">{new Date(advertisementData?.info?.start_date || new Date()).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}</Text>
              </View>
            </View>

            <View className="flex flex-row gap-1 justify-center">
              <View className="flex flex-col justify-center items-end gap-1">
                <Text className="text-base">
                  {advertisementData.selected?.first_name}
                  {" "}
                  {advertisementData.selected?.last_name}
                </Text>
                <View>
                  <Text className="text-base">
                    {Number(advertisementData.selected?.average_score || 0).toFixed(1)}
                  </Text>
                </View>
              </View>
              <Avatar size={48} name={advertisementData.selected?.first_name + " " + advertisementData.selected?.last_name} />
            </View>
          </View>
        </View>
        <Separator color="#E5E7EB" />
        <View className="flex flex-col gap-2">
          <Text className="font-medium">Precio</Text>
          <View className="flex flex-col pl-1">
            <View className="flex justify-between w-full flex-row">
              <Text className="text-base">Servicio</Text>
              <Text className="text-base font-light">{formatMoney(advertisementData.info?.price || 0)}</Text>
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
              {formatMoney(iva + taxService + (advertisementData.info?.price || 0))}
            </Text>
          </View>
        </View>
        <Separator color="#E5E7EB" />
        <View className="flex justify-between flex-row items-center">
          <Text className="text-base font-medium">Pago</Text>
          <View className="flex flex-row gap-2 items-center">
            <Feather name="credit-card" size={18} color="black" />
            <Text className="text-base text-[#333333]">...7896</Text>
            <Feather name="chevron-right" size={18} color="#333333" />
          </View>
        </View>
        <Separator color="#E5E7EB" />
        <Text className="text-xs opacity-40 text-[#333333] font-light">
          {/* Disclaimer text */}
          * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Donec nec nunc nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Donec nec nunc nec nunc.
          {" "}
          {id}
        </Text>
        <TouchableOpacity
          className={`flex w-full py-4 px-3 bg-primary rounded-xl ${loading ? "opacity-50" : ""}`}
          onPress={() => confirmAdvertisement()}
          disabled={loading}
        >
          <View className="self-center">
            {loading && <ActivityIndicator color="#ffffff" className="absolute -left-8" />}
            <Text className="text-white text-center text-base font-medium">Confirmar y chatear</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
