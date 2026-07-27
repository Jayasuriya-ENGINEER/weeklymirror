import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useMemoryStore } from "../../stores/memoryStore";
import {
  createMemory,
  uploadImage,
  getTodayImageMemory,
} from "../../services/memoryService";
import { useAuthStore } from "../../stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { syncEdition } from "@/engines/editionEngine";

export default function CaptureCard() {
  const triggerRefresh = useMemoryStore((state) => state.triggerRefresh);
  const [note, setNote] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const user = useAuthStore((state) => state.user);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const today = new Date();
  const memoryDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    const openCamera = async () => {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission Required", "Please allow camera access.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your gallery.",
      );
      return;
    }

    if (!user) return;

    const { data: existingImage } = await getTodayImageMemory(
      user.id,
      memoryDate,
    );

    if (existingImage) {
      Alert.alert(
        "Today's photo already exists",
        "WeeklyMirror uses one photo to represent each day.\n\nDo you want to replace today's photo?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Replace Photo",
            onPress: () => {
              Alert.alert("Replace Photo", "Choose a source", [
                {
                  text: "Camera",
                  onPress: openCamera,
                },
                {
                  text: "Gallery",
                  onPress: openGallery,
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]);
            },
          },
        ],
      );
      return;
    }

    Alert.alert("Add Photo", "Choose a source", [
      {
        text: "Camera",
        onPress: openCamera,
      },
      {
        text: "Gallery",
        onPress: openGallery,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
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

      setIsUploading(true);
      let imageUrl: string | undefined;

      if (image) {
        const { error, publicUrl } = await uploadImage(image);

        if (error) {
          Alert.alert("Upload Error", String(error));
          setIsUploading(false);
          return;
        }

        imageUrl = publicUrl ?? undefined;
      }

      const { error } = await createMemory(user.id, note, imageUrl, memoryDate);

      if (error) {
        Alert.alert("Database Error", error.message);
        setIsUploading(false);
        return;
      }

      Alert.alert("Saved", "Memory stored successfully");

      setNote("");
      setImage(null);

      await syncEdition(user.id, memoryDate);

      triggerRefresh();
      setIsUploading(false);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="small" color="#8B7355" />;
  }

  const characterLimit = 200;
  const progressPercentage = note.length / characterLimit;


  //defining camera helper function to open camera and capture image
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  
  return (
    <View style={styles.card}>
      {/* Header with Icon */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#8B7355", "#A08B6E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerIcon}
        >
          <Ionicons name="camera" size={20} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.title}>Today Memory</Text>
      </View>

      {/* Photo Upload Section */}
      {!image ? (
        <TouchableOpacity
          style={styles.photoButton}
          onPress={pickImage}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={["#EFE6DA", "#E8DFD0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.photoButtonGradient}
          >
            <Ionicons name="image-outline" size={24} color="#8B7355" />
            <Text style={styles.photoButtonText}>Add Photo</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.preview} />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={removeImage}
          >
            <Ionicons name="close-circle" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.imageOverlay}>
            <Text style={styles.imageOverlayText}>Photo Added</Text>
          </View>
        </View>
      )}

      {/* Text Input Section */}
      <View style={styles.inputContainer}>
        <View style={styles.inputHeader}>
          <Ionicons name="document-text-outline" size={18} color="#8B7355" />
          <Text style={styles.inputLabel}>Your Story</Text>
        </View>

        <TextInput
          placeholder="What happened today?"
          placeholderTextColor="#B8B8B8"
          multiline
          maxLength={characterLimit}
          value={note}
          onChangeText={setNote}
          style={styles.input}
          editable={!isUploading}
        />

        {/* Character Counter with Progress */}
        <View style={styles.counterContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(progressPercentage * 100, 100)}%`,
                  backgroundColor:
                    progressPercentage > 0.9 ? "#FF6B6B" : "#8B7355",
                },
              ]}
            />
          </View>
          <Text
            style={[
              styles.counter,
              { color: progressPercentage > 0.9 ? "#FF6B6B" : "#8B7355" },
            ]}
          >
            {note.length}/{characterLimit}
          </Text>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, isUploading && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isUploading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isUploading ? ["#999", "#999"] : ["#1F1F1F", "#2C2C2C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.saveButtonGradient}
        >
          {isUploading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="save-outline" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save Memory</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginVertical: 20,
    shadowColor: "#8B7355",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(139, 115, 85, 0.1)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  headerIcon: {
    padding: 10,
    borderRadius: 12,
    shadowColor: "#8B7355",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  title: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 22,
    color: "#1F1F1F",
    letterSpacing: 0.5,
  },

  photoButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },

  photoButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },

  photoButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#8B7355",
  },

  imageContainer: {
    position: "relative",
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },

  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 14,
    padding: 2,
  },

  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(139, 115, 85, 0.9)",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  imageOverlayText: {
    fontFamily: "Poppins_500Medium",
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
  },

  inputContainer: {
    marginBottom: 20,
  },

  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  inputLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#8B7355",
  },

  input: {
    minHeight: 130,
    borderWidth: 1.5,
    borderColor: "#EFE6DA",
    borderRadius: 16,
    padding: 16,
    textAlignVertical: "top",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    backgroundColor: "#FAFAFA",
    color: "#2C2C2C",
    lineHeight: 22,
  },

  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
  },

  progressBackground: {
    flex: 1,
    height: 4,
    backgroundColor: "#EFE6DA",
    borderRadius: 2,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    borderRadius: 2,
  },

  counter: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    minWidth: 50,
    textAlign: "right",
  },

  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#1F1F1F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
    paddingHorizontal: 24,
  },

  saveButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
