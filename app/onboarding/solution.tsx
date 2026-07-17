import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TOTAL_SCREENS = 8;
const CURRENT_SCREEN = 3;

// Step data with Ionicons
const STEPS = [
  {
    id: 1,
    icon: "create-outline",
    title: "Capture in 30 seconds",
    description: "Jot down thoughts, add a photo",
  },
  {
    id: 2,
    icon: "sparkles",
    title: "AI organizes automatically",
    description: "Categorized, themed & designed",
  },
  {
    id: 3,
    icon: "newspaper-outline",
    title: "Get your weekly edition",
    description: "Beautiful newspaper every Sunday",
  },
];

export default function OnboardingSolution() {
  const router = useRouter();

  const next = () => {
    router.push("/onboarding/demo" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress dots */}
        <View style={styles.dotsContainer}>
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === CURRENT_SCREEN && styles.activeDot]}
            />
          ))}
        </View>

        <Text style={styles.headline}>Here's how WeeklyMirror works</Text>
        <Text style={styles.subheadline}>
          Simple 3-step system for effortless journaling
        </Text>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {STEPS.map((step, index) => (
            <View key={step.id} style={styles.stepCard}>
              {/* Step number with gradient */}
              <LinearGradient
                colors={["#A98B5E", "#8B7355"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stepNumberContainer}
              >
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </LinearGradient>

              {/* Icon container */}
              <View style={styles.iconContainer}>
                <Ionicons name={step.icon as any} size={24} color="#A98B5E" />
              </View>

              {/* Text content */}
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>

              {/* Arrow indicator */}
              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={next}>
          <LinearGradient
            colors={["#A98B5E", "#8B7355"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>See it in action</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    width: "100%",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DDD",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#A98B5E",
    width: 24,
  },
  headline: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    lineHeight: 36,
  },
  subheadline: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#888",
    textAlign: "center",
  },
  stepsContainer: {
    width: "100%",
    marginTop: 30,
    gap: 14,
  },
  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    shadowColor: "#A98B5E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumber: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(169, 139, 94, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginBottom: 3,
  },
  stepDescription: {
    fontSize: 13,
    color: "#888",
    lineHeight: 18,
  },
  button: {
    borderRadius: 18,
    marginTop: 30,
    overflow: "hidden",
    shadowColor: "#A98B5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
