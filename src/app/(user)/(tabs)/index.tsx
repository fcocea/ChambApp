import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Encabezado de Ubicación y Notificación */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-300">
        <View>
          <Text className="text-gray-500 text-xs">Ubicación</Text>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#000" />
            <Text className="text-lg font-bold ml-1">Concepción, Chile</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#000" style={{ marginLeft: 4 }} />
          </View>
        </View>

        {/* Ícono de Campana con Notificación */}
        <View>
          <FontAwesome name="bell" size={24} color="#000" />
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 8,
              height: 8,
              backgroundColor: "blue",
              borderRadius: 4
            }}
          />
        </View>
      </View>

      {/* Mensaje de Bienvenida */}
      <View className="px-4 py-3 bg-gray-100">
        <Text className="text-xl font-bold">Hola Juan 👋</Text>
        <Text className="text-gray-500">Encuentra la solución a tus problemas</Text>
      </View>

      {/* Botones */}
      <View className="flex-row justify-around py-3 bg-white ">
        <Button title="Tus anuncios" color="#007bff" />
        <Button title="Historial" color="#cccccc" />
        <TouchableOpacity>
          <Text className="text-white  font-bold rounded-[25px] bg-[#2F80ED] px-4 p-2">+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de anuncios */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        {/* Card de anuncio */}
        <TouchableOpacity className="mb-4 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
          <Image source={{ uri: "https://i.pinimg.com/564x/b7/21/3d/b7213d2e2ca6435c504bfd4294c86288.jpg" }} style={{ width: "100%", height: 200 }} />
          <View className="p-4">
            <Text className="font-bold text-lg">Limpieza depto</Text>
            <View className="flex-row justify-between items-center mt-2">
              <View className="flex-row items-center gap-2">
                <Ionicons name="time-outline" size={16} color="#757575" />
                <Text className="text-gray-500">5 min</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <FontAwesome name="eye" size={16} color="#757575" />
                <Text className="text-gray-500">1 chambers</Text>
              </View>
            </View>
            <View className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded-full">
              <Text className="text-white text-xs">Limpieza</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="mb-4 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
          <Image source={{ uri: "https://i.pinimg.com/564x/4c/f2/2d/4cf22d2a0918485ae11edea29d6f1fc2.jpg" }} style={{ width: "100%", height: 200 }} />
          <View className="p-4">
            <Text className="font-bold text-lg">Paseo perros</Text>
            <View className="flex-row justify-between items-center mt-2">
              <View className="flex-row items-center gap-2">
                <Ionicons name="time-outline" size={16} color="#757575" />
                <Text className="text-gray-500">24 min</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <FontAwesome name="eye" size={16} color="#757575" />
                <Text className="text-gray-500">5 chambers</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="mb-4 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
          <Image source={{ uri: "https://i.pinimg.com/564x/f4/41/5f/f4415f2a544f078589ce99dc240112d3.jpg" }} style={{ width: "100%", height: 200 }} />
          <View className="p-4">
            <Text className="font-bold text-lg">Limpieza profunda ofi</Text>
            <View className="flex-row justify-between items-center mt-2">
              <View className="flex-row items-center gap-2">
                <Ionicons name="time-outline" size={16} color="#757575" />
                <Text className="text-gray-500">24 min</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <FontAwesome name="eye" size={16} color="#757575" />
                <Text className="text-gray-500">3 chambers</Text>
              </View>
            </View>
            <View className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded-full">
              <Text className="text-white text-xs">Limpieza</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}
