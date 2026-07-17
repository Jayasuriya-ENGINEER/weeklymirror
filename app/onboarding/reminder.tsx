import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  requestNotificationPermission,
  scheduleReminderSequence,
} from "../../services/notificationService";

const TOTAL_SCREENS = 8;
const CURRENT_SCREEN = 5;

export default function OnboardingReminder() {
  const router = useRouter();
  const [time, setTime] = useState(() => {
    const date = new Date();
    date.setHours(20);
    date.setMinutes(0);
    return date;
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Handle platform-specific time picker
  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  const handleTimePress = () => {
    setShowTimePicker(true);
  };

  const next = async () => {
    // Save notification settings
    const granted = await requestNotificationPermission();

    if (granted) {
      await scheduleReminderSequence(time.getHours(), time.getMinutes());
    }

    await AsyncStorage.setItem(
      "notification_settings",
      JSON.stringify({
        enabled: granted,
        hour: time.getHours(),
        minute: time.getMinutes(),
      })
    );

    router.push("/onboarding/name" as any);
  };

  // Format time for display
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress dots */}
        <View style={styles.dotsContainer}>
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === CURRENT_SCREEN && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <Text style={styles.headline}>Set your daily reminder</Text>
        <Text style={styles.subheadline}>
          Choose a time when WeeklyMirror should remind you to capture your
          day
        </Text>

        {/* Clock image - using the placeholder from assets */}
        <Image
          source={require("../../assets/images/clockplaceholder.png")}
          style={styles.clockImage}
          resizeMode="contain"
        />

        {/* Time display */}
        <TouchableOpacity style={styles.timeButton} onPress={handleTimePress}>
          <Text style={styles.timeText}>{formatTime(time)}</Text>
        </TouchableOpacity>

        {/* Time picker (iOS: inline, Android: dialog) */}
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
            is24Hour={false}
            minuteInterval={5}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>Save Reminder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  content: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    width: "100%",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DDD",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#A98B5E",
    width: 28,
  },
  headline: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    lineHeight: 42,
  },
  subheadline: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 28,
    color: "#666",
    textAlign: "center",
    maxWidth: "80%",
  },
  clockImage: {
    width: 180,
    height: 180,
    marginVertical: 40,
  },
  timeButton: {
    backgroundColor: "#FFF",
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#A98B5E",
    marginBottom: 40,
  },
  timeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#A98B5E",
    letterSpacing: 2,
  },
  button: {
    backgroundColor: "#A98B5E",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    minWidth: 200,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
