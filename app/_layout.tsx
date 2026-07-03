import { Stack } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  useAuth();

  return <Stack screenOptions={{ headerShown: false }} />;
}
