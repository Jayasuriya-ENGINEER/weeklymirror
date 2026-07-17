import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../stores/authStore";
import { useProfileStore } from "../../stores/profileStore";
import { saveProfile } from "../../services/profileService";

const TOTAL_SCREENS = 8;
const CURRENT_SCREEN = 6;

export default function OnboardingName() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const updateProfileNameInStore = useProfileStore(
    (state) => state.updateName
  );
  const [name, setName] = useState("");

  const finish = async () => {
    if (!name.trim()) return;

    if (!user) {
      Alert.alert("Error", "User not found. Please try again.");
      return;
    }

    // Save name to Supabase profiles table
    try {
      const { error } = await saveProfile(user.id, name.trim(), null);

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      // Update the profile store so the name appears immediately in the app
      updateProfileNameInStore(name.trim());

      // Proceed to final CTA
      router.push("/onboarding/final-cta" as any);
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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

        <Text style={styles.headline}>What should we call you?</Text>
        <Text style={styles.subheadline}>
          Your WeeklyMirror will feel more personal with your name
        </Text>

        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#AAA"
          value={name}
          onChangeText={setName}
          style={styles.input}
          maxLength={50}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Text style={styles.counter}>{name.length}/50</Text>

        <TouchableOpacity
          style={[styles.button, name.trim().length === 0 && styles.disabled]}
          disabled={name.trim().length === 0}
          onPress={finish}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
    justifyContent: "center",
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
  },
  subheadline: {
    marginTop: 15,
    color: "#666",
    fontSize: 17,
    lineHeight: 28,
  },
  input: {
    marginTop: 45,
    backgroundColor: "#FFF",
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  counter: {
    textAlign: "right",
    marginTop: 8,
    color: "#666",
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#A98B5E",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
