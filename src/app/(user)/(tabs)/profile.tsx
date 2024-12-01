import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { Avatar } from "@/components/ui";
import { Separator } from "@/components/ui/Separator";
import { useAuth } from "@/hooks/useAuth";

const screenWidth = Dimensions.get("window").width;
const boxWidth = 800;
const toLeft = (screenWidth - boxWidth * 1.8) / 2;

export default function Profile() {
  const { authState: { user }, toggleMode, logout } = useAuth();

  return (
    <View className="flex-1 h-full w-full bg-primary pt-20">
      <View className="flex flex-col relative rounded-t-[32px] mt-16 pt-6 flex-1 gap-6 w-full">
        <View
          className="absolute top-[-50px] right-0 h-[200px] bg-white"
          style={
            {
              left: toLeft,
              width: boxWidth * 1.8,
              height: boxWidth * 1.8,
              borderTopLeftRadius: boxWidth,
              borderTopRightRadius: boxWidth
            }
          }
        />
        <View className="left-[50%] top-[-100px] -translate-x-1/2 absolute">
          <Avatar size={100} name={`${user?.first_name} ${user?.last_name}`} />
        </View>
        <Text className="text-center text-2xl font-bold -mt-4">{`${user?.first_name} ${user?.last_name}`}</Text>
        <View className="justify-center -mt-5 flex flex-row items-center gap-2">
          <Feather name="star" size={15} color="primary" />
          <Text className="text-lg font-semibold">4.00 </Text>
        </View>
        <ScrollView>
          <View className="flex flex-1 gap-5 w-full px-6">
            <Separator color="#E5E7EB" />
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-col">
                <Text className="font-bold text-base">Correo electrónico</Text>
                <Text className=" text-base">{user.email}</Text>
              </View>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
            <Separator color="#E5E7EB" />
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-col">
                <Text className="font-bold text-base">Teléfono</Text>
                <Text className=" text-base">{"+" + user.phone}</Text>
              </View>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
            <Separator color="#E5E7EB" />
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-col">
                <Text className="font-bold text-base">Fecha de nacimiento</Text>
                <Text className=" text-base">{user.birth_date}</Text>
              </View>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
            <Separator color="#E5E7EB" />
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-col">
                <Text className="font-bold text-base">Género</Text>
                <Text className=" text-base">{user.gender === "M" ? "Masculino" : "Femenino"}</Text>
              </View>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
            <Separator color="#E5E7EB" />
            <View className="flex gap-3 pb-6">
              {user.can_be_chamber
              && (
                <TouchableOpacity
                  className={`w-full py-4 px-3 bg-primary rounded-xl `}
                  onPress={() => toggleMode()}
                >
                  <View className="self-center">
                    <Text className="text-white text-center text-base font-medium  w-fit">Cambia a modo Chamber</Text>
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                className={`w-full py-4 px-3 bg-white border-borderGray border rounded-xl `}
                onPress={() => logout()}
              >
                <View className="self-center">
                  <Text className="text-primary text-center text-base font-medium  w-fit">Cerrar sesión</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
