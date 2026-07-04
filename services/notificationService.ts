import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  firstReminder,
  secondReminder,
  finalReminder,
} from "../utils/reminderMessages";

import { getRandomMessage } from "../utils/getRandomReminder";

import {
  saveNotificationIds,
  getNotificationIds,
  clearNotificationIds,
} from "./notificationStorage";
import { supabase } from "../lib/supabase";

export async function scheduleDailyReminder(
  hour: number,
  minute: number,
  message?: string,
) {
  const ids = await getNotificationIds();

  for (const id of ids) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  await clearNotificationIds();

  const randomMessage = message ?? getRandomMessage(firstReminder);

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "WeeklyMirror",
      body: randomMessage,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });

  await saveNotificationIds([id]);

  console.log("Scheduled notification:", id);
}

export async function scheduleSecondReminder(hour: number, minute: number) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "WeeklyMirror",
      body: getRandomMessage(secondReminder),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function scheduleFinalReminder(hour: number, minute: number) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "WeeklyMirror",
      body: getRandomMessage(finalReminder),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function scheduleReminderSequence(hour: number, minute: number) {
  const ids: string[] = [];

  // Cancel previous reminders
  const oldIds = await getNotificationIds();

  for (const id of oldIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  await clearNotificationIds();

  // First reminder
  const firstId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "WeeklyMirror",
      body: getRandomMessage(firstReminder),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });

  ids.push(firstId);

  const first = new Date();
  first.setHours(hour);
  first.setMinutes(minute);
  first.setSeconds(0);

  const second = new Date(first);
  second.setMinutes(second.getMinutes() + 90);

  const final = new Date(first);
  final.setHours(23);
  final.setMinutes(50);
  final.setSeconds(0);

  if (second < final) {
    const secondId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "WeeklyMirror",
        body: getRandomMessage(secondReminder),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: second.getHours(),
        minute: second.getMinutes(),
      },
    });

    ids.push(secondId);
  }

  if (first < final) {
    const finalId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "WeeklyMirror",
        body: getRandomMessage(finalReminder),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: final.getHours(),
        minute: final.getMinutes(),
      },
    });

    ids.push(finalId);
  }

  await saveNotificationIds(ids);

  console.log("Scheduled reminders:", ids);
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();

  return status === "granted";
}

export async function sendTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "WeeklyMirror",
      body: "This is a test reminder. 🎉",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
    },
  });
}

export async function setupNotifications() {
  const value = await AsyncStorage.getItem("notification_settings");

  if (!value) return;

  const settings = JSON.parse(value);

  if (!settings.enabled) return;

  if (await hasWrittenToday()) {
    console.log("Today's memory already exists.");
    return;
  }

  const granted = await requestNotificationPermission();

  if (!granted) return;

  await scheduleReminderSequence(settings.hour, settings.minute);
}

export async function cancelReminderSequence() {
  const ids = await getNotificationIds();

  for (const id of ids) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  await clearNotificationIds();

  console.log("Remaining reminders cancelled.");
}

async function hasWrittenToday() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const today = new Date().toISOString().split("T")[0];

  const { count } = await supabase
    .from("memories")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id)
    .eq("memory_date", today);

  return (count ?? 0) > 0;
}