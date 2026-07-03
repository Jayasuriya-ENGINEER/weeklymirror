import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getEditionStatus } from "../../utils/editionStatus";



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
  onPress,
  onPublish,
  onRead,
  status,
}: Props) {

  const displayStatus = getEditionStatus(status, endDate,capturedDays);

  return (
    <View style={styles.card}>
      <Text style={styles.week}> {`Issue ${issueNumber}`}</Text>

      <Text style={styles.date}>
        {startDate} - {endDate}
      </Text>

      <Text style={styles.capture}>{capturedDays}/7 Days Captured</Text>

      {displayStatus === "draft" && (
        <Text style={styles.status}>IN PROGRESS</Text>
      )}

      {displayStatus === "ready" && (
        <TouchableOpacity style={styles.publishButton} onPress={onPublish}>
          <Text style={styles.publishText}>Publish Edition</Text>
        </TouchableOpacity>
      )}

      {displayStatus === "generating" && (
        <Text style={styles.status}>GENERATING...</Text>
      )}

      {displayStatus === "completed" && (
        <TouchableOpacity style={styles.readButton} onPress={onRead}>
          <Text style={styles.readText}>Read Edition</Text>
        </TouchableOpacity>
      )}

      {displayStatus === "failed" && (
        <Text style={styles.failed}>Generation Failed</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  week: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F1F1F",
  },

  date: {
    marginTop: 6,
    color: "#777",
  },

  capture: {
    marginTop: 12,
    fontWeight: "600",
    color: "#A98B5E",
  },
  status: {
    marginTop: 14,

    color: "#A98B5E",

    fontWeight: "700",

    letterSpacing: 1,
  },
  publishButton: {
  marginTop: 16,
  backgroundColor: "#A98B5E",
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: "center",
},

publishText: {
  color: "#FFF",
  fontWeight: "700",
  fontSize: 15,
},

readButton: {
  marginTop: 16,
  borderWidth: 1,
  borderColor: "#A98B5E",
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: "center",
},

readText: {
  color: "#A98B5E",
  fontWeight: "700",
},

failed: {
  marginTop: 16,
  color: "#D64545",
  fontWeight: "700",
},
});
