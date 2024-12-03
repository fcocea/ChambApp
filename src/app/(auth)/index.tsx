import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

import AppleIcon from "@/components/icons/AppleIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Separator } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";

interface AuthForm {
  email: string;
  password: string;
  mode: "chamber" | "user";
}

export default function Login() {
  const { login, loading } = useAuth();
  const insets = useSafeAreaInsets();

  const { ...methods } = useForm<AuthForm>();
  const onSubmit: SubmitHandler<AuthForm> = ({ email, password, mode }) => login(email, password, () => methods.setError("email", { type: "manual", message: "Credenciales inválidas" }), mode);
  const { formState: { errors } } = methods;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      className="flex-1 bg-background px-6"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex justify-between flex-1">
          <View className="flex flex-col gap-12 justify-center my-auto">
            <View className="flex gap-6">
              <Text className="font-bold text-4xl text-[#333333]">¡Bienvenido! </Text>
              <Text className="text-base text-[#979797] max-w-96">
                Inicia sesión y comienza a descubrir nuevas oportunidades
              </Text>
            </View>
            <View className="flex gap-4">
              <FormProvider {...methods}>
                <View>
                  <Controller
                    name="email"
                    rules={{
                      required: "Este campo es requerido"
                    }}
                    render={({ field }) => (
                      <TextInput
                        placeholder="Ingresa tu correo"
                        className={`w-full h-14  border rounded-xl px-5 ${errors?.email?.message ? "border-red-600" : "border-borderGray"}`}
                        placeholderTextColor="#BDBDBD"
                        keyboardType="email-address"
                        defaultValue={field.value}
                        onChangeText={field.onChange}
                      />
                    )}
                  />
                  <Text className={`${errors?.email?.message ? "" : "invisible"} text-sm text-red-600`}>
                    {errors?.email?.message ? errors?.email?.message : "n/a"}
                  </Text>
                </View>
                <View>
                  <Controller
                    name="password"
                    rules={{
                      required: "Este campo es requerido"
                    }}
                    render={({ field }) => (
                      <TextInput
                        placeholder="Ingresa tu contraseña"
                        className={`w-full h-14  border rounded-xl px-5 ${errors?.password?.message ? "border-red-600" : "border-borderGray"}`}
                        placeholderTextColor="#BDBDBD"
                        defaultValue={field.value}
                        onChangeText={field.onChange}
                        secureTextEntry
                      />
                    )}
                  />
                  <Text className={`${errors?.password?.message ? "" : "invisible"} text-sm text-red-600`}>
                    {errors?.password?.message ? errors?.password?.message : "n/a"}
                  </Text>
                </View>
              </FormProvider>
            </View>
            <View className="flex gap-6">
              <TouchableOpacity
                className={`w-full py-4 px-3 bg-primary rounded-xl ${loading ? "opacity-50" : ""}`}
                onPress={() => methods.handleSubmit(onSubmit)()}
                disabled={loading}
              >
                <View className="self-center">
                  {loading && <ActivityIndicator color="#ffffff" className="absolute -left-8" />}
                  <Text className="text-white text-center text-base font-medium  w-fit">Acceder</Text>
                </View>
              </TouchableOpacity>
              <Separator text="o" color="#E5E7EB" />
              {Platform.OS === "ios" && (
                <TouchableOpacity className="w-full py-4 px-3 bg-[#333333] rounded-xl flex flex-row items-center justify-center gap-2">
                  <AppleIcon width={24} height={24} />
                  <Text className="text-white text-base font-medium">Acceder con Apple</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity className="w-full py-4 px-3 rounded-xl border border-borderGray flex flex-row items-center justify-center gap-2">
                <GoogleIcon width={24} height={24} />
                <Text className="text-[#333333] text-center text-base font-medium">Acceder con Google</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{
            paddingBottom: insets.bottom + 20
          }}
          >
            <Text className="text-center">
              No tienes una cuenta?
              {" "}
              <Link href="/(auth)/sign-up">
                <Text className="text-primary">Regístrate</Text>
              </Link>
            </Text>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
