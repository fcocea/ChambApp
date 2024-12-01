import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ArrowRight } from "lucide-react-native";

import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/hooks/useAuth";

const screenWidth = Dimensions.get("window").width;

const AdvertisementCard = () => (
  <Pressable className="flex bg-white rounded-2xl overflow-hidden w-full" style={{ width: (screenWidth - 48) - 4 }}>
    <Image source={{ uri: "https://i.pinimg.com/564x/b7/21/3d/b7213d2e2ca6435c504bfd4294c86288.jpg" }} style={{ width: "100%", height: 180 }} />
    <View className="flex flex-row justify-between absolute right-1 top-2 gap-2">
      <View className="bg-[#F8F9FD] rounded-md px-2 py-1">
        <Text className="text-xs">
          Categoria
        </Text>
      </View>
      <View className="bg-[#F8F9FD] rounded-md px-2 py-1">
        <Text className="text-xs">
          Categoria
        </Text>
      </View>
    </View>
    <View className="flex flex-col p-4">
      <View className="flex flex-row justify-between items-center">
        <Text className="font-semibold text-[#333] text-lg">Anuncio 1</Text>
        <View className="bg-primary rounded-md px-2 py-1">
          <Text className="text-xs text-white">En progreso</Text>
        </View>
      </View>
      <Text className="text-sm text-[#50647D]">{new Date(new Date()).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
    </View>
  </Pressable>
);

const AdvertisementCardSkeleton = () => (
  <View className="flex bg-white rounded-2xl overflow-hidden w-full" style={{ width: (screenWidth - 48) - 4 }}>
    <Skeleton height={180} />
    <View className="flex flex-col p-4 gap-2">
      <View className="flex flex-row justify-between items-center">
        <Skeleton width={160} height={16} />
      </View>
      <Skeleton width={190} height={10} />
    </View>
  </View>
);

const AdvertisementHistoryCard = ({ status }: { status: "active" | "inactive" | "suspend" }) => (
  <View className="flex flex-row bg-white rounded-xl overflow-hidden w-full px-4 py-2 gap-2 items-center">
    <View className="w-12 h-12 bg-[#F5F5F7] rounded-md flex items-center justify-center">
      <Feather name="check" size={20} />
    </View>
    <View className="flex flex-row flex-1 justify-between gap-[2px]">
      <View className="flex flex-col flex-1">
        <Text className="font-semibold text-[#333] text-lg">Anuncio 1</Text>
        <Text className="text-sm text-[#50647D]">{new Date(new Date()).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
      </View>
      <Text className="text-sm text-[#50647D]">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(32500 || 0)}</Text>
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
  const { logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      setLoading(false);
    })();
  }, []);

  return (
    <View className="flex-1 bg-primary h-full w-full" style={{ paddingTop: insets.top }}>
      <View className="px-6 flex flex-col gap-8">
        <View className="flex-row items-center justify-between">
          <View className="flex flex-row gap-2">
            <Text className="text-white text-base font-semibold justify-center ">
              Edmundo Larenas 123
            </Text>
            <Feather name="chevron-down" size={24} color="white" />
          </View>
          <Pressable
            className="flex flex-row items-center rounded-full border-[#F5F5F7] border-[1px] p-2"
            onPress={() => {
              logout();
            }}
          >
            <Feather name="bell" size={18} color="white" />
          </Pressable>
        </View>
        <View>
          <Text className="text-white text-3xl font-semibold">Qué necesitai hacer 🤙?</Text>
          <Text className="text-sm text-gray-300">Encuentra la solución a tus problemas</Text>
        </View>
      </View>
      <View className="flex flex-col px-6 bg-[#F8F9FD] rounded-t-[32px] mt-16 pt-6 gap-6 h-full flex-1">
        {/* <View
          className="absolute top-[-70px] rounded-t-[400px] bg-white"
          style={{
            width: screenWidth * 1.8,
            height: screenWidth * 1.8,
            left: -((screenWidth * 1.8 - screenWidth) / 2)
          }}
        /> */}
        <View className="flex flex-col gap-5">
          <View className="flex flex-row justify-between w-full items-center">
            <Text className="text-2xl text-[#50647D] font-semibold">Anuncios activos</Text>
            {/* <View className="flex flex-row items-center gap-1">
              <Text className="text-[#333] font-semibold text-base">Ver todos</Text>
              <ArrowRight size={18} color="#080808" />
            </View> */}
          </View>
          <View className="flex-grow">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }} pagingEnabled className="w-full">
              {loading
                ? Array.from({ length: 2 }).map((_, index) => (
                  <AdvertisementCardSkeleton key={index} />
                ))
                : Array.from({ length: 3 }).map((_, index) => (
                  <AdvertisementCard key={index} />
                ))}
            </ScrollView>
          </View>
        </View>
        <View className="flex flex-col gap-5 w-full flex-1">
          <View className="flex flex-row justify-between w-full items-center">
            <Text className="text-2xl text-[#50647D] font-semibold">Historial de anuncios</Text>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-[#333] font-semibold text-base">Ver todos</Text>
              <ArrowRight size={18} color="#080808" />
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                <AdvertisementHistoryCardSkeleton key={index} />
              ))
              : Array.from({ length: 1 }).map((_, index) => (
                <AdvertisementHistoryCard key={index} status="active" />
              ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
