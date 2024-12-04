import { useCallback, useRef } from "react";
import { Dimensions, Text, View } from "react-native";
import { Pressable } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Eye } from "lucide-react-native";

import { Skeleton } from "@/components/ui";

import BottomSheetAdvertisement from "./BottomSheetAdvertisement";

const SCREEN_WIDTH = Dimensions.get("window").width;

type AdvertisementCardData = any;

interface AdvertisementCardProps {
  data: AdvertisementCardData;
  handleRefresh?: () => void;
}

const AdvertisementCard = ({ data, handleRefresh }: AdvertisementCardProps) => {
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <>
      <Pressable
        className="flex bg-white rounded-2xl overflow-hidden w-full"
        style={{ width: (SCREEN_WIDTH - 48) - 4 }}
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
        <BottomSheetAdvertisement data={data} bottomSheetModalRef={bottomSheetModalRef} handleRefresh={handleRefresh} />
      </BottomSheetModal>
    </>
  );
};

interface AdvertisementCardSkeletonProps {
  hidden?: boolean;
}

const AdvertisementCardSkeleton = ({ hidden }: AdvertisementCardSkeletonProps) => (
  <View
    className={`flex bg-white rounded-2xl overflow-hidden ${hidden ? "invisible" : "visible"}`}
    style={{ width: (SCREEN_WIDTH - 48) - 4 }}
  >
    <Skeleton height={180} />
    <View className="flex flex-col p-4 gap-2">
      <View className="flex flex-row justify-between items-center">
        <Skeleton width={160} height={16} />
      </View>
      <Skeleton width={190} height={14} />
    </View>
  </View>
);

export { AdvertisementCard, AdvertisementCardSkeleton };

export default AdvertisementCard;