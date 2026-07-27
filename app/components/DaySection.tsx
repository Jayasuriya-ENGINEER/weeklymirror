import React from "react";
import { View, Text, StyleSheet } from "react-native";

import MemoryBlock from "./MemoryBlock";
import { AIDayArticle } from "../../type/aiEdition";
import { parseLocalDate } from "../../utils/weekUtils";

interface Props {
  date: string;
  memories: any[];
  aiDay?: AIDayArticle;
}

export default function DaySection({ date, memories, aiDay }: Props) {
  const formatted = parseLocalDate(date);
  const firstMemory = memories[0];

  const weekday = formatted
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  // AI title when available; otherwise a simple newspaper headline from the day
  const articleTitle =
    aiDay?.title ??
    (firstMemory?.content
      ? firstMemory.content.length > 48
        ? `${firstMemory.content.slice(0, 48).trim()}…`
        : firstMemory.content
      : weekday);

  const summary = aiDay?.summary;

  return (
    <View style={styles.section}>
      <Text style={styles.date}>
        {formatted.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Text>

      <Text style={styles.day}>{weekday}</Text>

      <View style={styles.line} />

      <Text style={styles.articleTitle}>{articleTitle}</Text>

      {summary ? <Text style={styles.summary}>{summary}</Text> : null}

      {memories.map((memory) => (
        <MemoryBlock
          key={memory.id}
          content={memory.content}
          images={memory.image_url ? [memory.image_url] : []}
        />
      ))}

      <View style={styles.dayDivider} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 45,
  },

  date: {
    color: "#A98B5E",
    letterSpacing: 2,
    fontWeight: "600",
  },

  day: {
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 1,
  },

  line: {
    marginTop: 12,
    marginBottom: 24,
    height: 1,
    backgroundColor: "#DDD",
  },

  articleTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    lineHeight: 30,
    marginBottom: 12,
  },

  summary: {
    fontSize: 16,
    lineHeight: 26,
    color: "#666",
    marginBottom: 28,
  },

  dayDivider: {
    marginTop: 40,
    height: 1,
    backgroundColor: "#D8D8D8",
  },
});
