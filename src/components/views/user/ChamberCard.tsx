import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
  return `${months} ${months === 1 ? "" : ""}`;
}

export function ChamberCard({ data, setSelectedChamber }: { data?: any; setSelectedChamber?: any }) {
  const router = useRouter();
  // const { setSelectedChamber } = useAdversitementUser();
  return (
    <Pressable
      className="flex flex-1 flex-col w-full gap-1 bg-white rounded-2xl px-4 py-4"
      onPress={() => {
        setSelectedChamber((prev: any) => ({
          ...prev,
          selected: data
        }));
        router.push("./review");
      }}
    >
      <View className="w-full flex flex-row gap-4 items-center">
        <View>
          <Avatar size={120} name={`${data?.first_name} ${data?.last_name}`} />
        </View>
        <View className="w-full flex flex-1 flex-col gap-3">
          <View className="w-full flex flex-col mt-2">
            <Text className="font-bold text-xl">
              {data?.first_name}
              {" "}
              {data?.last_name}
            </Text>
            <View>
              <Text className="text-base text-primary font-semibold">
                <FontAwesome name="star" size={12} className="text-primary" />
                {" "}
                { Number(data?.average_score).toFixed(2)}
              </Text>
            </View>
          </View>
          <View className="flex items-center flex-row justify-around bg-[#eaeff5] p-2 rounded-xl">
            <View>
              <Text className="text-center text-base text-primary font-semibold">Tareas</Text>
              <Text className="text-center text-xl font-bold">{180}</Text>
            </View>
            <View>
              <Text className="text-center text-base text-primary font-semibold">Meses</Text>
              <Text className="text-center text-xl font-bold">{timeSince(new Date(data?.account_creation_date))}</Text>
            </View>

          </View>
        </View>
      </View>
      {/* <View className="flex flex-col p-3 text-xs gap-[15px]">
        <Pressable
          className="justify-end flex rounded-lg px-4 py-2 ml-auto bg-primary "
          onPress={() => {
            setSelectedChamber((prev: any) => ({
              ...prev,
              selected: data
            }));
            router.push("./review");
          }}
        >
          <Text className="text-white text-base font-medium text-center">Confirmar</Text>
        </Pressable>
      </View> */}
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
