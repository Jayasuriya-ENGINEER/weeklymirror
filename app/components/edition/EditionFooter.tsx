import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EditionFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.line}>— End of this week's edition —</Text>

      <Text style={styles.brand}>WEEKLY MIRROR</Text>

      <Text style={styles.next}>See you next week.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },

  line: {
    color: "#888",
    fontStyle: "italic",
    marginBottom: 18,
  },

  brand: {
    letterSpacing: 6,
    color: "#A98B5E",
    fontWeight: "700",
    marginBottom: 8,
  },

  next: {
    color: "#888",
  },
});
