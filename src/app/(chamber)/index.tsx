import { Button, Text, View } from "react-native";
import { Link } from "expo-router";

import { useAuth } from "../../hooks/useAuth";

export default function Index() {
  const { setAuthState } = useAuth();
  return (
    <View className="flex-1 justify-center items-center w-full h-full">
      <Text className="font-bold">Chamber View </Text>
      <Button
        onPress={() => {
          setAuthState({
            mode: "user"
          });
        }}
        title="Modo User"
      />
      <Link href="/menu" asChild>
        <Button title="Menu" />
      </Link>

      <Button
        onPress={() => {
          setAuthState(null);
        }}
        title="Logout"
      />
    </View>
  );
}
