import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { G, Path, SvgProps } from "react-native-svg";
import { Link } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

const AppleIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#fff"
      d="M17.55 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C3.29 15.25 4.01 7.59 9.55 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01ZM12.53 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"
    />
  </Svg>
);

const GoogleIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G>
      <Path
        fill="#4285F4"
        d="M24.488 12.225c0-.984-.081-1.701-.258-2.445H12.74v4.438h6.745c-.136 1.102-.87 2.764-2.502 3.88l-.023.148 3.633 2.75.252.025c2.312-2.086 3.644-5.156 3.644-8.796Z"
      />
      <Path
        fill="#34A853"
        d="M12.739 23.918c3.305 0 6.079-1.063 8.105-2.897l-3.862-2.923c-1.034.704-2.42 1.195-4.243 1.195a7.352 7.352 0 0 1-6.963-4.969l-.143.012-3.778 2.857-.05.134c2.013 3.906 6.147 6.59 10.934 6.59Z"
      />
      <Path
        fill="#FBBC05"
        d="M5.776 14.324a7.21 7.21 0 0 1-.408-2.365c0-.824.15-1.621.395-2.365l-.007-.159L1.93 6.532l-.126.059A11.747 11.747 0 0 0 .5 11.959c0 1.927.476 3.747 1.305 5.368l3.971-3.003Z"
      />
      <Path
        fill="#EB4335"
        d="M12.739 4.624c2.298 0 3.848.97 4.732 1.78l3.454-3.295C18.805 1.183 16.044 0 12.74 0 7.952 0 3.818 2.684 1.805 6.59l3.958 3.004a7.383 7.383 0 0 1 6.976-4.97Z"
      />
    </G>
  </Svg>
);

export default function Login() {
  const { setAuthState } = useAuth();
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-[#FFFF] px-6 w-full h-full" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="flex flex-col gap-4 my-auto h-full justify-center">
        <Text className="font-bold text-4xl text-[#333333]">¡Bienvenido! </Text>
        <Text className="text-base text-[#979797] max-w-96">
          Inicia sesión y comienza a descubrir nuevas oportunidades
        </Text>

        <TouchableOpacity
          className="w-full py-4 px-3 bg-primary rounded-xl"
          onPress={() => setAuthState({
            mode: "chamber"
          })}
        >
          <Text className="text-white text-center text-base font-medium">Acceder</Text>
        </TouchableOpacity>

        <View className="w-full flex flex-row items-center gap-3">
          <View className="h-[2px] bg-[#F5F5F7] flex-1" />
          <Text className="text-base text-[#333333]">o</Text>
          <View className="h-[2px] bg-[#F5F5F7] flex-1" />
        </View>

        <TouchableOpacity className="w-full py-4 px-3 bg-[#333333] rounded-xl flex flex-row items-center justify-center gap-2">
          <AppleIcon width={24} height={24} />
          <Text className="text-white text-base font-medium">Acceder con Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-full py-4 px-3 rounded-xl border border-borderGray flex flex-row items-center justify-center gap-2">
          <GoogleIcon width={24} height={24} />
          <Text className="text-[#333333] text-center text-base font-medium">Acceder con Google</Text>
        </TouchableOpacity>

      </View>
      <Text className="text-center mt-auto mb-8">
        No tienes una cuenta?
        {" "}
        <Link href="/(auth)/sign-up">
          <Text className="text-blue-500">Regístrate</Text>
        </Link>
      </Text>
    </View>
  );
}
