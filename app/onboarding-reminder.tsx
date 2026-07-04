import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  requestNotificationPermission,
  scheduleReminderSequence,
} from "../services/notificationService";



export default function OnboardingReminder() {
  const router = useRouter();

  const [time, setTime] = useState(() => {
    const date = new Date();
    date.setHours(20);
    date.setMinutes(0);
    return date;
  });

const finish = async () => {
  const granted = await requestNotificationPermission();

  if (granted) {
    await scheduleReminderSequence(time.getHours(), time.getMinutes());
  }

  await AsyncStorage.setItem(
    "notification_settings",
    JSON.stringify({
      enabled: true,
      hour: time.getHours(),
      minute: time.getMinutes(),
    }),
  );

  await AsyncStorage.setItem("onboarding_complete", "true");

  router.replace("/(tabs)");
};

  const skip = async () => {
    await AsyncStorage.setItem(
      "notification_settings",
      JSON.stringify({
        enabled: false,
      }),
    );

    await AsyncStorage.setItem("onboarding_complete", "true");

    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Reminder</Text>

      <Text style={styles.subtitle}>
        Choose a time when WeeklyMirror should remind you to capture your day.
      </Text>

      <DateTimePicker
        value={time}
        mode="time"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={(_, selected) => {
          if (selected) setTime(selected);
        }}
      />

      <TouchableOpacity style={styles.button} onPress={finish}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={skip}>
        <Text style={styles.skip}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
    justifyContent: "center",
    padding: 30,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    marginTop: 15,
    marginBottom: 40,
    fontSize: 17,
    color: "#666",
    lineHeight: 28,
  },

  button: {
    marginTop: 50,
    backgroundColor: "#A98B5E",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },

  skip: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
});
