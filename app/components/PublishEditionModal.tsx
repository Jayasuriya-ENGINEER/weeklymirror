import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
          <Text style={styles.logo}>WEEKLY MIRROR</Text>

          <Text style={styles.title}>
            Publish Issue {edition?.issue_number ?? ""}?
          </Text>

          <View style={styles.info}>
            <Text>{memoryCount} Memories</Text>

            <Text>{edition?.captured_days ?? 0} Captured Days</Text>

            <Text>{imageCount} Photos</Text>
          </View>

          <Text style={styles.time}>Estimated time: 20–30 seconds</Text>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.publishButton} onPress={onPublish}>
              <Text style={styles.publishText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles=StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  info: {
    marginBottom: 20,
  },
  time: {
    textAlign: "center",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancel: {
    color: "red",
    fontWeight: "bold",
  },
  publishButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  publishText: {
    color: "white",
    fontWeight: "bold",
  },  
})