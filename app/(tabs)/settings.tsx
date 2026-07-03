import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Linking,
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


export default function Settings() {
  const router = useRouter();

  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyReminder, setWeeklyReminder] = useState(true);
  const user = useAuthStore((state) => state.user);
  const [userName, setUserName] = useState("Your Name");
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

 useEffect(() => {
   loadProfile();
 }, []);

 const loadProfile = async () => {
   const value = await AsyncStorage.getItem("profile");

   if (!value) return;

   const profile = JSON.parse(value);

   setUserName(profile.name);
 };

  const loadSettings = async () => {
    const settings = await loadNotificationSettings();

    setDailyReminder(settings.dailyReminder);
    setWeeklyReminder(settings.weeklyReminder);
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
        <View style={styles.avatar}>
          <Ionicons name="person" size={30} color="#A98B5E" />
        </View>

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
        subtitle="8:00 PM"
        onPress={() => {}}
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
});
