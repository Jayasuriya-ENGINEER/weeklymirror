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

const TOTAL_SCREENS = 8;
const CURRENT_SCREEN = 3;

// Step data
const STEPS = [
  {
    id: 1,
    icon: "📝",
    title: "Capture in 30 seconds",
    description: "Jot down your thoughts, add a photo if you like",
  },
  {
    id: 2,
    icon: "✨",
    title: "AI organizes automatically",
    description: "Your entries are categorized, themed, and designed",
  },
  {
    id: 3,
    icon: "📰",
    title: "Get your weekly edition",
    description: "Every Sunday, receive a beautiful newspaper of your week",
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
              style={[
                styles.dot,
                i === CURRENT_SCREEN && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <Text style={styles.headline}>Here's how WeeklyMirror works</Text>
        <Text style={styles.subheadline}>
          The simple 3-step system for effortless journaling
        </Text>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {STEPS.map((step, index) => (
            <View key={step.id} style={styles.stepCard}>
              {/* Step number */}
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>

              {/* Icon */}
              <Text style={styles.stepIcon}>{step.icon}</Text>

              {/* Text content */}
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>See it in action</Text>
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
    padding: 30,
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    width: "100%",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DDD",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#A98B5E",
    width: 28,
  },
  headline: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    lineHeight: 42,
  },
  subheadline: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 28,
    color: "#666",
    textAlign: "center",
  },
  stepsContainer: {
    width: "100%",
    marginTop: 40,
    gap: 16,
  },
  stepCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  stepNumberContainer: {
    backgroundColor: "#A98B5E",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepNumber: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  stepIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#A98B5E",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginTop: 40,
    alignItems: "center",
    alignSelf: "center",
    minWidth: 200,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
