import AsyncStorage from "@react-native-async-storage/async-storage";

const DAILY_KEY = "dailyReminder";
const WEEKLY_KEY = "weeklyReminder";
const TIME_KEY = "reminderTime";

export async function loadNotificationSettings() {
  const daily = await AsyncStorage.getItem(DAILY_KEY);
  const weekly = await AsyncStorage.getItem(WEEKLY_KEY);
  const time = await AsyncStorage.getItem(TIME_KEY);

  return {
    dailyReminder: daily ? JSON.parse(daily) : true,
    weeklyReminder: weekly ? JSON.parse(weekly) : true,
    reminderTime: time ?? "8:00 PM",
  };
}

export async function saveDailyReminder(value: boolean) {
  await AsyncStorage.setItem(DAILY_KEY, JSON.stringify(value));
}

export async function saveWeeklyReminder(value: boolean) {
  await AsyncStorage.setItem(WEEKLY_KEY, JSON.stringify(value));
}

export async function saveReminderTime(value: string) {
  await AsyncStorage.setItem(TIME_KEY, value);
}
