import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChambApp</Text>
      <Link href="/(User)/menu" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go to Menu</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16
  }
};
