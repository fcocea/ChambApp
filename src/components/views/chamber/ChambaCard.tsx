import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, Title } from "react-native-paper";

type Job = {
  ad_id: string;
  title: string;
  description: string;
  creation_date: string;
  status: number;
  price: number;
  start_date: string;
  address: string;
  first_name: string;
  last_name: string;
  image?: any;
};

type JobListProps = {
  availableJobs: Job[];
  setSelectedJob: (job: Job | null) => void;
};

function formatDate(dateString: string | number | Date) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short"
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

const JobList: React.FC<JobListProps> = ({ availableJobs, setSelectedJob }) => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    {availableJobs.map(job => (
      <TouchableOpacity key={job.ad_id} onPress={() => setSelectedJob(job)}>
        <Card style={styles.card}>
          <View style={styles.imageContainer}>
            <Card.Cover source={{ uri: job.image || "https://picsum.photos/700" }} style={styles.newCardCover} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Limpieza</Text>
            </View>
          </View>
          <Card.Content>
            <Title style={styles.title}>{job.title}</Title>
            <View style={styles.horizontalContainer}>
              <Text style={styles.subText}>
                Para:
                {" "}
                <Text>
                  {job.first_name}
                  {" "}
                  {job.last_name}
                </Text>
              </Text>
              <Text style={styles.subText}>
                {formatDate(job.start_date).date}
                {" "}
                {formatDate(job.start_date).time}
                {" hrs"}
              </Text>
            </View>
            <View style={styles.horizontalContainer}>
              <Text style={styles.subText}>
                Pago:
                {" "}
                <Text>{job.price}</Text>
              </Text>
              <Text style={styles.subText}>{job.address}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default JobList;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24
  },
  card: {
    marginBottom: 10
  },
  imageContainer: {
    position: "relative"
  },
  newCardCover: {
    height: 200
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "green",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  badgeText: {
    color: "white",
    fontWeight: "bold"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  subText: {
    fontSize: 12
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  }
});
