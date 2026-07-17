import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const TOTAL_SCREENS = 8;
const CURRENT_SCREEN = 2;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Testimonial data with avatar images
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "WeeklyMirror made journaling beautiful. I actually look forward to Sunday editions now.",
    author: "Sarah",
    persona: "Memory Keeper",
    avatar: require("../../assets/images/t1.png"), // Adjust path as needed
  },
  {
    id: 2,
    quote:
      "I never stuck with journaling until I saw my first WeeklyMirror edition.",
    author: "Mark",
    persona: "Busy Professional",
    avatar: require("../../assets/images/t2.png"),
  },
  {
    id: 3,
    quote:
      "It's like having my own personal newspaper. I share mine with family.",
    author: "Priya",
    persona: "Storyteller",
    avatar: require("../../assets/images/t3.png"),
  },
];

export default function OnboardingSocialProof() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const next = () => {
    router.push("/onboarding/solution" as any);
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (SCREEN_WIDTH - 60)); // 60 = padding * 2
    setActiveIndex(index);
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

        <Text style={styles.headline}>Loved by journalers like you</Text>
        <Text style={styles.subheadline}>See what others are creating</Text>

        {/* Horizontal Testimonial Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.carouselContent}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <View key={testimonial.id} style={styles.card}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                  <Image
                    source={testimonial.avatar}
                    style={styles.avatar}
                    resizeMode="cover"
                  />
                  <View style={styles.avatarBorder} />
                </View>

                {/* Quote */}
                <Text style={styles.quote}>"{testimonial.quote}"</Text>

                {/* Author */}
                <View style={styles.authorContainer}>
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{testimonial.author}</Text>
                    <Text style={styles.authorPersona}>
                      {testimonial.persona}
                    </Text>
                  </View>
                </View>

                {/* Quote decoration */}
                <View style={styles.quoteDecoration}>
                  <Text style={styles.quoteMark}>"</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Carousel Indicators */}
          <View style={styles.carouselIndicators}>
            {TESTIMONIALS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === activeIndex && styles.indicatorActive,
                ]}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={next}>
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
  carouselContainer: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  carouselContent: {
    paddingHorizontal: 0,
  },
  card: {
    width: SCREEN_WIDTH - 60, // Full width minus padding
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    shadowColor: "#A98B5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginRight: 15,
    position: "relative",
  },
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EFE6DA",
  },
  avatarBorder: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#A98B5E",
    opacity: 0.3,
  },
  quote: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
  },
  authorContainer: {
    alignItems: "center",
  },
  authorInfo: {
    alignItems: "center",
  },
  authorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#A98B5E",
    marginBottom: 2,
  },
  authorPersona: {
    fontSize: 13,
    color: "#999",
  },
  quoteDecoration: {
    position: "absolute",
    bottom: 10,
    right: 15,
  },
  quoteMark: {
    fontSize: 60,
    color: "#A98B5E",
    opacity: 0.1,
    lineHeight: 40,
  },
  carouselIndicators: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#DDD",
  },
  indicatorActive: {
    backgroundColor: "#A98B5E",
    width: 20,
  },
  button: {
    backgroundColor: "#A98B5E",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 18,
    marginTop: 30,
    alignItems: "center",
    alignSelf: "center",
    minWidth: 200,
    shadowColor: "#A98B5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
