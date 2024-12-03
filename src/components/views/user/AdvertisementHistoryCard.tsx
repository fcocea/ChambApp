import { useCallback, useMemo, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Check } from "lucide-react-native";

import { Skeleton } from "@/components/ui";
import formatMoney from "@/utils/formatMoney";

import BottomSheetClassificateCard from "./BottomSheetClassificateCard";
import BottomSheetHistoryCard from "./BottomSheetHistoryCard";

type AdvertisementHistoryCardData = any;

interface AdvertisementHistoryCardProps {
  data: AdvertisementHistoryCardData;
}

const AdvertisementHistoryCard = ({ data }: AdvertisementHistoryCardProps) => {
  const taxService = useMemo(() => (data.price || 0) * 0.02, [data]);
  const iva = useMemo(() => ((data?.price || 0) + taxService) * 0.19, [data, taxService]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const classificateBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentClassificateModalPress = useCallback(() => {
    classificateBottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Pressable className="flex flex-row bg-white rounded-xl overflow-hidden w-full px-4 py-2 gap-2 items-center" onPress={handlePresentModalPress}>
        <View className="w-12 h-12 bg-[#F5F5F7] rounded-md flex items-center justify-center">
          <Check size={20} color="#1b456d" />
        </View>
        <View className="flex flex-row flex-1 justify-between gap-[2px]">
          <View className="flex flex-col flex-1">
            <Text className="font-semibold text-[#333] text-lg">{data?.title}</Text>
            <Text className="text-sm text-[#50647D]">{new Date(data?.end_date).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
          </View>
          <Text className="text-sm text-[#50647D]">
            {formatMoney(iva + taxService + (data?.price || 0))}
          </Text>
        </View>
      </Pressable>
      <BottomSheetModal ref={bottomSheetModalRef} index={0} backdropComponent={props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />}>
        <BottomSheetHistoryCard data={data} bottomSheetModalRef={bottomSheetModalRef} handleClassificate={handlePresentClassificateModalPress} />
      </BottomSheetModal>
      <BottomSheetModal ref={classificateBottomSheetModalRef} index={0} backdropComponent={props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} pressBehavior="close" />}>
        <BottomSheetClassificateCard bottomSheetModalRef={classificateBottomSheetModalRef} />
      </BottomSheetModal>
    </>
  );
};

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

export { AdvertisementHistoryCard, AdvertisementHistoryCardSkeleton };

export default AdvertisementHistoryCard;
