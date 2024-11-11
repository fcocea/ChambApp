import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Inter_700Bold, useFonts } from "@expo-google-fonts/inter";

import { useAuth } from "@/hooks/useAuth";

import StarRating from "./starRating";

const chamber = {
  name: "John Doe",
  photo: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  rating: 4.5
};

export default function Profile() {
  const { logout } = useAuth();
  const [fontsLoaded] = useFonts({
    Inter_700Bold
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: chamber.photo }}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.name}>{chamber.name}</Text>
      <View style={styles.divider} />
      <View style={styles.areas}>
        <Text style={styles.chip}> Carpinteria</Text>
        <Text style={styles.chip}> Electricidad</Text>
      </View>
      <View style={styles.rating}>
        <StarRating rating={chamber.rating} />
      </View>
      <View style={styles.profileOptions}>
        <View style={styles.option}>
          <Text> Editar perfil</Text>
          <Icon name="cog" size={24} color="black" />
        </View>
        <View style={styles.option}>
          <Text> Historial</Text>
          <Icon name="history" size={24} color="black" />
        </View>
        <View style={styles.option}>
          <Text> Ayuda</Text>
          <Icon name="help-circle" size={24} color="black" />
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          logout();
        }}
        style={{ margin: 10 }}
      >
        Cerrar sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 20
  },
  profileImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    borderColor: "black",
    borderWidth: 1
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Inter_700Bold"
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
    marginVertical: 10
  },
  email: {
    fontSize: 18,
    color: "gray"
  },
  areas: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  chip: {
    backgroundColor: "#db98e4",
    paddingHorizontal: 15,
    borderRadius: 25,
    marginHorizontal: 5,
    color: "white"
  },
  rating: {
    padding: 10,
    borderRadius: 5
  },
  ratingText: {
    color: "white",
    fontSize: 16
  },
  profileOptions: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
    width: "100%"
  },
  closeButton: {

  },
  option: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    backgroundColor: "#f5f5f5",
    marginBottom: 5,
    borderRadius: 5,
    justifyContent: "space-between"
  }

});
