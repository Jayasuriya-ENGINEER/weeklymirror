import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../stores/authStore";
import { syncCurrentEdition } from "../engines/editionEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Index() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

useEffect(() => {
  if (loading) return;

  const initialize = async () => {
    if (!user) {
      router.replace("/login");
      return;
    }

    await syncCurrentEdition(user.id);
    await AsyncStorage.removeItem("onboarding_complete");

    const completed = await AsyncStorage.getItem("onboarding_complete");

    if (completed === "true") {
      router.replace("/(tabs)");
    } else {
      router.replace("/onboarding");
    }
  };

  initialize();
}, [loading, user]);


  if (loading) {
    return null;
  }

  return null;
}
