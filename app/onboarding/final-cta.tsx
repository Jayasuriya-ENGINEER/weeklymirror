import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const TOTAL_SCREENS = 8;
const CURRENT_SCREEN = 7;

export default function OnboardingFinalCTA() {
  const router = useRouter();

  const startTrial = async () => {
    // Mark onboarding as complete
    await AsyncStorage.setItem("onboarding_complete", "true");

    // Navigate to main app
    router.replace("/(tabs)" as any);
  };

  const learnMore = () => {
    // For now, just proceed to app
    router.replace("/(tabs)" as any);
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

        {/* Logo */}
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.headline}>Ready to start your journey?</Text>
        <Text style={styles.subheadline}>
          Capture your first memory and receive your weekly edition
        </Text>

        {/* Pricing Card */}
        <View style={styles.pricingCard}>
          <Text style={styles.trialText}>🎉 7-day free trial</Text>
          <Text style={styles.priceText}>$4.99/month</Text>
          <Text style={styles.orText}>or</Text>
          <Text style={styles.yearlyPriceText}>$39.99/year</Text>
          <Text style={styles.saveText}>(Save 33% with annual plan)</Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          {[
            "Unlimited weekly editions",
            "AI-powered organization",
            "Beautiful newspaper layouts",
            "Photo support for memories",
            "Share with friends & family",
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={22} color="#A98B5E" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={startTrial}>
          <Text style={styles.primaryButtonText}>Start Free Trial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={learnMore}>
          <Text style={styles.secondaryButtonText}>Learn more</Text>
        </TouchableOpacity>

        <Text style={styles.legalText}>Cancel anytime. Terms apply.</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
  pricingCard: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 20,
    marginVertical: 30,
    borderWidth: 2,
    borderColor: "#A98B5E",
    width: "100%",
    alignItems: "center",
  },
  trialText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#A98B5E",
  },
  priceText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
    marginTop: 8,
  },
  orText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 4,
  },
  yearlyPriceText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#222",
  },
  saveText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  featuresContainer: {
    width: "100%",
    marginTop: 30,
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  featureText: {
    fontSize: 15,
    color: "#555",
    marginLeft: 12,
  },
  primaryButton: {
    backgroundColor: "#A98B5E",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginTop: 30,
    alignItems: "center",
    width: "100%",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  secondaryButton: {
    paddingVertical: 18,
    marginTop: 12,
    alignItems: "center",
    width: "100%",
  },
  secondaryButtonText: {
    color: "#A98B5E",
    fontWeight: "600",
    fontSize: 16,
  },
  legalText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
