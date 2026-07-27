import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  edition: any | null;
  memoryCount: number;
  imageCount: number;
  onCancel: () => void;
  onPublish: () => void;
}

export default function PublishEditionModal({
  visible,
  edition,
  memoryCount,
  imageCount,
  onCancel,
  onPublish,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="book-outline" size={34} color="#A98B5E" />
          </View>

          <Text style={styles.logo}>WeeklyMirror</Text>

          <Text style={styles.title}>
            Publish Issue {edition?.issue_number}
          </Text>

          <Text style={styles.subtitle}>
            You captured enough days this week. AI will turn your memories into
            a polished newspaper edition — titles, summary, quote, and daily
            articles.
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{memoryCount}</Text>
              <Text style={styles.statLabel}>Memories</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {edition?.captured_days ?? 0}
              </Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{imageCount}</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
          </View>

          <View style={styles.timeBox}>
            <Ionicons name="time-outline" size={18} color="#A98B5E" />

            <Text style={styles.time}>
              Estimated generation time: 20–30 seconds
            </Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.publishButton} onPress={onPublish}>
              <Text style={styles.publishText}>Publish Edition</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    backgroundColor: "#F6F5F2",
    borderRadius: 24,
    padding: 26,
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EFE7DA",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  logo: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 15,
    color: "#A98B5E",
    letterSpacing: 3,
    fontWeight: "700",
  },

  title: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    marginTop: 12,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
    fontSize: 15,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 18,
    paddingVertical: 18,
    marginHorizontal: 4,
    alignItems: "center",
  },

  statValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#A98B5E",
  },

  statLabel: {
    marginTop: 6,
    color: "#777",
    fontSize: 13,
  },

  timeBox: {
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFE7DA",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  time: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },

  buttons: {
    flexDirection: "row",
    marginTop: 30,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  cancelText: {
    color: "#666",
    fontWeight: "700",
    fontSize: 16,
  },

  publishButton: {
    flex: 1.4,
    backgroundColor: "#A98B5E",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    marginLeft: 10,
  },

  publishText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
