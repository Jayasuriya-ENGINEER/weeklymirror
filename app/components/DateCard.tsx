import { View, Text, StyleSheet } from "react-native";

export default function DateCard() {
  const now = new Date();

  const date = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const day = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>

      <Text style={styles.day}>{day}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EFE6DA",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  date: {
    fontSize: 20,
    fontWeight: "600",
  },

  day: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});
