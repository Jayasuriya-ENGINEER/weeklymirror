import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  issueNumber: number;
  startDate: string;
  endDate: string;
  capturedDays: number;
  /** When true, this is a live preview of an unfinished week. */
  isPreview?: boolean;
}

export default function EditionHeader({
  issueNumber,
  startDate,
  endDate,
  capturedDays,
  isPreview = false,
}: Props) {
  const title =
    capturedDays === 0
      ? "A Quiet Week"
      : capturedDays === 1
        ? "One Day Worth Keeping"
        : `${capturedDays} Days Worth Remembering`;

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>WEEKLY MIRROR</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.period}>
        {startDate} – {endDate}
      </Text>

      <Text style={styles.issue}>Issue {issueNumber}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {isPreview ? "IN PROGRESS" : "SNAPSHOT"} • {capturedDays}/7 DAYS
        </Text>
      </View>

      <Text style={styles.noteTitle}>Editor&apos;s Note</Text>

      <Text style={styles.note}>
        {isPreview
          ? "This is your live newspaper for the week so far — your raw memories, laid out as a simple edition. Keep capturing; AI publishing unlocks after the week ends with at least 3 days."
          : "This week is preserved as a personal newspaper snapshot of the memories you captured — no AI rewrite, just your own words."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 40,
    paddingHorizontal: 4,
  },

  kicker: {
    letterSpacing: 3,
    color: "#A98B5E",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },

  title: {
    marginTop: 12,
    fontSize: 34,
    fontWeight: "800",
    color: "#1F1F1F",
    lineHeight: 40,
    textAlign: "center",
  },

  period: {
    marginTop: 18,
    color: "#777",
    fontSize: 16,
    textAlign: "center",
  },

  issue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
  },

  badge: {
    marginTop: 24,
    alignSelf: "center",
    backgroundColor: "#EFE7D7",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  badgeText: {
    color: "#A98B5E",
    fontWeight: "700",
    letterSpacing: 1,
  },

  noteTitle: {
    marginTop: 34,
    fontSize: 18,
    fontWeight: "700",
  },

  note: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 28,
    color: "#666",
  },
});
