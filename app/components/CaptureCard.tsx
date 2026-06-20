import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useMemoryStore } from "../../stores/memoryStore";
export default function CaptureCard() {
  const [note, setNote] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { addMemory } = useMemoryStore();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your gallery.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!note.trim() && !image) {
      Alert.alert("Empty Memory", "Please add a photo or write something.");
      return;
    }

    console.log("Memory Saved");
    addMemory({
      id: Date.now().toString(),
      note,
      image,
    });

    Alert.alert("Success", "Memory saved successfully!");

    setNote("");
    setImage(null);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today Memory</Text>

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>📷 Add Photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TextInput
        placeholder="What happened today?"
        placeholderTextColor="#888"
        multiline
        maxLength={500}
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />

      <Text style={styles.counter}>{note.length}/500</Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Memory</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#1F1F1F",
  },

  photoButton: {
    backgroundColor: "#EFE6DA",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },

  photoButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 15,
  },

  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 15,
    textAlignVertical: "top",
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },

  counter: {
    textAlign: "right",
    marginTop: 8,
    color: "#666",
    marginBottom: 15,
  },

  saveButton: {
    backgroundColor: "#1F1F1F",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
