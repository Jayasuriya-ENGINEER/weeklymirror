import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {
  article: any;
}

export default function DayArticle({ article }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {new Date(article.article_date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </Text>

      <Text style={styles.title}>{article.title}</Text>

      {article.image_url ? (
        <Image source={{ uri: article.image_url }} style={styles.image} />
      ) : null}

      <Text style={styles.summary}>{article.summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  date: {
    fontSize: 13,
    color: "#A98B5E",
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
    lineHeight: 34,
    marginBottom: 18,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginBottom: 18,
  },

  summary: {
    fontSize: 17,
    lineHeight: 31,
    color: "#555",
  },
});
