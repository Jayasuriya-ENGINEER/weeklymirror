import React from "react";
import { Text, StyleSheet } from "react-native";

export default function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    marginTop: 22,
    marginBottom: 12,
    color: "#A98B5E",
    letterSpacing: 2,
    fontWeight: "700",
    fontSize: 13,
  },
});
