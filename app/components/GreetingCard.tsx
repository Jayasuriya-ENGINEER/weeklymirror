import { View, Text, StyleSheet } from "react-native";

export default function GreetingCard() {
  const now = new Date();
  const hour = now.getHours();

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

      <Text style={styles.username}>Suriya</Text>
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
  },
});
