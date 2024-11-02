import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { Inter_700Bold, useFonts } from "@expo-google-fonts/inter";

const chamber = {
  name: "John Doe",
  photo: "https://example.com/profile-picture.jpg"
};

export default function Profile() {
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
    backgroundColor: "gray"
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
  }
});
