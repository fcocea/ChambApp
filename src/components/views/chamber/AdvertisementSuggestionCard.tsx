import { useCallback, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Laptop } from "lucide-react-native";

import { Skeleton } from "@/components/ui";
import formatMoney from "@/utils/formatMoney";

import BottomSheetSuggestionCard from "./BottomSheetSuggestionCard";

type AdvertisementSuggestionCardData = any;

interface AdvertisementSuggestionCardProps {
  data: AdvertisementSuggestionCardData;
  handleRefresh?: () => void;
}

const AdvertisementSuggestionCard = ({ data, handleRefresh }: AdvertisementSuggestionCardProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Pressable className="flex flex-row bg-white rounded-xl overflow-hidden w-full px-4 py-2 gap-2 items-center" onPress={handlePresentModalPress}>
        <View className="flex flex-row bg-white rounded-xl overflow-hidden w-full px-4 py-2 gap-3 items-center">
          <View className="w-12 h-12 bg-[#1B456D] rounded-md flex items-center justify-center">
            <Laptop size={24} color="white" />
          </View>
          <View className="flex flex-row flex-1 justify-between gap-2">
            <View className="flex flex-col flex-1">
              <Text className="font-semibold text-[#333] text-lg truncate line-clamp-1">
                {data.title}
              </Text>
              <Text className="text-sm text-[#50647D]">{new Date(data?.start_date).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
            </View>
            <Text className="text-sm text-[#50647D]">
              {formatMoney(data.price)}
            </Text>
          </View>
        </View>
      </Pressable>
      <BottomSheetModal ref={bottomSheetModalRef} index={0} backdropComponent={props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />}>
        <BottomSheetSuggestionCard data={data} bottomSheetModalRef={bottomSheetModalRef} handleRefresh={handleRefresh} />
      </BottomSheetModal>
    </>
  );
};

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

export default AdvertisementSuggestionCard;
