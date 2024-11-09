import { Pressable, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import { Skeleton } from "@/components/ui/Skeleton";

export function ChamberCard({ id }: { id?: string }) {
  const router = useRouter();
  // const { setSelectedChamber } = useAdversitementUser();
  return (
    <Pressable
      className="flex flex-col w-full gap-1"
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
        <Text className="line-clamp-2 text-[rgba(0,_14,_8,_0.49)]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus at nulla facilisis ultrices. Integer vitae justo nec velit ultrices tempus.
        </Text>
        <Pressable onPress={() => console.log("Ver perfil de un chamber!")}>
          <Text className="text-primary text-base font-medium">Ver más</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export function ChamberCardSkeleton() {
  return (
    <View className="flex flex-col w-full gap-1">
      <View className="w-full flex flex-row gap-3">
        <Skeleton circle width={96} />
        <View className="flex py-3 gap-3">
          <Skeleton width={150} />
          <View className="flex text-sm gap-1">
            <Skeleton width={135} height={12} />
            <Skeleton width={135} height={12} />
            <Skeleton width={135} height={12} />
          </View>
        </View>
      </View>
      <Skeleton height={90} />
    </View>
  );
}