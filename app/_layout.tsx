import { Stack } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../stores/authStore";

export default function RootLayout() {
  useAuth();

  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return null;
  }

  // Let the index page handle the routing logic
  return <Stack screenOptions={{ headerShown: false }} />;
}
