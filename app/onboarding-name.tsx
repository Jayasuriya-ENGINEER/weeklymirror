import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingName() {
  const router = useRouter();

  const [name, setName] = useState("");

 const finish = async () => {
   const profile = {
     name: name,
   };

   await AsyncStorage.setItem("profile", JSON.stringify(profile));

   await AsyncStorage.setItem("onboarding_complete", "true");

   router.replace("/onboarding-reminder");
 };
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What should we call you?</Text>

      <Text style={styles.subtitle}>
        Your WeeklyMirror will feel more personal.
      </Text>

      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#AAA"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, name.trim().length === 0 && styles.disabled]}
        disabled={name.trim().length === 0}
        onPress={finish}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
    padding: 30,
    justifyContent: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
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
  },

  button: {
    marginTop: 40,
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
