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

import {
  signIn,
  signInWithGoogle,
  resetPassword,
} from "../../services/authService";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Missing Fields", "Please enter email and password");
        return;
      }

      const { data, error } = await signIn(email, password);

      if (error) {
        Alert.alert("Login Failed", error.message);
        return;
      }

      // Redirect to index which will handle onboarding check
      // The useAuth hook in _layout will handle loading state
      router.replace("/");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      if (result?.type === "success") {
        router.replace("/");
      }
    } catch (error: any) {
      Alert.alert(
        "Google Sign In",
        error?.message || "Unable to sign in with Google.",
      );
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Email Required", "Please enter your email address first.");
      return;
    }

    const { error } = await resetPassword(email);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert(
      "Password Reset",
      "If an account exists for this email, we've sent password reset instructions.",
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/applogo.png")}
        style={styles.appLogo}
      />

      <Text style={styles.logo}>WeeklyMirror</Text>

      <Text style={styles.subtitle}>Capture today.{"\n"}Read it forever.</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.eyeButton}
          accessibilityRole="button"
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.or}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image
          source={require("../../assets/images/google-logo.png")}
          style={styles.googleLogo}
        />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.footer}>
          Don't have an account?{" "}
          <Text style={{ color: "#A98B5E" }}>Create Account</Text>
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

  appLogo: {
    width: 88,
    height: 88,
    resizeMode: "contain",
    alignSelf: "center",
   
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
    marginBottom: 10,
    fontSize: 16,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 10,
  },

  passwordInput: {
    flex: 1,
    padding: 18,
    paddingRight: 8,
    fontSize: 16,
  },

  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  signInButton: {
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 8,
  },

  signInText: {
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
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E7E2D9",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
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
  googleLogo: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  forgot: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#A98B5E",
    fontWeight: "600",
  },
});
