import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useProfileStore } from "../../stores/profileStore";

export default function GreetingCard() {
  const userName = useProfileStore((state) => state.name);
  const avatarUrl = useProfileStore((state) => state.avatarUrl);

  const hour = new Date().getHours();

  const quotes = [
    "Today's page is waiting.",
    "Every memory begins with a single moment.",
    "Small moments become lifelong memories.",
    "Capture today before it becomes yesterday.",
    "A beautiful life is written one day at a time.",
    "The little things are worth remembering.",
    "Today's ordinary may become tomorrow's treasure.",
    "Every sunset deserves a sentence.",
    "Life is made of moments, not milestones.",
    "One memory. One page. Every day.",
  ];

  const day = new Date().getDate();
  const quote = quotes[day % quotes.length];

  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={30} color="#A98B5E" />
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.username}>{userName}</Text>
          <Text style={styles.quote}>{quote}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 80,
    height: 102,
    borderRadius: 36,
    backgroundColor: "#EFE7DA",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 15,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    flex: 1,
  },

  greeting: {
    fontSize: 18,
    color: "#7A7A7A",
  },

  username: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1E1E1E",
    marginTop: 2,
  },

  quote: {
    fontSize: 16,
    color: "#7A7A7A",
    fontStyle: "italic",
  },
});
