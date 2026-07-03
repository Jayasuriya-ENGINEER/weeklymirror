import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function GreetingCard() {
  const now = new Date();
  const hour = now.getHours();

  const [userName, setUserName] = useState("Your Name");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const value = await AsyncStorage.getItem("profile");

    if (!value) return;

    const profile = JSON.parse(value);

    setUserName(profile.name);
  };

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
      <Text style={styles.greeting}>{greeting},</Text>

      <Text style={styles.username}>{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  greeting: {
    fontSize: 20,
    color: "#666",
  },

  username: {
    fontSize: 32,
    fontWeight: "700",
    color: "#222",
  },
});