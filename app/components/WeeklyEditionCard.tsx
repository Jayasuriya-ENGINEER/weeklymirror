import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  AI_PUBLISH_MIN_DAYS,
  getEditionStatus,
} from "../../utils/editionStatus";

interface Props {
  id: string;
  issueNumber: number;
  startDate: string;
  endDate: string;
  capturedDays: number;
  status: string;
  onPress?: () => void;
  onPublish?: () => void;
  onRead?: () => void;
}

export default function WeeklyEditionCard({
  issueNumber,
  startDate,
  endDate,
  capturedDays,
  onPublish,
  onRead,
  status,
}: Props) {
  const displayStatus = getEditionStatus(status, endDate, capturedDays);

  return (
    <View style={styles.card}>
      <Text style={styles.week}>{`Issue ${issueNumber}`}</Text>

      <Text style={styles.date}>
        {startDate} - {endDate}
      </Text>

      <Text style={styles.capture}>{capturedDays}/7 Days Captured</Text>

      {displayStatus === "waiting" && (
        <View style={styles.infoContainer}>
          <Text style={styles.waiting}>Waiting to Start</Text>
        </View>
      )}

      {displayStatus === "draft" && (
        <View style={styles.infoContainer}>
          <Text style={styles.progress}>In Progress</Text>
          <Text style={styles.hint}>
            Preview your week as a newspaper anytime. AI publish unlocks after
            the week ends with at least {AI_PUBLISH_MIN_DAYS} days captured.
          </Text>
          <TouchableOpacity style={styles.readButton} onPress={onRead}>
            <Text style={styles.readText}>View Edition</Text>
          </TouchableOpacity>
        </View>
      )}

      {displayStatus === "simple" && (
        <View style={styles.infoContainer}>
          <Text style={styles.progress}>Week Complete</Text>
          <Text style={styles.hint}>
            Fewer than {AI_PUBLISH_MIN_DAYS} days were captured, so this week
            stays as a personal newspaper snapshot.
          </Text>
          <TouchableOpacity style={styles.readButton} onPress={onRead}>
            <Text style={styles.readText}>View Edition</Text>
          </TouchableOpacity>
        </View>
      )}

      {displayStatus === "empty" && (
        <View style={styles.infoContainer}>
          <Text style={styles.emptyTitle}>A Quiet Week</Text>

          <Text style={styles.emptySubtitle}>
            No memories were captured this week.
          </Text>
        </View>
      )}

      {displayStatus === "ready" && (
        <View style={styles.infoContainer}>
          <Text style={styles.progress}>Ready to Publish</Text>
          <Text style={styles.hint}>
            {capturedDays} days captured — AI can turn this week into a polished
            edition.
          </Text>
          <TouchableOpacity style={styles.readButton} onPress={onRead}>
            <Text style={styles.readText}>Preview Newspaper</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton} onPress={onPublish}>
            <Text style={styles.publishText}>Publish with AI</Text>
          </TouchableOpacity>
        </View>
      )}

      {displayStatus === "generating" && (
        <View style={styles.infoContainer}>
          <Text style={styles.progress}>Generating Edition…</Text>
        </View>
      )}

      {displayStatus === "completed" && (
        <TouchableOpacity style={styles.readButton} onPress={onRead}>
          <Text style={styles.readText}>Read Edition</Text>
        </TouchableOpacity>
      )}

      {displayStatus === "failed" && (
        <View style={styles.infoContainer}>
          <Text style={styles.failed}>Generation Failed</Text>
          <TouchableOpacity style={styles.readButton} onPress={onRead}>
            <Text style={styles.readText}>View Newspaper</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton} onPress={onPublish}>
            <Text style={styles.publishText}>Try AI Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  week: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  date: {
    marginTop: 6,
    fontSize: 15,
    color: "#777",
  },

  capture: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "600",
    color: "#A98B5E",
  },

  infoContainer: {
    marginTop: 18,
  },

  progress: {
    color: "#A98B5E",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  hint: {
    marginTop: 8,
    color: "#888",
    fontSize: 13,
    lineHeight: 19,
  },

  waiting: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
  },

  emptyTitle: {
    color: "#8A8A8A",
    fontSize: 17,
    fontWeight: "700",
  },

  emptySubtitle: {
    marginTop: 6,
    color: "#A3A3A3",
    fontSize: 14,
    lineHeight: 20,
  },

  publishButton: {
    marginTop: 12,
    backgroundColor: "#A98B5E",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },

  publishText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },

  readButton: {
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: "#A98B5E",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },

  readText: {
    color: "#A98B5E",
    fontSize: 15,
    fontWeight: "700",
  },

  failed: {
    color: "#D64545",
    fontWeight: "700",
    fontSize: 15,
  },
});
