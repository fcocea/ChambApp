import { Button, Text, View } from "react-native";

import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { setAuthState } = useAuth();
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold">Chamber View </Text>
      <Button
        onPress={() => {
          setAuthState(null);
        }}
        title="Modo Chamber"
      >
      </Button>
    </View>
  );
}
