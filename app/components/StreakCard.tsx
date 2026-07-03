import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

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

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="flame-outline" size={24} color="#1F1F1F" />

        <Text style={styles.title}>Streaks</Text>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Current</Text>

          <Text style={styles.value}>{currentStreak} Days</Text>
        </View>

        <View>
          <Text style={styles.label}>Best</Text>

          <Text style={styles.value}>{bestStreak} Days</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: "#777",
    fontSize: 14,
  },

  value: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "700",
    color: "#1F1F1F",
  },
});
