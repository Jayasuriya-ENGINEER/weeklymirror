import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  quote: string;
}

export default function QuoteCard({ quote }: Props) {
  if (!quote) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.top}>❝</Text>

      <Text style={styles.quote}>{quote}</Text>

      <Text style={styles.bottom}>❞</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3EBDF",
    borderRadius: 22,
    paddingVertical: 1,
    paddingHorizontal: 18,
    marginBottom: 32,
    alignItems: "center",
  },

  top: {
    fontSize: 40,
    color: "#A98B5E",
  
  },

  bottom: {
    fontSize: 40,
    color: "#A98B5E",
    
  },

  quote: {
    fontSize: 18,
    lineHeight: 18,
    textAlign: "center",
    color: "#4D4337",
    fontStyle: "italic",
  },
});
