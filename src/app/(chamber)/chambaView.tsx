import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { Inter } from "@expo-google-fonts/inter";

type Job = {
  ad_id: string;
  title: string;
  description: string;
  creation_date: string;
  status: number;
  price: number;
  start_date: string;
  address: string;
  created_by: {
    rut: string;
    first_name: string;
    last_name: string;
  };
  image?: any;
};

type SummaryProps = {
  job: Job;
  setSelectedJob: (job: Job | null) => void;
};

export default function Summary({ job, setSelectedJob }: SummaryProps) {
  return (
    <View style={styles.container}>
      {/* Title job.title */}
      <Text style={styles.cardTitle}>{job.title}</Text>
      {/* Job Image job.image */}
      <Card.Cover source={{ uri: job.image || "https://picsum.photos/700" }} style={styles.image} />
      <Card.Content style={styles.jobDetailsContainer}>
        <View style={styles.verticalContainer}>
          {/* Para: job.created_by.first_name job.created_by.last_name  */}
          <Text style={styles.fieldTextBold}>
            Para:
            {" "}
            <Text style={styles.fieldText}>
              {job.created_by.first_name}
              {" "}
              {job.created_by.last_name}
            </Text>
          </Text>
          <Text style={styles.fieldTextBold}>
            {/* Pago: job.price */}
            Pago: $
            <Text style={styles.fieldText}>
              {job.price}
            </Text>
          </Text>
        </View>
        {/* Description job.description */}
        <View style={styles.jobDescriptionContainer}>
          <Text style={styles.fieldTextBold}>Descripción</Text>
          <Text style={styles.fieldText}>{job.description}</Text>
        </View>
      </Card.Content>
      <View style={styles.jobDescriptionContainer}>
        <Text style={styles.sectionTitle}>Ubicacion de la chamba</Text>
        <Image source={{ uri: "https://picsum.photos/700" }} style={styles.map} />
      </View>
      <Card.Actions style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => setSelectedJob(null)} style={styles.button}>
          ¡Chatea con el cliente!
        </Button>
      </Card.Actions>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: Inter,
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    gap: 20
  },
  card: {
    width: "90%",
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  chip: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "green",
    color: "white"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10
  },
  verticalContainer: {
    flexDirection: "column",
    textAlign: "left"
  },
  detailText: {
    fontSize: 16,
    color: "gray"
  },
  boldText: {
    color: "black",
    fontWeight: "bold"
  },
  price: {
    fontSize: 20,
    color: "#007AFF",
    marginVertical: 5
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
    color: "gray"
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
  map: {
    width: "100%",
    height: 150,
    marginVertical: 10
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column"
  },
  button: {
    backgroundColor: "#2F80ED",
    paddingVertical: "2%",
    borderRadius: 10,
    fontWeight: 400,
    fontSize: 17,
    fontFamily: "Roboto",
    width: "100%"
  },
  cardTitle: {
    fontSize: 18,
    color: "#0D141C",
    fontWeight: 700,
    textAlign: "center"
  },
  fieldTextBold: {
    fontSize: 16,
    color: "#2F80ED",
    fontWeight: "bold"
  },
  fieldText: {
    fontSize: 16,
    color: "#2F80ED",
    fontWeight: "400"
  },
  jobDetailsContainer: {
    width: "100%",
    padding: "2%",
    gap: 20
  },
  jobDescriptionContainer: {
    width: "100%",
    flexDirection: "column"
  }
});
