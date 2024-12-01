import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowRight, Bell, CheckCheck, ChevronDown, Eye, Plus, Send } from "lucide-react-native";

import { Avatar, Separator } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";
import AdvertisementLocation from "@/components/views/user/AdvertisementLocation";
import { useAuth } from "@/hooks/useAuth";
import formatMoney from "@/utils/formatMoney";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;

const AdvertisementCard = ({ data }: { data: any }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const taxService = useMemo(() => (data.price || 0) * 0.02, [data]);
  const iva = useMemo(() => ((data?.price || 0) + taxService) * 0.19, [data, taxService]);

  if (!data) {
    return null;
  }

  return (
    <>
      <Pressable
        className="flex bg-white rounded-2xl overflow-hidden w-full"
        style={{ width: (screenWidth - 48) - 4 }}
        onPress={
          () => data?.status === 0
            ? router.push(`./(advertisement)/advertisement/${data?.ad_id}/select`)
            : handlePresentModalPress()
        }
      >
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
            <Text className="font-semibold text-[#333] text-lg">{data?.title}</Text>
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
      <BottomSheetModal ref={bottomSheetModalRef} index={0} backdropComponent={props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />}>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </Text>
              </View>
              <View className="flex flex-col items-center gap-1">
                {/* <Text className="text-base font-semibold text-[#333]">Chamber</Text> */}
                <Avatar size={36} name="R P" />
                <Text className="text-sm text-[#50647D]">
                  Rene
                  {" "}
                  Puente
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
            >
              <View className="self-center flex flex-row items-center justify-center gap-2">
                <Text className="text-primary text-center text-base font-medium w-fit">Continuar al chat</Text>
                <Send size={18} color="#1b456d" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full py-4 px-3 bg-primary rounded-xl"
            >
              <View className="self-center flex flex-row items-center justify-center gap-2">
                <Text className="text-white text-center text-base font-medium w-fit">Finalizar servicio</Text>
                <CheckCheck size={18} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
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
  const { authState } = useAuth();
  const router = useRouter();
  const [advertisements, setAdvertisements] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchAdvertisements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINT}/users/me/advertisements`, {
        headers: {
          Authorization: `Bearer ${authState?.token}`
        }
      });
      const data = await response.json();
      setAdvertisements(data);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAdvertisements();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAdvertisements();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="bg-primary w-full flex-1" style={{ paddingTop: insets.top, height: screenHeight }}>
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
                width: screenWidth * 1.6,
                height: screenWidth * 0.6,
                left: -((screenWidth * 1.6 - screenWidth) / 2)
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
                    : advertisements.map((data, index) => (
                      <AdvertisementCard key={index} data={data} />
                    ))}
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
                    : Array.from({ length: 3 }).map((_, index) => (
                      <AdvertisementHistoryCard key={index} status="active" />
                    ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
