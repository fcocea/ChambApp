import { useState } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";

interface AvatarProps {
  src?: string;
  size?: number;
  name?: string;
}

function getInitials(name: string) {
  const [first, last] = name.split(" ");
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export function Avatar({ src, size = 40, name }: AvatarProps) {
  const [error, setError] = useState<boolean>(src ? false : true);
  return (
    error
      ? (
          <View className="flex items-center justify-center bg-gray-200" style={{ width: size, height: size, borderRadius: 50 }}>
            <Text className="text-gray-500 font-medium w-full text-center" style={{ fontSize: size / 3 }}>{getInitials(name || " ")}</Text>
          </View>
        )
      : (
          <Image
            source={src}
            style={{
              width: size,
              height: size,
              borderRadius: 50
            }}
            onError={() => setError(true)}
          />
        )
  );
}
