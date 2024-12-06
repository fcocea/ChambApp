import { useEffect, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowRight, Bell, ChevronDown } from "lucide-react-native";

import { AdvertisementCard, AdvertisementCardSkeleton } from "@/components/views/chamber/AdvertisementCard";
import { AdvertisementSuggestionCard, AdvertisementSuggestionCardSkeleton } from "@/components/views/chamber/AdvertisementSuggestionCard";
import { useAuth } from "@/hooks/useAuth";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;

export default function Index() {
  const insets = useSafeAreaInsets();
  const { authState } = useAuth();
  const [advertisements, setAdvertisements] = useState<any[]>([]);
  const [advertisementsForMe, setAdvertisementsForMe] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchAdvertisements = async () => {
    const response = await fetch(`${API_ENDPOINT}/users/me/advertisements?chamber=true`, {
      headers: {
        Authorization: `Bearer ${authState?.token}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      const sortedData = data.sort((a: any, b: any) => {
        if (a.status !== b.status) {
          return b.status - a.status;
        }
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      });
      return sortedData;
    }
    throw new Error(data?.detail || "Error al obtener los anuncios");
  };

  const fetchAdvertisementsForMe = async () => {
    const response = await fetch(`${API_ENDPOINT}/advertisements`, {
      headers: {
        Authorization: `${authState?.token}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      const sortedData = data.sort((a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
      return sortedData.slice(0, 3);
    }
    throw new Error(data?.detail || "Error al obtener los anuncios");
  };

  const onRefresh = async () => {
    setLoading(true);
    setRefreshing(true);
    const [advertisements, advertisementsForMe] = await Promise.all([fetchAdvertisements(), fetchAdvertisementsForMe()]);
    setAdvertisements(advertisements);
    setAdvertisementsForMe(advertisementsForMe);
    setLoading(false);
    setRefreshing(false);
  };
  useEffect(() => {
    (async () => {
      const [advertisements, advertisementsForMe] = await Promise.all([fetchAdvertisements(), fetchAdvertisementsForMe()]);
      setAdvertisements(advertisements);
      setAdvertisementsForMe(advertisementsForMe);
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="bg-primary w-full" style={{ paddingTop: insets.top, height: SCREEN_HEIGHT }}>
      <View className="px-6 flex flex-col gap-8 py-2">
        <View className="flex-row items-center justify-between">
          <View className="flex flex-row gap-2 items-center">
            <Text className="text-white text-base font-semibold justify-center ">
              Edmundo Larenas 123
            </Text>
            <ChevronDown size={20} color="white" />
          </View>
          <Pressable
            className="flex flex-row items-center rounded-full border-[#FAFAFA] border-[1px] p-2"
          >
            <Bell size={18} color="white" />
            <View className="bg-red-500 rounded-full w-2 h-2 absolute top-1 right-[9px]" />
          </Pressable>
        </View>
      </View>
      <ScrollView
        className="bg-primary"
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#1B456D"]}
            progressBackgroundColor="#fff"
            tintColor="#FFF"
          />
        )}
        contentContainerClassName="flex-1 h-full"
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        // bounces={false}
      >
        <View className="px-6 mt-10 mb-20">
          <Text className="text-white text-3xl font-semibold">Buscando peguita 🤙?</Text>
          <Text className="text-sm text-gray-300">Encuentra la chamba perfecta</Text>
        </View>
        <View className="flex flex-col bg-[#FAFAFA] rounded-t-[32px] pt-6 gap-6 h-full">
          <View
            className="absolute top-[-25px] rounded-t-[1000px] bg-[#FAFAFA]"
            style={{
              width: SCREEN_WIDTH * 1.6,
              height: SCREEN_WIDTH * 0.6,
              left: -((SCREEN_WIDTH * 1.6 - SCREEN_WIDTH) / 2)
            }}
          />
          <View className="px-6 flex flex-col gap-6">
            <View className="flex flex-col gap-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-2xl text-[#50647D] font-semibold">Anuncios activos</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
                pagingEnabled
              >
                {loading
                  ? Array.from({ length: 2 }).map((_, index) => (
                    <AdvertisementCardSkeleton key={index} />
                  ))
                  : advertisements && advertisements?.length > 0
                    ? advertisements.map((data, index) => (
                      <AdvertisementCard key={index} data={data} handleRefresh={onRefresh} />
                    ))
                    : (
                        <View>
                          <AdvertisementCardSkeleton hidden />
                          <Text className="absolute text-center text-sm text-[#50647D] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">No hay anuncios activos</Text>
                        </View>
                      )}
              </ScrollView>
            </View>
            <View className="flex flex-col gap-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-2xl text-[#50647D] font-semibold">Chambitas para ti</Text>
                <Pressable className="flex flex-row items-center gap-1">
                  <Text className="text-[#333333] font-semibold text-base">Ver todas</Text>
                  <ArrowRight size={18} color="#333333" />
                </Pressable>
              </View>
              <View className="flex-grow flex gap-2">
                {loading
                  ? Array.from({ length: 3 }).map((_, index) => (
                    <AdvertisementSuggestionCardSkeleton key={index} />
                  ))
                  : advertisementsForMe.length > 0
                    ? advertisementsForMe
                      .map((ad, index) => (
                        <AdvertisementSuggestionCard key={index} data={ad} handleRefresh={onRefresh} />
                      ))
                    : (
                        <Text className="text-center text-sm text-[#50647D]">No hay trabajos sugeridos</Text>
                      )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
