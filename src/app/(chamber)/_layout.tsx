import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import NavBar from "../../components/navegation";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <NavBar />
    </SafeAreaProvider>
  );
}
