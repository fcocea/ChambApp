import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function AdvertisementReview() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>
        Advertisement Review Chamber
        {" "}
        {id}
      </Text>
    </View>
  );
}
