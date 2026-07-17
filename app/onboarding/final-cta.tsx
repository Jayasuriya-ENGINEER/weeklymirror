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
import { LinearGradient } from "expo-linear-gradient";

const TOTAL_SCREENS = 8;
const CURRENT_SCREEN = 7;

export default function OnboardingFinalCTA() {
  const router = useRouter();

  const startTrial = async () => {
    await AsyncStorage.setItem("onboarding_complete", "true");
    router.replace("/(tabs)" as any);
  };

  const learnMore = () => {
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
              style={[styles.dot, i === CURRENT_SCREEN && styles.activeDot]}
            />
          ))}
        </View>

        {/* Logo with gradient background */}
       
          <View style={styles.logoBackground}>
            <Image
              source={require("../../assets/images/paymentlogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
   

        <Text style={styles.headline}>Ready to start your journey?</Text>
        <Text style={styles.subheadline}>
          Capture your first memory and receive your weekly edition
        </Text>

        {/* Pricing Card */}
        <LinearGradient
          colors={["#FFFFFF", "#FFFBF5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pricingCard}
        >
          {/* Trial Badge */}
          <View style={styles.trialBadge}>
            <Ionicons name="gift" size={20} color="#A98B5E" />
            <Text style={styles.trialText}>7-day free trial</Text>
          </View>

          {/* Monthly Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>$4.99</Text>
            <Text style={styles.pricePeriod}>/month</Text>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Yearly Price with Savings */}
          <View style={styles.yearlyContainer}>
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsText}>Save 33%</Text>
            </View>
            <Text style={styles.yearlyPriceText}>$39.99/year</Text>
            <Text style={styles.yearlyPriceSub}>Just $3.33/month</Text>
          </View>
        </LinearGradient>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          {[
            { icon: "newspaper-outline", text: "Unlimited weekly editions" },
            { icon: "sparkles", text: "AI-powered organization" },
            { icon: "images-outline", text: "Beautiful newspaper layouts" },
            { icon: "image-outline", text: "Photo support for memories" },
            
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons
                  name={feature.icon as any}
                  size={18}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
              <Ionicons
                name="checkmark"
                size={20}
                color="#A98B5E"
                style={styles.checkmark}
              />
            </View>
          ))}
        </View>

        {/* Primary CTA Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={startTrial}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#A98B5E", "#8B7355"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryButtonGradient}
          >
            <Ionicons name="rocket" size={22} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Start Free Trial</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Secondary Button */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={learnMore}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Learn more</Text>
          <Ionicons name="arrow-forward" size={18} color="#A98B5E" />
        </TouchableOpacity>

        {/* Legal Text */}
       

        {/* Security Badge */}
        <View style={styles.securityBadge}>
          <Ionicons name="lock-closed" size={14} color="#999" />
          <Text style={styles.securityText}>Secure payment</Text>
        </View>
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
  logoContainer: {
    padding: 10,
    borderRadius: 4,
    marginBottom: 4,
    shadowColor: "#A98B5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  logoBackground: {
    width: 220,
    height: 220,
  
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  logo: {
    width: "100%",
    height: "100%",
    tintColor: "#A98B5E",
  },
  headline: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 8,
  },
  subheadline: {
    fontSize: 15,
    lineHeight: 22,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  pricingCard: {
    borderRadius: 24,
    padding: 28,
    marginVertical: 28,
    width: "100%",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(169, 139, 94, 0.3)",
    shadowColor: "#A98B5E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  trialBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(169, 139, 94, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginBottom: 20,
  },
  trialText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#A98B5E",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 42,
    fontWeight: "800",
    color: "#222",
  },
  pricePeriod: {
    fontSize: 18,
    color: "#888",
    marginLeft: 4,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 12,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  orText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  yearlyContainer: {
    alignItems: "center",
    width: "100%",
  },
  savingsBadge: {
    backgroundColor: "#A98B5E",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  savingsText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  yearlyPriceText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#222",
    marginBottom: 4,
  },
  yearlyPriceSub: {
    fontSize: 14,
    color: "#888",
  },
  featuresContainer: {
    width: "100%",
    marginTop: 10,
    gap: 14,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  featureIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#A98B5E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: "#555",
    fontWeight: "500",
  },
  checkmark: {
    marginLeft: 8,
  },
  primaryButton: {
    width: "100%",
    marginTop: 30,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#A98B5E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    marginTop: 8,
    width: "100%",
  },
  secondaryButtonText: {
    color: "#A98B5E",
    fontWeight: "600",
    fontSize: 16,
  },
  legalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
  },
  legalText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 12,
  },
  securityText: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
});
