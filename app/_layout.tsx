import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../stores/authStore";
import AnimatedSplashScreen from "./components/AnimatedSplashScreen";

// Keep the native splash up until our branded splash is ready to paint.
SplashScreen.preventAutoHideAsync().catch(() => {
  // Already hidden or unavailable (e.g. web) — safe to ignore.
});

SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

export default function RootLayout() {
  useAuth();

  const loading = useAuthStore((state) => state.loading);

  const [firstQuoteDone, setFirstQuoteDone] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [dismissSplash, setDismissSplash] = useState(false);

  // Dismiss only when auth finished AND at least one quote fully typed.
  // While auth still loads, extra quotes keep cycling on the splash.
  useEffect(() => {
    if (!loading && firstQuoteDone && splashVisible && !dismissSplash) {
      setDismissSplash(true);
    }
  }, [loading, firstQuoteDone, splashVisible, dismissSplash]);

  const handleSplashReady = useCallback(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  const handleFirstQuoteComplete = useCallback(() => {
    setFirstQuoteDone(true);
  }, []);

  const handleSplashDismissed = useCallback(() => {
    setSplashVisible(false);
  }, []);

  // Show the navigator as soon as auth resolves so routes can mount under the splash.
  const showApp = !loading;

  return (
    <View style={styles.root}>
      {showApp ? <Stack screenOptions={{ headerShown: false }} /> : null}

      {splashVisible ? (
        <AnimatedSplashScreen
          onReady={handleSplashReady}
          onFirstQuoteComplete={handleFirstQuoteComplete}
          dismiss={dismissSplash}
          onDismissComplete={handleSplashDismissed}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
