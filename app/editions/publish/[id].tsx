import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { generateEdition } from "../../../services/aiEdgeService";
import { getEdition } from "../../../services/readEditionService";
import {
  AI_PUBLISH_MIN_DAYS,
  getEditionStatus,
} from "../../../utils/editionStatus";

export default function PublishScreen() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const [step, setStep] = useState("Preparing memories...");
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    runPublish();
  }, []);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const runPublish = async () => {
    try {
      setFailed(false);
      setStep("Checking your week...");
      setProgress(5);

      const { data: edition, error: editionError } = await getEdition(
        id as string,
      );

      if (editionError || !edition) {
        throw new Error("Edition not found");
      }

      const displayStatus = getEditionStatus(
        edition.status,
        edition.end_date,
        edition.captured_days,
      );

      // Guard: AI only after the week ends with enough captured days
      if (
        displayStatus !== "ready" &&
        displayStatus !== "failed" &&
        edition.status !== "completed"
      ) {
        setFailed(true);
        if (edition.captured_days < AI_PUBLISH_MIN_DAYS) {
          setStep(
            `AI publish needs at least ${AI_PUBLISH_MIN_DAYS} captured days. Opening your newspaper instead.`,
          );
        } else {
          setStep(
            "This week is still in progress. Opening your live newspaper instead.",
          );
        }
        await wait(1600);
        router.replace({
          pathname: "/editions/[id]",
          params: { id: id as string },
        });
        return;
      }

      if (edition.status === "completed") {
        router.replace({
          pathname: "/editions/[id]",
          params: { id: id as string },
        });
        return;
      }

      setStep("Collecting your memories...");
      setProgress(10);

      await wait(800);

      setStep("Finding important moments...");
      setProgress(25);

      await wait(900);

      setStep("Writing your weekly story...");
      setProgress(50);

      const result = await generateEdition(id as string);

      setStep("Designing your newspaper...");
      setProgress(80);

      await wait(700);

      setStep("Almost ready...");
      setProgress(95);

      await wait(700);

      setStep("Your edition is ready!");
      setProgress(100);

      await wait(1000);

      console.log("EDGE FUNCTION:", result);

      setProgress(100);
      setStep("Finished");

      await wait(1000);

      router.replace({
        pathname: "/editions/[id]",
        params: {
          id: id as string,
        },
      });
    } catch (e) {
      console.error("EDGE FUNCTION ERROR:", e);
      setFailed(true);
      setStep("Generation failed. You can still view the newspaper edition.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 60,
          left: 20,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color="#222" />
      </TouchableOpacity>
      <Text style={styles.logo}>WEEKLY MIRROR</Text>

      <Text style={styles.title}>Preparing your edition</Text>

      <ActivityIndicator size="large" color="#A98B5E" />

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.step}>{step}</Text>

      {failed ? (
        <TouchableOpacity
          style={styles.fallbackButton}
          onPress={() =>
            router.replace({
              pathname: "/editions/[id]",
              params: { id: id as string },
            })
          }
        >
          <Text style={styles.fallbackText}>View Newspaper Edition</Text>
        </TouchableOpacity>
      ) : null}

      <Text style={styles.quote}>Every week deserves to be remembered.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  logo: {
    color: "#A98B5E",
    letterSpacing: 4,
    fontWeight: "700",
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#222",
    marginBottom: 40,
    textAlign: "center",
  },

  progressBackground: {
    width: "90%",
    height: 10,
    borderRadius: 10,
    backgroundColor: "#E6E1D8",
    marginTop: 40,
    overflow: "hidden",
  },

  progressFill: {
    height: 10,
    backgroundColor: "#A98B5E",
  },

  step: {
    marginTop: 25,
    fontSize: 17,
    color: "#555",
  },

  quote: {
    marginTop: 50,
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
    fontSize: 17,
    lineHeight: 30,
  },

  fallbackButton: {
    marginTop: 28,
    backgroundColor: "#A98B5E",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 14,
  },

  fallbackText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
});
