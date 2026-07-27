import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  getEdition,
  getEditionArticles,
} from "../../services/readEditionService";
import { getMemoriesBetweenDates } from "../../services/memoryService";
import { groupMemoriesByDate } from "../../utils/memoryUtils";
import { getEditionStatus, isAiEdition } from "../../utils/editionStatus";

import EditionHero from "../components/edition/EditionHero";
import QuoteCard from "../components/edition/QuoteCard";
import DayArticle from "../components/edition/DayArticle";
import ReflectionCard from "../components/edition/ReflectionCard";
import EditionFooter from "../components/edition/EditionFooter";
import EditionReader from "../components/EditionReader";

export default function EditionScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [edition, setEdition] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [groupedMemories, setGroupedMemories] = useState<
    Record<string, any[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"ai" | "newspaper">("newspaper");

  useEffect(() => {
    loadEdition();
  }, [id]);

  const loadEdition = async () => {
    try {
      setLoading(true);

      const editionResult = await getEdition(id as string);
      const data = editionResult.data;

      if (!data) {
        setLoading(false);
        return;
      }

      setEdition(data);

      // AI path: week was published via generate-edition
      if (isAiEdition(data.status)) {
        const articleResult = await getEditionArticles(id as string);
        setArticles(articleResult.data || []);
        setMode("ai");
        setLoading(false);
        return;
      }

      // Newspaper path: in-progress week, or finished week with < 3 days
      // Uses the pre-AI components (EditionHeader, DaySection, MemoryBlock)
      const { data: memories } = await getMemoriesBetweenDates(
        data.user_id,
        data.start_date,
        data.end_date,
      );

      setGroupedMemories(groupMemoriesByDate(memories || []));
      setMode("newspaper");
    } catch (err) {
      console.log("Load edition error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#A98B5E" />
      </View>
    );
  }

  if (!edition) {
    return (
      <View style={styles.loading}>
        <Text style={styles.missing}>Edition not found.</Text>
      </View>
    );
  }

  const displayStatus = getEditionStatus(
    edition.status,
    edition.end_date,
    edition.captured_days,
  );
  const isPreview = displayStatus === "draft";

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#222" />
      </TouchableOpacity>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {mode === "ai" ? (
          <>
            <EditionHero edition={edition} />
            <QuoteCard quote={edition.quote} />

            <Text style={styles.section}>Daily Articles</Text>

            {articles.map((article) => (
              <DayArticle key={article.id} article={article} />
            ))}

            <ReflectionCard reflection={edition.reflection} />
            <EditionFooter />
          </>
        ) : (
          <EditionReader
            edition={edition}
            groupedMemories={groupedMemories}
            aiEdition={null}
            isPreview={isPreview}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },

  loading: {
    flex: 1,
    backgroundColor: "#F6F5F2",
    justifyContent: "center",
    alignItems: "center",
  },

  missing: {
    color: "#777",
    fontSize: 16,
  },

  backButton: {
    position: "absolute",
    top: 54,
    left: 18,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },

  content: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },

  section: {
    marginTop: 40,
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },
});
