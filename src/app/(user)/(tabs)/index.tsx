import { Button, Text, View } from "react-native";
import { Link } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { logout, toggleMode } = useAuth();
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold">User View </Text>
      <Button
        onPress={() => {
          toggleMode();
        }}
        // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        title="Modo Chamber"
      >
      </Button>

      <Button
        onPress={() => {
          logout();
        }}
        title="Logout"
      />
      <Link href="/(advertisement)/advertisement/b0792a71-2029-40cf-86a5-51a652150257/select">
        <Text>Seleccionar chamber</Text>
      </Link>
    </View>
  );
}
