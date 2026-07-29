import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");


const TOTAL_SCREENS = 8;

export default function OnboardingWelcome() {
  const router = useRouter();

  const next = () => {
    router.push("/onboarding/goals" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress dots */}
        <View style={styles.dotsContainer}>
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <View key={i} style={[styles.dot, i === 0 && styles.activeDot]} />
          ))}
        </View>

        <Text style={styles.headline}>Your Life, Beautifully Organized</Text>
        <Text style={styles.subheadline}>
          Turn your daily moments into a personal newspaper you'll treasure
          forever
        </Text>

        <View style={styles.heroContainer}>
          <Image
            source={require("../../assets/images/b2.png")}
            style={styles.heroImage}
            resizeMode="contain"
          />

          <Image
            source={require("../../assets/images/b1.png")}
            style={styles.heroOverlay}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  content: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    justifyContent: "center",
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
    fontSize: 18,
    lineHeight: 18,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  deviceContainer: {
    marginVertical: 50,
    alignItems: "center",
  },
  deviceFrame: {
    width: width * 0.8,
    maxWidth: 350,
    height: 240,
    backgroundColor: "#000",
    borderRadius: 30,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  deviceScreen: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 16,
    justifyContent: "center",
  },
  mockupHeader: {
    alignItems: "center",
    marginBottom: 12,
  },
  mockupTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#A98B5E",
    letterSpacing: 2,
  },
  mockupSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  mockupContent: {
    alignItems: "center",
  },
  mockupImage: {
    width: 120,
    height: 80,
    backgroundColor: "#EFE6DA",
    borderRadius: 12,
    marginBottom: 12,
  },
  mockupArticleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  mockupArticleText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#A98B5E",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginTop: 40,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },

  heroContainer: {
    width: "100%",
    height: 360,
    marginTop: 3,
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  heroImage: {

    width: width * 0.58,
    height: 320,

    position: "absolute",

    left: width * 0.08,
    bottom: 0,

    transform: [{ rotate: "-25deg" }],
  },

  heroOverlay: {
    width: width * 0.58,
    height: 320,

    position: "absolute",

    right: width * 0.08,
    top: 10,
    borderRadius: 45,

    transform: [{ rotate: "18deg" }],
  },
});
