import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

import AppleIcon from "@/components/icons/AppleIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import Separator from "@/components/Separator";

export default function SignUp() {
  const inset = useSafeAreaInsets();
  return (
    <View
      className="flex-1 items-center bg-white w-full h-full px-6 gap-8"
      style={{ paddingBottom: inset.bottom }}
    >
      <View className="w-[255px] h-[215px]">
        <Image
          source={require("@assets/images/sign-up.png")}
          style={{
            width: 255,
            height: 215,
            alignSelf: "center"
          }}
        />
      </View>
      <View className="flex-1 w-full h-full flex gap-8">
        <Text className="font-bold text-4xl text-[#333333]">Crea una cuenta</Text>
        <View className="flex gap-6">
          <TextInput placeholder="Ingresa tu correo" className="w-full h-14 border-borderGray border rounded-xl px-5" placeholderTextColor="#BDBDBD" />
          <TextInput placeholder="Ingresa tu contraseña" className="w-full h-14 border-borderGray border rounded-xl px-5" placeholderTextColor="#BDBDBD" />
        </View>
        <View className="flex gap-6">
          <TouchableOpacity className="w-full py-4 px-3 bg-primary rounded-xl">
            <Text className="text-white text-center text-base font-medium">Continuar</Text>
          </TouchableOpacity>
          <Separator text="o" />
          <TouchableOpacity className="w-full py-4 px-3 bg-[#333333] rounded-xl flex flex-row items-center justify-center gap-2">
            <AppleIcon width={24} height={24} />
            <Text className="text-white text-base font-medium">Registrarse con Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full py-4 px-3 rounded-xl border border-borderGray flex flex-row items-center justify-center gap-2">
            <GoogleIcon width={24} height={24} />
            <Text className="text-[#333333] text-center text-base font-medium">Registrarse con Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
