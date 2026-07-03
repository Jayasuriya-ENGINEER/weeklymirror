import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useAuthStore } from "../../stores/authStore";

import { useMemoryStore } from "../../stores/memoryStore";
import{ Image } from "react-native";

import {
  getWeeklyMemories,
  getMemoriesByDate,
} from "../../services/memoryService";

import {Ionicons} from "@expo/vector-icons";
import { LayoutAnimation } from "react-native";


const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function WeekTracker() {

   const QUOTES = [
     "Good things take time.",
     "The story of this day is still unfolding.",
     "Every week has chapters yet to be written.",
     "Your future memories are waiting.",
   ];

  const user = useAuthStore((state) => state.user);

  const refreshKey = useMemoryStore((state) => state.refreshKey);

  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [selectedMemories, setSelectedMemories] = useState<any[]>([]);



  useEffect(() => {
    loadWeek();
  }, [refreshKey]);

  const loadWeek = async () => {
    if (!user) return;

    const { data, error } = await getWeeklyMemories(user.id);

    if (error) {
      console.log(error);
      return;
    }

    const today = new Date();

    const startOfWeek = new Date(today);

    const day = today.getDay();

    const mondayOffset = day === 0 ? -6 : 1 - day;

    startOfWeek.setDate(today.getDate() + mondayOffset);

    const completed: number[] = [];

    const weekDates: string[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);

      date.setDate(startOfWeek.getDate() + i);

      weekDates.push(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0",
        )}-${String(date.getDate()).padStart(2, "0")}`,
      );
    }

    data?.forEach((memory) => {
      if (!memory.memory_date) return;

      const index = weekDates.indexOf(memory.memory_date);

      if (index !== -1) {
        completed.push(index);
      }
    });

    setCompletedDays([...new Set(completed)]);
  };



  const handleDayPress = async (index: number) => {
    if (!user) return;

    if (selectedDay === index) {
      setSelectedDay(null);
      setSelectedMemories([]);
      return;
    }

    const today = new Date();

    const startOfWeek = new Date(today);

    const day = today.getDay();

    const mondayOffset = day === 0 ? -6 : 1 - day;

    startOfWeek.setDate(today.getDate() + mondayOffset);

    const selectedDate = new Date(startOfWeek);

    selectedDate.setDate(startOfWeek.getDate() + index);

    const memoryDate = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1,
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    const { data, error } = await getMemoriesByDate(user.id, memoryDate);

    if (error) {
      console.log(error);
      return;
    }

    setSelectedMemories(data || []);
    LayoutAnimation.configureNext(
  LayoutAnimation.Presets.easeInEaseOut,
);
    setSelectedDay(index);
  };

  const getSelectedDateLabel = () => {
    if (selectedDay === null) return "";

   

    const today = new Date();

    const startOfWeek = new Date(today);

    const day = today.getDay();

    const mondayOffset = day === 0 ? -6 : 1 - day;

    startOfWeek.setDate(today.getDate() + mondayOffset);

    const selectedDate = new Date(startOfWeek);

    selectedDate.setDate(startOfWeek.getDate() + selectedDay);

    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const todayIndex = (() => {
    const day = new Date().getDay();

    return day === 0 ? 6 : day - 1;
  })();

  return (
    
    <View style={styles.card}>
      <Text style={styles.title}>This Week</Text>

      <View style={styles.daysRow}>
        {DAYS.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayContainer}
            onPress={() => handleDayPress(index)}
          >
            <Text style={styles.dayLabel}>{day}</Text>

            <View
              style={[
                styles.circle,
                completedDays.includes(index) && styles.completed,
                todayIndex === index && styles.today,
                selectedDay === index && styles.selected,
              ]}
            />

            <Ionicons
              name={selectedDay === index ? "chevron-up" : "chevron-down"}
              size={14}
              color="#666"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.progress}>
        {completedDays.length}
        {" / "}7 Days Captured
      </Text>

      {selectedDay !== null && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{getSelectedDateLabel()}</Text>

          {selectedMemories.length > 0 ? (
            selectedMemories.map((memory) => (
              <View key={memory.id} style={styles.memoryItem}>
                <Text style={styles.memoryText}>{memory.content}</Text>

                {memory.image_url && (
                  <Image
                    source={{
                      uri: memory.image_url,
                    }}
                    style={styles.memoryImage}
                  />
                )}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>
              {QUOTES[selectedDay % QUOTES.length]}
            </Text>
          )}
        </View>
      )}
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

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dayContainer: {
    alignItems: "center",
    gap: 10,
  },

  dayLabel: {
    color: "#666",
    fontSize: 13,
    fontWeight: "600",
  },

  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E5E5E5",
  },

  completed: {
    backgroundColor: "#1F1F1F",
  },

  today: {
    borderWidth: 2,
    borderColor: "#1F1F1F",
  },

  progress: {
    marginTop: 18,
    textAlign: "center",
    color: "#777",
    fontSize: 13,
  },

  selected: {
    transform: [{ scale: 1.2 }],
  },
  detailCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#F8F8F8",
  },

  detailTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  memoryText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 8,
    lineHeight: 22,
  },

  emptyText: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
  },
  memoryItem: {
    marginBottom: 20,
  },

  memoryImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 10,
  },
});
