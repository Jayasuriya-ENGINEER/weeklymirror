import { Stack } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../stores/authStore";

export default function RootLayout() {
  useAuth();

  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
