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
  Modal,
} from "react-native";

import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateProfileName } from "../../services/profileService";

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

import { useProfileStore } from "../../stores/profileStore";

export default function Settings() {
  const router = useRouter();

  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyReminder, setWeeklyReminder] = useState(true);
  const user = useAuthStore((state) => state.user);

  const userName = useProfileStore((state) => state.name);
  const avatarUrl = useProfileStore((state) => state.avatarUrl);

  const setProfile = useProfileStore((state) => state.setProfile);
  const updateName = useProfileStore((state) => state.updateName);
  const updateAvatar = useProfileStore((state) => state.updateAvatar);


  const [showPicker, setShowPicker] = useState(false);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(userName);
  

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

          if (error) { Alert.alert("Error", "Failed to sign out. Please try again."); return; }

         setTimeout(() => {
           router.replace("/login");
         }, 0);
         // Don't navigate here.
         // useAuth + index.tsx will do it automatically.
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
  setNewName(userName);
}, [userName]);



const loadProfile = async () => {
  if (!user) return;

  const { data } = await getProfile(user.id);

  if (!data) return;

 setProfile(data.name || "Your Name", data.avatar_url ?? null);
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


  const saveName = async () => {
    if (!user) return;

    const trimmed = newName.trim();

    if (!trimmed) return;

    const { error } = await updateProfileName(user.id, trimmed);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    updateName(trimmed);

    setEditingName(false);

    Alert.alert("Success", "Name updated.");
  };

  
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

 updateAvatar(avatarUrl);

  Alert.alert("Success", "Profile picture updated.");
};


const saveName = async () => {
  if (!user) return;

  const trimmed = newName.trim();

  if (!trimmed) return;

  const { error } = await updateProfileName(user.id, trimmed);

  if (error) {
    Alert.alert("Error", error.message);
    return;
  }

  updateName(trimmed);

  setEditingName(false);

  Alert.alert("Success", "Name updated.");
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
    <SafeAreaView style={styles.safeArea}>
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
            <Image
              key={avatarUrl}
              source={{ uri: avatarUrl }}
              style={styles.avatarImage}
            />
          ) : (
            <Ionicons name="person" size={30} color="#A98B5E" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setEditingName(true)}
        >
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{user?.email || "your@email.com"}</Text>
        </TouchableOpacity>
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

      <Modal visible={editingName} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#FFF",
              borderRadius: 20,
              padding: 22,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: "#222",
              }}
            >
              Change your name
            </Text>

            <TextInput
              value={newName}
              onChangeText={setNewName}
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "#DDD",
                borderRadius: 14,
                padding: 15,
                fontSize: 16,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 25,
              }}
            >
              <TouchableOpacity onPress={() => setEditingName(false)}>
                <Text
                  style={{
                    color: "#888",
                    marginRight: 25,
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={saveName}>
                <Text
                  style={{
                    color: "#A98B5E",
                    fontWeight: "700",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
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
