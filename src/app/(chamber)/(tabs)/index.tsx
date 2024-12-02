import { useEffect, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowRight, Bell, ChevronDown, Eye, Laptop } from "lucide-react-native";

import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/hooks/useAuth";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;

const AdvertisementCard = ({ data }: { data: any }) => {
  const router = useRouter();
  return (
    <Pressable className="flex bg-white rounded-2xl overflow-hidden w-full" style={{ width: (screenWidth - 48) - 4 }} onPress={() => router.push(`./(advertisement)/advertisement/${data?.ad_id}/select`)}>
      <Image source={{ uri: "https://i.pinimg.com/564x/b7/21/3d/b7213d2e2ca6435c504bfd4294c86288.jpg" }} style={{ width: "100%", height: 180 }} />
      <View className="flex flex-row justify-between absolute right-1 top-2 gap-2">
        {data?.areas?.slice(0, 2)?.map((area: string, index: number) => (
          <View key={index} className="bg-[#FAFAFA] rounded-md px-2 py-1">
            <Text className="text-xs">
              {area}
            </Text>
          </View>
        ))}
      </View>
      <View className="flex flex-col p-4">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-semibold text-[#333] text-lg truncate line-clamp-1">{data?.title}</Text>
          {data?.status === 1
            ? (
                <View className="bg-primary rounded-md px-2 py-1">
                  <Text className="text-xs text-white">En progreso</Text>
                </View>
              )
            : <Text className="text-sm text-[#50647D]">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(data?.price)}</Text>}
        </View>
        {
          data?.status === 1
            ? (
                <Text className="text-sm text-[#50647D]">{new Date(data?.start_date).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
              )
            : (
                <View className="flex flex-row items-center gap-1">
                  <Eye color="#50647D" size={16} />
                  <Text className="text-sm text-[#50647D]">
                    <Text className="text-primary font-semibold">
                      {data?.total_applications}
                      {" "}
                    </Text>
                    chambers postulando
                  </Text>
                </View>
              )
        }
      </View>
    </Pressable>
  );
};

const AdvertisementCardSkeleton = () => (
  <View className="flex bg-white rounded-2xl overflow-hidden w-full" style={{ width: (screenWidth - 48) - 4 }}>
    <Skeleton height={180} />
    <View className="flex flex-col p-4 gap-2">
      <View className="flex flex-row justify-between items-center">
        <Skeleton width={160} height={16} />
      </View>
      <Skeleton width={190} height={14} />
    </View>
  </View>
);

const AdvertisementHistoryCard = ({ title, date, price }: {
  title: string;
  date: string;
  price: number;
}) => (
  <View className="flex flex-row bg-white rounded-xl overflow-hidden w-full px-4 py-2 gap-3 items-center">
    <View className="w-12 h-12 bg-[#1B456D] rounded-md flex items-center justify-center">
      <Laptop size={24} color="white" />
    </View>
    <View className="flex flex-row flex-1 justify-between gap-2">
      <View className="flex flex-col flex-1">
        <Text className="font-semibold text-[#333] text-lg truncate line-clamp-1">
          {title}
        </Text>
        <Text className="text-sm text-[#50647D]">{date}</Text>
      </View>
      <Text className="text-sm text-[#50647D]">
        {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(price)}
      </Text>
    </View>
  </View>
);

const AdvertisementHistoryCardSkeleton = () => (
  <View className="flex flex-row bg-white rounded-xl overflow-hidden w-full px-4 py-2 gap-2 items-center">
    <Skeleton width={42} height={42} />
    <View className="flex flex-row flex-1 justify-between gap-[2px]">
      <View className="flex flex-col flex-1 gap-2">
        <Skeleton width={135} height={14} />
        <Skeleton width={150} height={12} />
      </View>
      <Skeleton width={50} height={10} />
    </View>
  </View>
);

export default function Index() {
  const insets = useSafeAreaInsets();
  const { authState, logout } = useAuth();
  const [advertisements, setAdvertisements] = useState<any[]>([]);
  const [advertisementsForMe, setAdvertisementsForMe] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchAdvertisements = async () => {
    const response = await fetch(`${API_ENDPOINT}/users/me/advertisements`, {
      headers: {
        Authorization: `Bearer ${authState?.token}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      return data;
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
    <View className="bg-primary w-full" style={{ paddingTop: insets.top, height: screenHeight }}>
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
            onPress={logout}
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
        {/* Contenido principal */}
        <View className="flex flex-col bg-[#FAFAFA] rounded-t-[32px] pt-6 gap-6 h-full">
          <View
            className="absolute top-[-25px] rounded-t-[1000px] bg-[#FAFAFA]"
            style={{
              width: screenWidth * 1.6,
              height: screenWidth * 0.6,
              left: -((screenWidth * 1.6 - screenWidth) / 2)
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
                  : advertisements.map((data, index) => (
                    <AdvertisementCard key={index} data={data} />
                  ))}
              </ScrollView>
            </View>
            {/* Historial de anuncios */}
            <View className="flex flex-col gap-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-2xl text-[#50647D] font-semibold">Chambitas para ti</Text>
                <Pressable className="flex flex-row items-center gap-1">
                  <Text className="text-[#333333] font-semibold text-base">Ver todas</Text>
                  <ArrowRight size={18} color="#333333" />
                </Pressable>
              </View>
              {/* Contenedor del ScrollView limitado */}
              <View className="flex-grow flex gap-2">
                {loading
                  ? Array.from({ length: 3 }).map((_, index) => (
                    <AdvertisementHistoryCardSkeleton key={index} />
                  ))
                  : advertisementsForMe
                    .filter(ad => ad.title && ad.price) // Filtra solo anuncios con datos válidos
                    .map(ad => (
                      <AdvertisementHistoryCard
                        key={ad.ad_id}
                        title={ad.title}
                        date={new Date(ad.start_date).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        price={ad.price}
                      />
                    ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
