import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

import Summary from "./chambaView";

type Job = {
  title: string;
  description: string;
  image?: any; // Optional image property
};

const availableJobs = [
  { title: "job1", description: "description1" },
  { title: "job2", description: "description2" },
  { title: "job3", description: "description3" }
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
            availableJobs.map(job => (
              <TouchableOpacity key={job.title} onPress={() => setSelectedJob(job)}>
                <Card style={styles.card}>
                  <Card.Content>
                    <Title>{job.title}</Title>
                    <Paragraph>{job.description}</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "90%",
    margin: 10
  }
});
