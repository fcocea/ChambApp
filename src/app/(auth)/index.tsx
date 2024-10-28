import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

import AppleIcon from "@/components/icons/AppleIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import Separator from "@/components/Separator";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { setAuthState } = useAuth();
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-[#FFFF] px-6" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="flex justify-between flex-1">
        <View className="flex flex-col gap-12 justify-center my-auto">
          <View className="flex gap-6">
            <Text className="font-bold text-4xl text-[#333333]">¡Bienvenido! </Text>
            <Text className="text-base text-[#979797] max-w-96">
              Inicia sesión y comienza a descubrir nuevas oportunidades
            </Text>
          </View>
          <View className="flex gap-4">
            <TextInput placeholder="Ingresa tu correo" className="w-full h-14 border-borderGray border rounded-xl px-5" placeholderTextColor="#BDBDBD" />
            <TextInput placeholder="Ingresa tu contraseña" className="w-full h-14 border-borderGray border rounded-xl px-5" placeholderTextColor="#BDBDBD" />
          </View>
          <View className="flex gap-6">
            <TouchableOpacity
              className="w-full py-4 px-3 bg-primary rounded-xl"
              onPress={() => setAuthState({
                mode: "chamber"
              })}
            >
              <Text className="text-white text-center text-base font-medium">Acceder</Text>
            </TouchableOpacity>
            <Separator text="o" />
            <TouchableOpacity
              className="w-full py-4 px-3 bg-[#333333] rounded-xl flex flex-row items-center justify-center gap-2"
              onPress={() => setAuthState({
                mode: "user"
              })}
            >
              <AppleIcon width={24} height={24} />
              <Text className="text-white text-base font-medium">Acceder con Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full py-4 px-3 rounded-xl border border-borderGray flex flex-row items-center justify-center gap-2">
              <GoogleIcon width={24} height={24} />
              <Text className="text-[#333333] text-center text-base font-medium">Acceder con Google</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mb-8 ">
          <Text className="text-center">
            No tienes una cuenta?
            {" "}
            <Link href="/(auth)/sign-up">
              <Text className="text-blue-500">Regístrate</Text>
            </Link>
          </Text>

        </View>
      </View>
    </View>
  );
}
