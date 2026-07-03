import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  memory: any;
}

export default function MemoryCard({ memory }: Props) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = new Date(memory.memory_date).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.header}>
        <Text style={styles.date}>{formattedDate}</Text>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#666"
        />
      </View>
      <Text numberOfLines={expanded ? undefined : 1}>{memory.content}</Text>

      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.fullText}>{memory.content}</Text>

          {memory.image_url && (
            <Image source={{ uri: memory.image_url }} style={styles.image} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  date: {
    fontWeight: "700",
    marginBottom: 8,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  expandedContent: {
    marginTop: 12,
  },

  fullText: {
    color: "#333",
    lineHeight: 22,
  },
});