import { createContext } from "react";
import { Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";

export const unstable_settings = {
  initialRouteName: "review"
};

// Context to share data between screens like the selected chamber in "select" screen
const AdvertisementContext = createContext({});

export default function RootLayout() {
  const router = useRouter();
  return (
    <AdvertisementContext.Provider value={{}}>
      <Stack screenOptions={{
        headerTintColor: "#333333",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "#ffffff"
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <Feather name="chevron-left" size={24} color="black" />
          </Pressable>
        )
      }}
      >
        <Stack.Screen name="advertisement/[id]/review" options={{ title: "Revisar y confirmar" }} />
        <Stack.Screen name="advertisement/[id]/select" options={{ title: "Selecciona a tu chamber" }} />
      </Stack>
    </AdvertisementContext.Provider>
  );
}
