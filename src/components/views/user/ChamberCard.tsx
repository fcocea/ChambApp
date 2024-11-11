import { Pressable, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

import { Avatar } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";

function timeSince(startDate: Date): string {
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate.getTime() - startDate.getTime();
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  if (days < 7) {
    return "1 semana";
  } else if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  }
  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? "mes" : "meses"}`;
}

export function ChamberCard({ data, setSelectedChamber }: { data?: any; setSelectedChamber?: any }) {
  const router = useRouter();
  // const { setSelectedChamber } = useAdversitementUser();
  return (
    <Pressable
      className="flex flex-col w-full gap-1"
      onPress={() => {
        setSelectedChamber((prev: any) => ({
          ...prev,
          selected: data
        }));
        router.push("./review");
      }}
    >
      <View className="w-full flex flex-row gap-3">
        <Avatar size={96} name={`${data?.first_name} ${data?.last_name}`} />
        <View className="flex py-3 gap-3">
          <Text className="font-bold">
            {data?.first_name}
            {" "}
            {data?.last_name}
          </Text>
          <View className="flex text-sm">
            <View className="flex text-sm items-center flex-row gap-1">
              <Feather name="star" color="black" />
              <Text>
                {Number(data?.average_score).toFixed(2)}
                {" "}
                (
                {data?.num_evaluations}
                {" "}
                opini
                {data?.num_evaluations === 1 ? "ón" : "ones"}
                )
              </Text>
            </View>
            <Text className="text-primary">180 tareas de este tipo</Text>
            <Text>
              {timeSince(new Date(data?.account_creation_date))}
              {" "}
              siendo
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
