import AsyncStorage from "@react-native-async-storage/async-storage";

const DAILY_NOTIFICATION_IDS = "daily_notification_ids";

export async function saveNotificationIds(ids: string[]) {
  await AsyncStorage.setItem(DAILY_NOTIFICATION_IDS, JSON.stringify(ids));
}

export async function getNotificationIds() {
  const value = await AsyncStorage.getItem(DAILY_NOTIFICATION_IDS);

  if (!value) return [];

  return JSON.parse(value) as string[];
}

export async function clearNotificationIds() {
  await AsyncStorage.removeItem(DAILY_NOTIFICATION_IDS);
}
