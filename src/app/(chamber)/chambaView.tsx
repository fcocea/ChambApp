import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { Inter_400Regular, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";

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

function formatDate(dateString: string | number | Date) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  };

  const date = new Date(dateString).toLocaleDateString("en-GB", dateOptions);
  const time = new Date(dateString).toLocaleTimeString("en-GB", timeOptions);

  return { date, time };
}

export default function Summary({ job, setSelectedJob }: SummaryProps) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => setSelectedJob(null)}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        {/* Title job.title */}
        <Text style={styles.cardTitle}>{job.title}</Text>
      </View>
      {/* Job Image job.image */}
      <Card.Cover source={{ uri: job.image || "https://picsum.photos/700" }} style={styles.image} />
      <Card.Content style={styles.jobDetailsContainer}>
        <View style={styles.verticalContainer}>
          {/* Para: job.created_by.first_name job.created_by.last_name  */}
          <View style={styles.horizontalContainer}>
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
          <View style={styles.horizontalContainer}>
            <Text style={styles.fieldTextBold}>
              {/* Pago: job.price */}
              Fecha:
              {" "}
              <Text style={styles.fieldText}>
                {formatDate(job.start_date).date}
              </Text>
            </Text>
            <Text style={styles.fieldTextBold}>
              {/* Pago: job.price */}
              Hora:
              {" "}
              <Text style={styles.fieldText}>
                {formatDate(job.start_date).time}
              </Text>
            </Text>

          </View>
        </View>
        {/* Description job.description */}
        <View style={styles.jobDescriptionContainer}>
          <Text style={styles.fieldTextBold}>Descripción</Text>
          <Text style={styles.fieldText}>{job.description}</Text>
        </View>
      </Card.Content>
      <View style={styles.jobDescriptionContainer}>
        <Text style={styles.sectionTitle}>Ubicacion de la chamba</Text>
        <Image source={{ uri: "https://storage.googleapis.com/support-forums-api/attachment/thread-28908032-12708632011346779300.jpg" }} style={styles.map} />
      </View>
      <Card.Actions>
        <View style={styles.buttonsContainer}>
          <Button mode="contained" onPress={() => setSelectedJob(null)} style={styles.button}>
            <Text style={styles.buttonText}>
              ¡Postula a la chamba!
            </Text>
          </Button>
          <Button mode="contained" onPress={() => setSelectedJob(null)} style={styles.button}>
            <Text style={styles.buttonText}>¡Chatea con el cliente!</Text>
          </Button>
        </View>
      </Card.Actions>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Inter_400Regular",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginTop: 20
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 30
  },
  backButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  cardTitle: {
    fontSize: 30,
    color: "#0D141C",
    fontWeight: 700,
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  jobDetailsContainer: {
    width: "100%",
    padding: "2%",
    gap: 20
  },
  verticalContainer: {
    flexDirection: "column",
    textAlign: "left"
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  fieldTextBold: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold"
  },
  fieldText: {
    fontSize: 16,
    color: "black",
    fontWeight: "400"
  },
  jobDescriptionContainer: {
    width: "100%",
    flexDirection: "column"
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
  buttonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20
  },
  button: {
    backgroundColor: "#2F80ED",
    borderRadius: 10,
    alignItems: "flex-start"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold"
  }
});
