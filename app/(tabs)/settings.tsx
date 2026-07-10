import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import SettingsRow from "../components/settings/SettingsRow";
import SectionTitle from "../components/settings/SectionTitle";

import { useRouter } from "expo-router";
import { useAuthStore } from "../../stores/authStore";
import { Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import {
  loadNotificationSettings,
  saveDailyReminder,
  saveWeeklyReminder,
} from "../../services/settingsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  requestNotificationPermission,
  sendTestNotification,
} from "../../services/notificationService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { saveReminderTime } from "../../services/settingsService";
import { scheduleReminderSequence } from "../../services/notificationService";
import * as ImagePicker from "expo-image-picker";

import {
  getProfile,
  saveProfile,
  uploadProfileImage,
} from "../../services/profileService";



export default function Settings() {
  const router = useRouter();

  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyReminder, setWeeklyReminder] = useState(true);
  const user = useAuthStore((state) => state.user);
  const [userName, setUserName] = useState("Your Name");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  

const [reminderTime, setReminderTime] = useState(() => {
  const date = new Date();
  date.setHours(20);
  date.setMinutes(0);
  return date;
});
  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase.auth.signOut();

          if (error) {
            Alert.alert("Error", error.message);
            return;
          }

          router.replace("/(auth)/login");
        },
      },
    ]);
  };
const setupNotifications = async () => {
  const granted = await requestNotificationPermission();

  console.log("Notification permission:", granted);

  if (!granted) {
    Alert.alert(
      "Permission Required",
      "Please allow notifications to receive reminders.",
    );
    return;
  }




  await sendTestNotification();

  console.log("Test notification scheduled.");
};



useEffect(() => {
  loadProfile();
  loadSettings();
}, []);


const loadProfile = async () => {
  if (!user) return;

  const { data } = await getProfile(user.id);

  if (!data) return;

  if (data.name) {
    setUserName(data.name);
  }

  if (data.avatar_url) {
    setAvatarUrl(data.avatar_url);
  }
};



const pickProfileImage = async () => {
  if (!user) return;

  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permission Required",
      "Please allow photo access.",
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (result.canceled) return;

  const imageUri = result.assets[0].uri;

  const { avatarUrl, error } = await uploadProfileImage(
    user.id,
    imageUri,
  );

if (error || !avatarUrl) {
  console.log(error);
  Alert.alert("Upload Failed", JSON.stringify(error));
  return;
}

  const { error: saveError } = await saveProfile(
    user.id,
    userName,
    avatarUrl,
  );

  if (saveError) {
    Alert.alert(saveError.message);
    return;
  }

  setAvatarUrl(avatarUrl);

  Alert.alert("Success", "Profile picture updated.");
};




const loadSettings = async () => {
  const settings = await loadNotificationSettings();

  setDailyReminder(settings.dailyReminder);
  setWeeklyReminder(settings.weeklyReminder);

  if (settings.reminderTime) {
    const [time, period] = settings.reminderTime.split(" ");

    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    setReminderTime(date);
  }
};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Settings</Text>

      <SectionTitle title="Account" />

      <View style={styles.profile}>
        <TouchableOpacity
          style={styles.avatar}
          activeOpacity={0.8}
          onPress={pickProfileImage}
        >
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={30} color="#A98B5E" />
          )}
        </TouchableOpacity>

        <View>
          <Text style={styles.name}>{userName}</Text>

          <Text style={styles.email}>{user?.email || "your@email.com"}</Text>
        </View>
      </View>

      <SectionTitle title="Support" />

      <SettingsRow
        icon="chatbubble-ellipses-outline"
        title="Send Feedback"
        onPress={() =>
          Linking.openURL(
            "mailto:mcmaplescreations@gmail.com?subject=WeeklyMirror Feedback",
          )
        }
      />

      <SectionTitle title="Notifications" />

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Daily Reminder</Text>

        <Switch
          value={dailyReminder}
          onValueChange={(value) => {
            setDailyReminder(value);
            saveDailyReminder(value);
          }}
        />
      </View>

      <SettingsRow
        icon="time-outline"
        title="Reminder Time"
        subtitle={reminderTime.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
        onPress={() => setShowPicker(true)}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Weekly Reminder</Text>

        <Switch
          value={weeklyReminder}
          onValueChange={(value) => {
            setWeeklyReminder(value);
            saveWeeklyReminder(value);
          }}
        />
      </View>

      <SectionTitle title="Legal" />

      <SettingsRow
        icon="shield-checkmark-outline"
        title="Privacy Policy"
        onPress={() => Linking.openURL("https://thehavenstore.in")}
      />

      <SettingsRow
        icon="document-text-outline"
        title="Terms & Conditions"
        onPress={() => Linking.openURL("https://thehavenstore.in")}
      />

      <SectionTitle title="About" />

      <Text style={styles.version}>Version 1.0.0</Text>

      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: "#A98B5E",
          padding: 15,
          borderRadius: 12,
        }}
        onPress={async () => {
          const granted = await requestNotificationPermission();

          if (granted) {
            await sendTestNotification();
            Alert.alert("Success", "Notification scheduled in 10 seconds.");
          }
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Test Notification
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          display="default"
          onChange={async (_, selected) => {
            setShowPicker(false);

            if (!selected) return;

            setReminderTime(selected);

            const formatted = selected.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            });

            await saveReminderTime(formatted);

            await scheduleReminderSequence(
              selected.getHours(),
              selected.getMinutes(),
            );
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
    padding: 20,
  },

  title: {
    marginTop: 50,
    fontSize: 36,
    fontWeight: "700",
    color: "#222",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: "#EFE7DA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  email: {
    marginTop: 4,
    color: "#777",
  },

  switchRow: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  switchText: {
    fontSize: 16,
    color: "#222",
  },

  version: {
    marginTop: 15,
    color: "#777",
    textAlign: "center",
  },

  logout: {
    marginTop: 45,
    backgroundColor: "#E85B5B",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 40,
  },

  logoutText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
  },
});
