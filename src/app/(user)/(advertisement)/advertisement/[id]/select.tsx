import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { ChamberCard, ChamberCardSkeleton } from "@/components/views/user";

import { AdvertisementContext } from "../../_layout";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface AvertisementData {
  info: {
    title: string;
    description: string;
    creation_date: string;
    areas: string[];
    price: number;
    start_date: string;
  };
  applications: {
    rut: string;
    first_name: string;
    last_name: string;
    average_score: number;
    account_creation_date: string;
    num_evaluations: number;
  }[];
}

export default function AdvertisementSelect() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { setAdvertisementData } = useContext(AdvertisementContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<AvertisementData>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const advertisementInfo = fetch(`${API_URL}/advertisements/${id}`);
        const advertisementApplications = fetch(`${API_URL}/advertisements/${id}/applications`);
        const [info, applications] = await Promise.all([advertisementInfo, advertisementApplications]);
        const [infoData, applicationsData] = await Promise.all([info.json(), applications.json()]);
        setData({
          info: infoData,
          applications: applicationsData?.detail ? [] : applicationsData
        });
        setAdvertisementData({
          info: infoData
        });
        setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        console.log(_error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, setAdvertisementData]);
  return (
    <View className="flex-1 bg-[#FAFAFA] w-full h-full px-6 flex gap-5 pt-6" style={{ paddingBottom: insets.bottom }}>
      { isLoading
        ? (
            <Skeleton height={162} borderRadius={12} />
          )
        : (
            <Pressable
              onPress={() => console.log("Ver detalles del anuncio")}
              className="w-full bg-primary rounded-xl h-[162px] px-6 py-[25px] justify-between shadow-primary flex gap-2"
              style={{
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
                elevation: 5
              }}
            >
              <View className="flex gap-1">
                <Text className="text-white text-xl font-medium line-clamp-1">{data?.info?.title}</Text>
                {/* <Text className="text-white text-xs">Edmundo Larenas 219, Concepción</Text> */}
                <Text className="text-white text-sm truncate line-clamp-2">{data?.info?.description}</Text>
                <Text className="text-white text-sm">{new Date(data?.info?.start_date || "").toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-5">
                  {
                    data?.info.areas.map((area: string, index: number) => (
                      <View key={index} className="bg-[#466987] px-[10px] py-[5px] rounded-md flex justify-center items-center">
                        <Text className="text-white text-sm">{area}</Text>
                      </View>
                    ))
                  }
                </View>
                <Text className="text-white font-medium text-lg flex justify-center items-center">
                  {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(data?.info?.price || 0)}
                </Text>
              </View>
            </Pressable>
          )}
      <Separator text="Ordenar por: Recomendado" />
      <ScrollView className="w-full h-full flex flex-col" contentContainerClassName="gap-5 pb-8" showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
            <ChamberCardSkeleton key={index} />
          ))
          : data?.applications && data?.applications?.length > 0
            ? data?.applications.map((data, index) => (
              <ChamberCard key={index} data={data} setSelectedChamber={setAdvertisementData} />
            ))
            : (
                <Text className="text-sm text-[#50647D] text-center">En este momento no hay candidatos para este anuncio.</Text>
              )}
      </ScrollView>
    </View>
  );
}
