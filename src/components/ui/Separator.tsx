import type { ViewProps } from "react-native";
import { Text, View } from "react-native";

interface SeparatorProps extends ViewProps {
  text?: string;
}

export function Separator({ text, className, ...props }: SeparatorProps) {
  return (
    <View className={`w-full flex flex-row items-center gap-3 ${className}`} {...props}>
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
