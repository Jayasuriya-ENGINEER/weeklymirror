import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AIWeekEdition } from "@/type/aiEdition";
interface Props {
  issueNumber: number;
  startDate: string;
  endDate: string;
  capturedDays: number;
  title:string;
  summary:string;
  quote:string;
  mood:string;
}

export default function EditionCover({
  issueNumber,
  startDate,
  endDate,
  capturedDays,
  title,
  summary,
  quote,
  mood,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>WEEKLY MIRROR</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.period}>
        {startDate} — {endDate}
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {mood.toUpperCase()} • {capturedDays}/7 DAYS
        </Text>
      </View>

      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          {quote}
        </Text>
      </View>

      <Text style={styles.editor}>EDITORS NOTE</Text>

      <Text style={styles.summary}>
        {summary}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.issue}>Issue {issueNumber}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 60,
    padding: 20,
    paddingBottom: 120,
  },

  brand: {
    alignSelf: "center",
    color: "#A98B5E",
    letterSpacing: 4,
    fontWeight: "700",
    fontSize: 12,
  },

  title: {
    marginTop: 22,
    fontSize: 38,
    fontWeight: "800",
    textAlign: "center",
    color: "#222",
    lineHeight: 45,
  },

  period: {
    marginTop: 22,
    textAlign: "center",
    color: "#777",
    fontSize: 16,
  },

  badge: {
    marginTop: 22,
    alignSelf: "center",
    backgroundColor: "#EFE7D7",
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  badgeText: {
    color: "#A98B5E",
    fontWeight: "700",
    letterSpacing: 1,
  },

  quoteContainer: {
    marginTop: 40,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },

  quote: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 34,
    fontStyle: "italic",
    color: "#444",
  },

  editor: {
    marginTop: 36,
    letterSpacing: 2,
    color: "#A98B5E",
    fontWeight: "700",
  },

  summary: {
    marginTop: 12,
    lineHeight: 30,
    fontSize: 17,
    color: "#555",
  },

  footer: {
    marginTop: 40,
    alignItems: "center",
  },

  issue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444",
  },
});
