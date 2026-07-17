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

const TOTAL_SCREENS = 8;
const CURRENT_SCREEN = 2;

// Testimonial data
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "I've kept a journal for years, but WeeklyMirror made it *beautiful*. I actually look forward to Sunday editions now.",
    author: "Sarah",
    persona: "Memory Keeper",
  },
  {
    id: 2,
    quote:
      "I never stuck with journaling until I saw my first WeeklyMirror edition. Now I write every day.",
    author: "Mark",
    persona: "Busy Professional",
  },
  {
    id: 3,
    quote:
      "It's like having my own personal newspaper. I share mine with my family every week.",
    author: "Priya",
    persona: "Storyteller",
  },
];

export default function OnboardingSocialProof() {
  const router = useRouter();

  const next = () => {
    router.push("/onboarding/solution" as any);
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

        <Text style={styles.headline}>Loved by journalers like you</Text>
        <Text style={styles.subheadline}>
          See what others are creating with WeeklyMirror
        </Text>

        {/* Testimonial cards */}
        <View style={styles.cardsContainer}>
          {TESTIMONIALS.map((testimonial) => (
            <View key={testimonial.id} style={styles.card}>
              <Text style={styles.quote}>{testimonial.quote}</Text>
              <View style={styles.authorContainer}>
                <Text style={styles.authorName}>{testimonial.author}</Text>
                <Text style={styles.authorPersona}>— {testimonial.persona}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>Next</Text>
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
  cardsContainer: {
    width: "100%",
    marginTop: 40,
    gap: 20,
  },
  card: {
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
  quote: {
    fontSize: 16,
    lineHeight: 26,
    color: "#444",
    fontStyle: "italic",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#A98B5E",
  },
  authorPersona: {
    fontSize: 14,
    color: "#777",
    marginLeft: 8,
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
