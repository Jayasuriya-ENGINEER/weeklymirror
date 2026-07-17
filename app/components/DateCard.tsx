import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {
  useFonts,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular,
} from "@expo-google-fonts/playfair-display";
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";

export default function DateCard() {
  const now = new Date();

  const date = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const day = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="small" color="#8B7355" />;
  }

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={24} color="#8B7355" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.dayContainer}>
            <View style={styles.dayLine} />
            <Text style={styles.day}>{day}</Text>
            <View style={styles.dayLine} />
          </View>
        </View>
      </View>

      <View style={styles.decorativeCorner} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    backgroundColor: "#EFE6DA",
    shadowColor: "#8B7355",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    position: "relative",
    overflow: "hidden",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconContainer: {
    backgroundColor: "rgba(139, 115, 85, 0.1)",
    padding: 12,
    borderRadius: 12,
  },

  textContainer: {
    flex: 1,
  },

  date: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 24,
    color: "#2C2C2C",
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dayLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(139, 115, 85, 0.3)",
  },

  day: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#8B7355",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },

  decorativeCorner: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 60,
    height: 60,
    backgroundColor: "rgba(139, 115, 85, 0.05)",
    borderRadius: 30,
  },
});
