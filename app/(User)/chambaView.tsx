import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

type Job = {
  title: string;
  description: string;
  image?: any;
};

type SummaryProps = {
  job: Job;
  setSelectedJob: (job: Job | null) => void;
};

export default function Summary({ job, setSelectedJob }: SummaryProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Image
          source={job.image}
          style={styles.image}
        />
        <Card.Content>
          <Title>{job.title}</Title>
          <Paragraph>{job.description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => setSelectedJob(null)}>Back</Button>
        </Card.Actions>
      </Card>
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
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  }
});
