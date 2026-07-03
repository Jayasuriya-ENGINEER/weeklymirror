import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import {
  getEdition,
  getEditionArticles,
} from "../../services/readEditionService";

import EditionHero from "../components/edition/EditionHero";
import QuoteCard from "../components/edition/QuoteCard";
import DayArticle from "../components/edition/DayArticle";
import ReflectionCard from "../components/edition/ReflectionCard";
import EditionFooter from "../components/edition/EditionFooter";
import { moodCover } from "../../utils/moodCover";

export default function EditionScreen() {
  const { id } = useLocalSearchParams();

  const [edition, setEdition] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEdition();
  }, []);

  const loadEdition = async () => {
    const editionResult = await getEdition(id as string);

    const articleResult = await getEditionArticles(id as string);

    setEdition(editionResult.data);

    setArticles(articleResult.data || []);

    setLoading(false);
  };


const cover = edition?.cover_image || moodCover(edition?.mood);

  if (loading) {

    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#A98B5E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {edition && <EditionHero edition={edition} />}
      {edition && <QuoteCard quote={edition.quote} />}
   
      <Text style={styles.section}>Daily Articles</Text>

      {articles.map((article) => (
        <DayArticle key={article.id} article={article} />
      ))}

      {edition && <ReflectionCard reflection={edition.reflection} />}
      <EditionFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#F6F5F2",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },

  content: {
    padding: 24,
    paddingBottom: 60,
  },

  issue: {
    marginTop: 50,
    color: "#A98B5E",
    letterSpacing: 3,
    fontWeight: "700",
    textAlign: "center",
  },

  title: {
    marginTop: 20,
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    color: "#222",
  },

  summary: {
    marginTop: 25,
    fontSize: 17,
    lineHeight: 30,
    color: "#555",
    textAlign: "center",
  },

  quoteBox: {
    marginTop: 35,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#EFE7DA",
  },

  quote: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#7A6240",
    fontSize: 18,
    lineHeight: 30,
  },

  section: {
    marginTop: 40,
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  reflection: {
    fontSize: 17,
    lineHeight: 30,
    color: "#555",
  },

  card: {
    marginTop: 20,
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
  },

  dayTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  daySummary: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 28,
    color: "#555",
  },
  logo: {
    marginTop: 30,
    textAlign: "center",
    letterSpacing: 5,
    color: "#A98B5E",
    fontWeight: "700",
  },

  date: {
    textAlign: "center",
    marginTop: 8,
    color: "#777",
  },

  cover: {
    width: "100%",
    height: 260,
    borderRadius: 20,
    marginTop: 25,
    marginBottom: 25,
  },
});
