import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";

import Summary from "./chambaView";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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

export default function Menu() {
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${apiUrl}/advertisement/?area_id=2&status=2`);
      const data = await response.json();
      setAvailableJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedJob
        ? (
            <Summary job={selectedJob} setSelectedJob={setSelectedJob} />
          )
        : (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {availableJobs.map(job => (
                <TouchableOpacity key={job.ad_id} onPress={() => setSelectedJob(job)}>
                  <Card style={styles.card}>
                    <Card.Cover source={{ uri: job.image || "https://picsum.photos/700" }} style={styles.newCardCover} />
                    <Card.Content>
                      <Title>{job.title}</Title>
                      <Text style={styles.subText}>
                        Para:
                        {" "}
                        <Text style={styles.bold}>
                          {job.created_by.first_name}
                          {" "}
                          {job.created_by.last_name}
                        </Text>
                      </Text>
                      <Text style={styles.subText}>
                        Pago:
                        {" "}
                        <Text style={styles.bold}>{job.price}</Text>
                      </Text>
                      <Text style={styles.subText}>{job.start_date}</Text>
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
    flex: 1,
    padding: "5%"
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: "5%"
  },
  card: {
    width: "100%",
    overflow: "hidden",
    marginVertical: 10 // Add margin between cards
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
    height: 150, // Set a fixed height for the Card.Cover
    resizeMode: "cover",
    borderRadius: 0
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
