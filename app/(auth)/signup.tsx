import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import { router } from "expo-router";

import { signUp, signInWithGoogle } from "../../services/authService";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Missing Fields", "Please enter email and password");
        return;
      }

      const { data, error } = await signUp(email, password);

      if (error) {
        Alert.alert("Signup Failed", error.message);
        return;
      }

      // Check if user was created and session exists
      if (data.user && data.session) {
        Alert.alert(
          "Success",
          "Account created successfully. Please check your email if verification is enabled.",
        );
        // Redirect to index which will check auth and onboarding
        router.replace("/");
      } else {
        Alert.alert(
          "Success",
          "Account created successfully. Please check your email if verification is enabled.",
        );
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Something went wrong.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      Alert.alert(
        "Google",
        error?.message || "Unable to continue with Google.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>WeeklyMirror</Text>

      <Text style={styles.subtitle}>
        Start capturing your{"\n"}memories today.
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
        <Text style={styles.signUpText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.or}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignup}
      >
        <Image
          source={require("../../assets/images/google-logo.png")}
          style={styles.googleLogo}
        />

        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.footer}>
          Already have an account? <Text style={styles.link}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#F6F5F2",
  },

  logo: {
    fontSize: 38,
    fontWeight: "700",
    color: "#A98B5E",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,
    marginBottom: 45,
    textAlign: "center",
    color: "#666",
    fontSize: 17,
    lineHeight: 28,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    fontSize: 16,
  },

  signUpButton: {
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 8,
  },

  signUpText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 17,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },

  or: {
    marginHorizontal: 14,
    color: "#888",
    fontWeight: "600",
  },

  googleButton: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E7E2D9",
    elevation: 2,
  },

  googleLogo: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  googleText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },

  footer: {
    marginTop: 40,
    textAlign: "center",
    color: "#666",
    fontSize: 15,
  },

  link: {
    color: "#A98B5E",
    fontWeight: "700",
  },
});
