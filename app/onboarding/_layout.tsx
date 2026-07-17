import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="goals" options={{ headerShown: false }} />
      <Stack.Screen name="social-proof" options={{ headerShown: false }} />
      <Stack.Screen name="solution" options={{ headerShown: false }} />
      <Stack.Screen name="demo" options={{ headerShown: false }} />
      <Stack.Screen name="reminder" options={{ headerShown: false }} />
      <Stack.Screen name="name" options={{ headerShown: false }} />
      <Stack.Screen name="final-cta" options={{ headerShown: false }} />
    </Stack>
  );
}
