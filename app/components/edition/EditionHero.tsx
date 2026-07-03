import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { moodCover

 } from "@/utils/moodCover";
interface Props {
  edition: any;
}

export default function EditionHero({ edition }: Props) {

  const cover = edition.cover_image || moodCover(edition.mood);


  return (
    <View style={styles.container}>
              <Image
          source={{
            uri: cover,
          }}
          style={styles.cover}
        />
    

      <View style={styles.overlay}>
        <Text style={styles.issue}>ISSUE {edition.issue_number}</Text>

        <Text style={styles.title}>{edition.title}</Text>

        <Text style={styles.date}>
          {edition.start_date} — {edition.end_date}
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summary}>{edition.summary}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 20,
  },

  cover: {
    width: "100%",
    height: 260,
    borderRadius: 26,
  },

  overlay: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
  },

  issue: {
    color: "#F6F5F2",
    letterSpacing: 3,
    fontWeight: "700",
    fontSize: 13,
  },

  title: {
    marginTop: 8,
    color: "white",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
  },

  date: {
    marginTop: 12,
    color: "#F3F3F3",
    fontSize: 15,
  },

  summaryCard: {
    marginTop: -28,
    marginHorizontal: 18,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  summary: {
    fontSize: 16,
    color: "#555",
    lineHeight: 28,
  },
});
