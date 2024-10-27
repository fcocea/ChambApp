import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

type Job = {
  title: string;
  description: string;
  owner: string;
  address: string;
  price: string;
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
        <Card.Cover source={job.image} style={styles.image} />
        <Card.Content>
          <Title>{job.title}</Title>
          <View style={styles.flexContainer}>
            <Paragraph style={styles.flexItem}>{job.owner}</Paragraph>
            <Paragraph style={styles.flexItem}>{job.address}</Paragraph>
            <Paragraph style={styles.flexItem}>{job.price}</Paragraph>
          </View>
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
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "90%",
    height: "90%",
    margin: 10
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  flexContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#007AFF",
    marginVertical: 10
  },
  flexItem: {
    flexBasis: "33%", // Adjust this value to control the number of items per row
    marginBottom: 10,
    color: "#fff"
  }
});
