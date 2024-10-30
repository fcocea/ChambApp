import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";

import Separator from "@/components/Separator";

function ChamberCard({ id }: { id?: string }) {
  const router = useRouter();
  // const { setSelectedChamber } = useAdversitementUser();
  return (
    <Pressable
      className="flex flex-col w-full"
      onPress={() => {
        // setSelectedChamber(id);
        router.push("./review");
      }}
    >
      <View className="w-full flex flex-row gap-3">
        <Image
          source="https://tresubresdobles.com/wp-content/uploads/2024/04/Captura-de-pantalla-2024-04-25-a-las-21.41.02.jpg"
          contentFit="cover"
          style={{
            width: 96,
            height: 96,
            borderRadius: 50
          }}
        />
        <View className="flex py-3 gap-3">
          <Text className="font-bold">Juan P.</Text>
          <View className="flex text-sm">
            <View className="flex text-sm items-center flex-row gap-1">
              <Feather name="star" color="black" />
              <Text>4.3 (123 opiniones)</Text>
            </View>
            <Text className="text-primary">180 tareas de este tipo</Text>
            <Text>
              6 meses siendo
              {" "}
              <Text className="text-primary">Chamber</Text>
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-col p-3 text-xs bg-[#F2F7FB] gap-[15px]">
        <Text className="line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus at nulla facilisis ultrices. Integer vitae justo nec velit ultrices tempus.
        </Text>
        <Pressable onPress={() => console.log("Ver perfil de un chamber!")}>
          <Text className="text-primary text-base font-medium">Ver más</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function AdvertisementSelect() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white w-full h-full px-6 flex gap-8 pt-6" style={{ paddingBottom: insets.bottom }}>
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
          <Text className="text-white text-xl font-medium line-clamp-1">{id}</Text>
          <Text className="text-white text-xs">Edmundo Larenas 219, Concepción</Text>
        </View>
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row gap-5">
            <View className="bg-[#3389FD] px-[10px] py-[5px] rounded-md flex justify-center items-center">
              <Text className="text-white text-sm">Limpieza</Text>
            </View>
            <View className="bg-[#3389FD] px-[10px] py-[5px] rounded-md flex justify-center items-center">
              <Text className="text-white text-sm">Otras</Text>
            </View>
          </View>
          <Text className="text-white font-medium text-lg flex justify-center items-center">
            $25.000
          </Text>
        </View>
      </Pressable>
      <Separator text="Ordenar por: Recomendado" />
      <ScrollView className="w-full h-full flex flex-col" contentContainerClassName="gap-8 pb-8" showsVerticalScrollIndicator={false}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ChamberCard key={index} />
        ))}
      </ScrollView>
    </View>
  );
}
