import { Text, View } from "react-native";

export function Separator({ text }: { text?: string }) {
  return (
    <View className="w-full flex flex-row items-center gap-3">
      <View className="h-[2px] bg-[#F5F5F7] flex-1" />
      {text && (
        <>
          <Text className="text-base text-[#333333]">{text}</Text>
          <View className="h-[2px] bg-[#F5F5F7] flex-1" />
        </>
      )}
    </View>
  );
}
