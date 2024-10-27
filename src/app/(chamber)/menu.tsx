import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";

import Summary from "./chambaView";

type Job = {
  title: string;
  owner: string;
  address: string;
  price: string;
  time: string;
  description: string;
  image?: any;
};

const availableJobs = [
  {
    title: "Limpiar la casa",
    owner: "Clara",
    address: "Calle 1",
    price: "25000",
    time: "19:30",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
  {
    title: "Pasear al perro",
    owner: "Clara",
    address: "Calle 2",
    price: "15000",
    time: "12:00",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
  {
    title: "Lavar el auto",
    owner: "Clara",
    address: "Calle 3",
    price: "20000",
    time: "10:40",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  }
];

export default function Menu() {
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);

  return (
    <View style={styles.container}>
      {selectedJob
        ? (
            <Summary job={selectedJob} setSelectedJob={setSelectedJob} />
          )
        : (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {availableJobs.map((job, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedJob(job)}>
                  <Card style={styles.card}>
                    <Card.Cover
                      style={styles.newCardCover}
                      source={{ uri: "https://picsum.photos/700" }}
                    />
                    <Card.Content>
                      <Title>{job.title}</Title>
                      <Text style={styles.subText}>
                        Para:
                        <Text style={styles.bold}>
                          {" "}
                          {job.owner}
                        </Text>
                      </Text>
                      <Text style={styles.subText}>
                        Pago:
                        <Text style={styles.bold}>
                          {" "}
                          $
                          {job.price}
                        </Text>
                      </Text>
                      <Text style={styles.subText}>{job.time}</Text>
                      <Text style={styles.subText}>{job.address}</Text>
                      <Paragraph>{job.description}</Paragraph>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: "5%"
  },
  card: {
    width: "100%",
    marginVertical: 10
  },
  subText: {
    color: "gray",
    marginVertical: 2
  },
  bold: {
    color: "#007AFF",
    fontWeight: "bold"
  },
  newCardCover: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 0
  }
});
