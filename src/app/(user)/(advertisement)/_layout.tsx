import type { Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";
import { Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";

export const unstable_settings = {
  initialRouteName: "review"
};

type AdvertisementData = {
  info?: {
    title: string;
    description: string;
    creation_date: string;
    areas: string[];
    price: number;
    start_date: string;
  };
  selected?: {
    first_name: string;
    last_name: string;
    average_score: number;
    account_creation_date: string;
    num_evaluations: number;
    rut: string;
  };
};

type AdvertisementContextType = {
  advertisementData: AdvertisementData;
  setAdvertisementData: Dispatch<SetStateAction<AdvertisementData>>;
};

export const AdvertisementContext = createContext<AdvertisementContextType>({
  advertisementData: {},
  setAdvertisementData: () => {}
});

export default function RootLayout() {
  const router = useRouter();
  const [advertisementData, setAdvertisementData] = useState<AdvertisementData>({});
  return (
    <AdvertisementContext.Provider value={{ advertisementData, setAdvertisementData }}>
      <Stack screenOptions={{
        headerTintColor: "#FFFF",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "#1B456D"
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => router.back()} className="mr-2">
            <Feather name="chevron-left" size={24} color="#FFFF" />
          </Pressable>
        )
      }}
      >
        <Stack.Screen name="advertisement/[id]/review" options={{ title: "Revisar y confirmar" }} />
        <Stack.Screen name="advertisement/[id]/select" options={{ title: "Selecciona a tu chamber" }} />
        <Stack.Screen name="create" options={{ title: "Crear publicación" }} />
      </Stack>
    </AdvertisementContext.Provider>
  );
}
