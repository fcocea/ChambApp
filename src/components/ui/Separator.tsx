import type { ViewProps } from "react-native";
import { Text, View } from "react-native";

interface SeparatorProps extends ViewProps {
  text?: string;
  color?: string;
}

export function Separator({ text, className, color, ...props }: SeparatorProps) {
  return (
    <View className={`w-full flex flex-row items-center gap-3 ${className}`} {...props}>
      <View
        className="h-[2px] flex-1"
        style={
          {
            backgroundColor: color ? color : "#1B456D"
          }
        }
      />
      {text && (
        <>
          <Text className="text-base text-[#333333]">{text}</Text>
          <View
            className="h-[2px] flex-1"
            style={
              {
                backgroundColor: color ? color : "#1B456D"
              }
            }
          />
        </>
      )}
    </View>
  );
}
