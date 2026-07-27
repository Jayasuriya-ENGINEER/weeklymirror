import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../stores/authStore";
import { syncCurrentEdition } from "../engines/editionEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupNotifications } from "../services/notificationService";
import { supabase } from "@/lib/supabase";


export default function Index() {
const router = useRouter();
const user = useAuthStore((state) => state.user);
const loading = useAuthStore((state) => state.loading);


console.log("INDEX RENDER");
console.log("INDEX USER:", user?.email);
console.log("INDEX LOADING:", loading);


useEffect(() => {
    console.log("INDEX EFFECT");
if (loading) return;

const initialize = async () => {
  try {
    if (!user) {
      router.replace("/login");
      return;
    }

    await syncCurrentEdition(user.id);

    await setupNotifications();

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .single();

  if (profile?.onboarding_completed) {
    router.replace("/(tabs)");
  } else {
    router.replace("/onboarding/welcome");
  }
  } catch (err) {
    console.error("Initialization error:", err);

    router.replace("/(tabs)");
  }
};

initialize();
}, [loading, user]);


if (loading) {
return null;
}

return null;
}
