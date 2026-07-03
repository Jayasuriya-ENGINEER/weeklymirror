import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  reflection: string;
}

export default function ReflectionCard({ reflection }: Props) {
  if (!reflection) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reflection</Text>

      <View style={styles.card}>
        <Text style={styles.text}>{reflection}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 35,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  text: {
    fontSize: 17,
    lineHeight: 31,
    color: "#555",
  },
});
