import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

import { useAuthStore } from "../../stores/authStore";
import { getUserMemoryDates } from "../../services/memoryService";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from "../../utils/streakUtils";

export default function StreakCard() {
  const user = useAuthStore((state) => state.user);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  useEffect(() => {
    loadStreaks();
  }, []);

  const loadStreaks = async () => {
    if (!user) return;

    const { data, error } = await getUserMemoryDates(user.id);
    console.log("STREAK DATA:", data);

    if (error) {
      console.log(error);
      return;
    }

    const dates = data.map((item) => item.memory_date).filter(Boolean);
    setCurrentStreak(calculateCurrentStreak(dates));
    setBestStreak(calculateLongestStreak(dates));
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="small" color="#EFE7DA" />;
  }

  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="flame" size={22} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>Streaks</Text>
      </View>

      {/* Subtle Divider */}
      <View style={styles.divider} />

      {/* Stats Row */}
      <View style={styles.row}>
        <View style={styles.statBox}>
          <Text style={styles.label}>Current</Text>
          <Text style={styles.value}>{currentStreak}</Text>
          <Text style={styles.unit}>Days</Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.statBox}>
          <Text style={styles.label}>Best</Text>
          <Text style={styles.value}>{bestStreak}</Text>
          <Text style={styles.unit}>Days</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EFE6DA",
    borderRadius: 24,
    padding: 24,
    marginVertical: 15,
    shadowColor: "#8B7355",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconContainer: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: "black",
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

  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    marginVertical: 18,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statBox: {
    flex: 1,
    alignItems: "center",
  },

  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    marginHorizontal: 20,
  },

  label: {
    fontFamily: "Poppins_500Medium",
    color: "#999",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },

  value: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 36,
    color: "#1F1F1F",
    lineHeight: 40,
  },

  unit: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#B0B0B0",
    marginTop: -2,
  },
});
