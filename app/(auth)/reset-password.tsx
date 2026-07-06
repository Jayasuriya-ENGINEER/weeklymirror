import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { router } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    if (password.length < 6) {
      Alert.alert(
        "Password too short",
        "Password must contain at least 6 characters.",
      );
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert("Success", "Your password has been updated.", [
      {
        text: "OK",
        onPress: () => router.replace("/login"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Password</Text>

      <Text style={styles.subtitle}>Enter your new password below.</Text>

      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
    justifyContent: "center",
    padding: 28,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,
    marginBottom: 40,
    color: "#666",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 25,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
