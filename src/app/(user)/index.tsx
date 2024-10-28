import { Button, Text, View } from "react-native";

import { useAuth } from "../../hooks/useAuth";

export default function Index() {
  const { setAuthState } = useAuth();
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold">User View </Text>
      <Button
        onPress={() => {
          setAuthState({
            mode: "chamber"
          });
        }}
        // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        title="Modo Chamber"
      >
      </Button>

      <Button
        onPress={() => {
          setAuthState(null);
        }}
        title="Logout"
      />
    </View>
  );
}
