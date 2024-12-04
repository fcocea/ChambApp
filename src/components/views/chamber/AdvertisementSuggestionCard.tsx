import { Text, View } from "react-native";
import { Laptop } from "lucide-react-native";

import { Skeleton } from "@/components/ui";
import formatMoney from "@/utils/formatMoney";

interface AdvertisementSuggestionCardProps {
  title: string;
  date: string;
  price: number;
}

const AdvertisementSuggestionCard = ({ title, date, price }: AdvertisementSuggestionCardProps) => (
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
        {formatMoney(price)}
      </Text>
    </View>
  </View>
);

const AdvertisementSuggestionCardSkeleton = () => (
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

export { AdvertisementSuggestionCard, AdvertisementSuggestionCardSkeleton };
