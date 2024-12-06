import { useCallback, useEffect, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowRight, Bell, ChevronDown, Plus } from "lucide-react-native";

import { AdvertisementCard, AdvertisementCardSkeleton } from "@/components/views/user/AdvertisementCard";
import { AdvertisementHistoryCard, AdvertisementHistoryCardSkeleton } from "@/components/views/user/AdvertisementHistoryCard";
import { useAuth } from "@/hooks/useAuth";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;

export default function Index() {
  const insets = useSafeAreaInsets();
  const { authState } = useAuth();
  const router = useRouter();
  const [advertisements, setAdvertisements] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchAdvertisements = async () => {
    const response = await fetch(`${API_ENDPOINT}/users/me/advertisements`, {
      headers: {
        Authorization: `Bearer ${authState?.token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Error fetching advertisements");
  };

  const fetchHistory = async () => {
    const response = await fetch(`${API_ENDPOINT}/users/me/history?page=1&limit=3`, {
      headers: {
        Authorization: `Bearer ${authState?.token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Error fetching history");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true);
    const [advertisements, history] = await Promise.all([fetchAdvertisements(), fetchHistory()]);
    setAdvertisements(advertisements);
    setHistory(history);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      const [advertisements, history] = await Promise.all([fetchAdvertisements(), fetchHistory()]);
      setAdvertisements(advertisements);
      setHistory(history);
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateHistoryScore = useCallback(async (ad_id: string, score: number) => {
    setHistory(previousHistory => previousHistory.map(ad => ad.ad_id === ad_id ? { ...ad, score_to_chamber: score } : ad));
  }, []);

  return (
    <View className="bg-primary w-full flex-1" style={{ paddingTop: insets.top, height: SCREEN_HEIGHT }}>
      <View className="px-6 flex flex-col gap-8 py-2">
        <View className="flex-row items-center justify-between">
          <View className="flex flex-row gap-2 items-center">
            <Text className="text-white text-base font-semibold justify-center ">
              Edmundo Larenas 123
            </Text>
            <ChevronDown size={20} color="white" />
          </View>
          <Pressable className="flex flex-row items-center rounded-full border-[#FAFAFA] border-[1px] p-2">
            <Bell size={18} color="white" />
            <View className="bg-red-500 rounded-full w-2 h-2 absolute top-1 right-[9px]" />
          </Pressable>
        </View>
      </View>
      <View
        className="flex-grow bg-background h-full flex-1"
      >
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
          contentContainerClassName="flex-grow"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        // bounces={false}
        >
          <View className="px-6 mt-10 mb-20">
            <Text className="text-white text-3xl font-semibold">Qué necesitai hacer 🤙?</Text>
            <Text className="text-sm text-gray-300">Encuentra la solución a tus problemas</Text>
          </View>
          {/* Contenido principal */}
          <View className="flex flex-col bg-[#FAFAFA] rounded-t-[32px] pt-6 gap-6 h-full">
            <View
              className="absolute top-[-25px] rounded-t-[1000px] bg-[#FAFAFA]"
              style={{
                width: SCREEN_WIDTH * 1.6,
                height: SCREEN_WIDTH * 0.6,
                left: -((SCREEN_WIDTH * 1.6 - SCREEN_WIDTH) / 2)
              }}
            />
            <View className="absolute right-1/2 translate-x-1/2 top-[-50px] h-20 w-20 rounded-full bg-primary" />
            <Pressable className="absolute right-1/2 translate-x-1/2 top-[-42px] h-16 w-16 rounded-full bg-white items-center justify-center" onPress={() => router.push("/(user)/(advertisement)/create")}>
              <Plus size={28} color="#1b456d" />
            </Pressable>
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
              {/* Historial de anuncios */}
              <View className="flex flex-col gap-5">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-2xl text-[#50647D] font-semibold">Ultimos anuncios</Text>
                  <Pressable className="flex flex-row items-center gap-1">
                    <Text className="text-[#333333] font-semibold text-base">Ver todos</Text>
                    <ArrowRight size={18} color="#333333" />
                  </Pressable>
                </View>
                {/* Contenedor del ScrollView limitado */}
                <View className="flex-grow flex gap-2">
                  {loading
                    ? Array.from({ length: 3 }).map((_, index) => (
                      <AdvertisementHistoryCardSkeleton key={index} />
                    ))
                    : history && history?.length > 0
                      ? history.map((data, index) => (
                        <AdvertisementHistoryCard key={index} data={data} updateHistoryScore={updateHistoryScore} />
                      ))
                      : <Text className="text-center text-sm text-[#50647D]">No hay anuncios en el historial</Text>}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
