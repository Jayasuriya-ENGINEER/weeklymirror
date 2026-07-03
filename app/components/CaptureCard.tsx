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


import { createMemory , uploadImage} from "../../services/memoryService";
import { useAuthStore } from "../../stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { syncEdition } from "@/engines/editionEngine";

export default function CaptureCard() {
  const triggerRefresh = useMemoryStore((state) => state.triggerRefresh);
  const [note, setNote] = useState("");
  const [image, setImage] = useState<string | null>(null);
  //const { addMemory } = useMemoryStore();
  const user = useAuthStore((state) => state.user);

  const today = new Date();

  const memoryDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

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
      console.log("IMAGE URI:", result.assets[0].uri);
    }
  };

 const handleSave = async () => {
   try {
     if (!note.trim()) {
       Alert.alert("Missing Note", "Please write something.");
       return;
     }

     if (!user) {
       Alert.alert("Error", "User not found.");
       return;
     }

     let imageUrl: string | undefined;

     if (image) {
       const { error, publicUrl } = await uploadImage(image);

       if (error) {
         Alert.alert("Upload Error", String(error));
         return;
       }

       imageUrl = publicUrl ?? undefined;
     }

     const { error } = await createMemory(user.id, note, imageUrl , memoryDate);

     if (error) {
       Alert.alert("Database Error", error.message);
       return;
     }

     Alert.alert("Saved", "Memory stored successfully");

     setNote("");
     setImage(null);

     //this await is currently for a check will remove it later
    await syncEdition(user.id, memoryDate);


     triggerRefresh();
     //this trigger here is for the autotrigger option
   } catch (err) {
     console.log(err);

     Alert.alert("Error", "Something went wrong");
   }
 };



  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today Memory</Text>

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>
          <Ionicons name="image-outline" size={20} color="#1F1F1F" />
               Add Photo
        </Text>
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
