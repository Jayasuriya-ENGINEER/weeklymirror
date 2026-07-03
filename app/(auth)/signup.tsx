import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { signUp } from "../../services/authService";



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

      Alert.alert("Success", "Account created successfully");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

            <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
    <Text style={styles.buttonText}>Sign Up</Text>
  </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8F4EC",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },

  button: {
    backgroundColor: "#1F1F1F",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
