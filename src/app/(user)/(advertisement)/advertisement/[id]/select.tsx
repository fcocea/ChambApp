import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { ChamberCard, ChamberCardSkeleton } from "@/components/views/user";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface AvertisementData {
  info: any;
  applications: any;
}

export default function AdvertisementSelect() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<AvertisementData>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const advertisementInfo = fetch(`${API_URL}/advertisement/${id}`);
        const advertisementApplications = fetch(`${API_URL}/advertisement/${id}/applications`);
        const [info, applications] = await Promise.all([advertisementInfo, advertisementApplications]);
        const [infoData, applicationsData] = await Promise.all([info.json(), applications.json()]);
        setData({
          info: infoData,
          applications: applicationsData
        });
        setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return (
    <View className="flex-1 bg-white w-full h-full px-6 flex gap-8 pt-6" style={{ paddingBottom: insets.bottom }}>
      { isLoading
        ? (
            <Skeleton height={162} borderRadius={12} />
          )
        : (
            <Pressable
              onPress={() => console.log("Ver detalles del anuncio")}
              className="w-full bg-primary rounded-xl h-[162px] px-6 py-[25px] justify-between"
              style={{
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
                elevation: 5,
                shadowColor: "rgba(47, 128, 237, 1)"
              }}
            >
              <View className="flex gap-1">
                <Text className="text-white text-xl font-medium line-clamp-1">{data?.info?.[0]?.title}</Text>
                {/* <Text className="text-white text-xs">Edmundo Larenas 219, Concepción</Text> */}
                <Text className="text-white text-xs">{data?.info?.[0]?.description}</Text>
                <Text className="text-white text-xs">{new Date(data?.info?.[0]?.creation_date).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}</Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-5">
                  {
                    data?.info?.[0].areas.map((area: string, index: number) => (
                      <View key={index} className="bg-[#3389FD] px-[10px] py-[5px] rounded-md flex justify-center items-center">
                        <Text className="text-white text-sm">{area}</Text>
                      </View>
                    ))
                  }
                </View>
                <Text className="text-white font-medium text-lg flex justify-center items-center">
                  {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(data?.info?.[0]?.price)}
                </Text>
              </View>
            </Pressable>
          )}
      <Separator text="Ordenar por: Recomendado" />
      <ScrollView className="w-full h-full flex flex-col" contentContainerClassName="gap-8 pb-8" showsVerticalScrollIndicator={false}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
            <ChamberCardSkeleton key={index} />
          ))
          : Array.from({ length: 6 }).map((_, index) => (
            <ChamberCard key={index} />
          ))}
      </ScrollView>
    </View>
  );
}
