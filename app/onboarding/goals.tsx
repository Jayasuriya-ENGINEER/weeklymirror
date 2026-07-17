import React, { useState } from "react";
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
const CURRENT_SCREEN = 1;

// Goal options with icons and descriptions
const GOAL_OPTIONS = [
  {
    id: "organize",
    icon: "🧠",
    title: "Organize my thoughts",
    description: "I have so many ideas, I need to make sense of them",
  },
  {
    id: "remember",
    icon: "📅",
    title: "Remember my days",
    description: "I don't want to forget the little moments",
  },
  {
    id: "growth",
    icon: "📈",
    title: "Track personal growth",
    description: "I want to see how far I've come",
  },
  {
    id: "legacy",
    icon: "📖",
    title: "Leave a legacy",
    description: "I want to document my life for future generations",
  },
  {
    id: "writing",
    icon: "✍️",
    title: "Improve my writing",
    description: "I want to become a better storyteller",
  },
];

// Pain point options
const PAIN_OPTIONS = [
  {
    id: "no_time",
    icon: "⏳",
    title: "I never have time to write",
  },
  {
    id: "forget",
    icon: "🤷",
    title: "I forget to journal consistently",
  },
  {
    id: "dont_know",
    icon: "💭",
    title: "I don't know what to write about",
  },
  {
    id: "messy",
    icon: "🗑️",
    title: "My notes feel messy and disorganized",
  },
  {
    id: "no_motivation",
    icon: "🎯",
    title: "I lose motivation when I don't see results",
  },
];

export default function OnboardingGoals() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [showPains, setShowPains] = useState(false);

  const handleGoalSelect = (id: string) => {
    setSelectedGoal(id);
    setShowPains(true);
  };

  const handlePainSelect = (id: string) => {
    setSelectedPains((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const canContinue = selectedGoal !== null && selectedPains.length > 0;

  const next = () => {
    if (!canContinue) return;
    router.push("/onboarding/social-proof" as any);
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

        <Text style={styles.headline}>Why do you want to journal?</Text>
        <Text style={styles.subheadline}>
          Tell us what drives you — and what's been holding you back
        </Text>

        {/* Goal selection */}
        <Text style={styles.sectionTitle}>What's your main goal?</Text>
        <View style={styles.optionsContainer}>
          {GOAL_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedGoal === option.id && styles.selectedOptionCard,
              ]}
              onPress={() => handleGoalSelect(option.id)}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              {selectedGoal === option.id && (
                <Ionicons name="checkmark-circle" size={24} color="#A98B5E" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Pain points selection */}
        {showPains && (
          <>
            <Text style={styles.sectionTitle}>
              What's been holding you back?
            </Text>
            <View style={styles.painOptionsContainer}>
              {PAIN_OPTIONS.map((option) => {
                const isSelected = selectedPains.includes(option.id);
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.painOptionCard,
                      isSelected && styles.selectedPainOptionCard,
                    ]}
                    onPress={() => handlePainSelect(option.id)}
                  >
                    <Text style={styles.painOptionIcon}>{option.icon}</Text>
                    <Text style={styles.painOptionTitle}>{option.title}</Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#A98B5E"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        <TouchableOpacity
          style={[styles.button, !canContinue && styles.disabledButton]}
          onPress={next}
          disabled={!canContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginTop: 30,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  selectedOptionCard: {
    borderColor: "#A98B5E",
    backgroundColor: "#EFE6DA",
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 14,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  painOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  painOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flex: 1,
    minWidth: "45%",
  },
  selectedPainOptionCard: {
    borderColor: "#A98B5E",
    backgroundColor: "#EFE6DA",
  },
  painOptionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  painOptionTitle: {
    fontSize: 14,
    color: "#222",
    flex: 1,
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
  disabledButton: {
    opacity: 0.4,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
