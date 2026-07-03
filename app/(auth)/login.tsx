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

import { signIn } from "../../services/authService";
import { useAuthStore } from "../../stores/authStore";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const setSession = useAuthStore((state) => state.setSession);

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

      if (data.user) {
        setUser(data.user);
      }

      if (data.session) {
        setSession(data.session);
      }

      router.replace("/(tabs)");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Something went wrong");
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
  },

  text: {
    color: "white",
    textAlign: "center",
  },
});
