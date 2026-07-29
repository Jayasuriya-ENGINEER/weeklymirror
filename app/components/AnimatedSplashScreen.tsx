import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import {
  useFonts,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";

/** Brand gold — matches the open-book logo and app accents. */
export const SPLASH_GOLD = "#C8A25A";

/** Static splash quotes about the value of each day's memory. */
export const SPLASH_QUOTES = [
  "Every day holds a page worth keeping.",
  "Today's small moments become tomorrow's treasures.",
  "A single day, remembered, can light a lifetime.",
  "Your story is written one memory at a time.",
  "What you notice today becomes the life you cherish.",
] as const;

const TYPE_SPEED_MS = 38;
const QUOTE_HOLD_MS = 1600;
const TITLE_REVEAL_MS = 50;
const EXIT_FADE_MS = 450;
const FULL_TITLE = "Weekly Mirror";

type AnimatedSplashScreenProps = {
  /** Called once the custom splash has painted (hide native splash). */
  onReady?: () => void;
  /** Fired when the first quote has fully typed out. */
  onFirstQuoteComplete?: () => void;
  /** When true, fade out and call onDismissComplete. */
  dismiss?: boolean;
  onDismissComplete?: () => void;
};

export default function AnimatedSplashScreen({
  onReady,
  onFirstQuoteComplete,
  dismiss = false,
  onDismissComplete,
}: AnimatedSplashScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Poppins_400Regular,
  });

  const [titleVisible, setTitleVisible] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const firstQuoteDoneRef = useRef(false);
  const titleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef(true);
  const readyFiredRef = useRef(false);
  const onFirstQuoteCompleteRef = useRef(onFirstQuoteComplete);
  onFirstQuoteCompleteRef.current = onFirstQuoteComplete;

  const logoScale = useSharedValue(0.86);
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(12);
  const quoteOpacity = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  const clearQuoteTimers = useCallback(() => {
    if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
    if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    typeTimeoutRef.current = null;
    holdTimeoutRef.current = null;
    cursorIntervalRef.current = null;
  }, []);

  const clearAllTimers = useCallback(() => {
    if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
    titleTimeoutRef.current = null;
    clearQuoteTimers();
  }, [clearQuoteTimers]);

  const fireReady = useCallback(() => {
    if (readyFiredRef.current) return;
    readyFiredRef.current = true;
    onReady?.();
  }, [onReady]);

  // Entrance animations once fonts are ready
  useEffect(() => {
    if (!fontsLoaded) return;

    fireReady();

    logoOpacity.value = withTiming(1, {
      duration: 650,
      easing: Easing.out(Easing.cubic),
    });
    logoScale.value = withTiming(1, {
      duration: 750,
      easing: Easing.out(Easing.back(1.2)),
    });

    titleOpacity.value = withDelay(
      280,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) })
    );
    titleTranslateY.value = withDelay(
      280,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) })
    );

    quoteOpacity.value = withDelay(
      700,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) })
    );
  }, [
    fontsLoaded,
    fireReady,
    logoOpacity,
    logoScale,
    titleOpacity,
    titleTranslateY,
    quoteOpacity,
  ]);

  // Letter-by-letter title animation for "Weekly Mirror"
  useEffect(() => {
    if (!fontsLoaded) return;

    let i = 0;
    let cancelled = false;

    const startDelay = setTimeout(() => {
      const tick = () => {
        if (cancelled || !isMountedRef.current) return;
        i += 1;
        setTitleVisible(FULL_TITLE.slice(0, i));
        if (i < FULL_TITLE.length) {
          titleTimeoutRef.current = setTimeout(tick, TITLE_REVEAL_MS);
        }
      };
      tick();
    }, 320);

    return () => {
      cancelled = true;
      clearTimeout(startDelay);
      if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
    };
  }, [fontsLoaded]);

  // Typewriter quotes — cycles while splash is visible
  useEffect(() => {
    if (!fontsLoaded) return;

    isMountedRef.current = true;
    let cancelled = false;

    const typeQuote = (index: number) => {
      if (cancelled || !isMountedRef.current) return;

      const full = SPLASH_QUOTES[index % SPLASH_QUOTES.length];
      setQuoteText("");
      setShowCursor(true);

      let char = 0;

      const typeNext = () => {
        if (cancelled || !isMountedRef.current) return;

        char += 1;
        setQuoteText(full.slice(0, char));

        if (char < full.length) {
          typeTimeoutRef.current = setTimeout(typeNext, TYPE_SPEED_MS);
          return;
        }

        // Full quote displayed
        if (!firstQuoteDoneRef.current) {
          firstQuoteDoneRef.current = true;
          onFirstQuoteCompleteRef.current?.();
        }

        // Soft blink while holding the completed line
        cursorIntervalRef.current = setInterval(() => {
          if (!isMountedRef.current) return;
          setShowCursor((prev) => !prev);
        }, 480);

        holdTimeoutRef.current = setTimeout(() => {
          if (cursorIntervalRef.current) {
            clearInterval(cursorIntervalRef.current);
            cursorIntervalRef.current = null;
          }
          setShowCursor(false);

          // Advance to next quote (keeps going while app still loads)
          typeQuote(index + 1);
        }, QUOTE_HOLD_MS);
      };

      // Start typing after logo/title settle on first quote; quicker on later ones
      const startDelay = index === 0 ? 780 : 220;
      typeTimeoutRef.current = setTimeout(typeNext, startDelay);
    };

    typeQuote(0);

    return () => {
      cancelled = true;
      clearQuoteTimers();
    };
  }, [fontsLoaded, clearQuoteTimers]);

  // Exit fade when parent says dismiss
  useEffect(() => {
    if (!dismiss) return;

    screenOpacity.value = withTiming(
      0,
      { duration: EXIT_FADE_MS, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished && onDismissComplete) {
          runOnJS(onDismissComplete)();
        }
      }
    );
  }, [dismiss, screenOpacity, onDismissComplete]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const quoteStyle = useAnimatedStyle(() => ({
    opacity: quoteOpacity.value,
  }));

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  if (!fontsLoaded) {
    return <View style={styles.container} onLayout={fireReady} />;
  }

  return (
    <Animated.View
      style={[styles.container, screenStyle]}
      pointerEvents={dismiss ? "none" : "auto"}
    >
      <View style={styles.center}>
        <Animated.View style={[styles.logoWrap, logoStyle]}>
          <Image
            source={require("../../assets/images/applogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={titleStyle}>
          <Text style={styles.title} accessibilityRole="header">
            {titleVisible}
            {titleVisible.length < FULL_TITLE.length ? (
              <Text style={styles.titleCursor}>|</Text>
            ) : null}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.quoteWrap, quoteStyle]}>
          <Text style={styles.quote} accessibilityLiveRegion="polite">
            {quoteText}
            {showCursor ? <Text style={styles.quoteCursor}>|</Text> : null}
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFF",
    zIndex: 999,
    elevation: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
    maxWidth: 420,
    width: "100%",
  },
  logoWrap: {
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 28,
    letterSpacing: 0.6,
    color: SPLASH_GOLD,
    textAlign: "center",
    minHeight: 36,
  },
  titleCursor: {
    color: SPLASH_GOLD,
    opacity: 0.55,
  },
  quoteWrap: {
    marginTop: 22,
    minHeight: 56,
    justifyContent: "flex-start",
    width: "100%",
  },
  quote: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: "#8A7A5C",
    textAlign: "center",
  },
  quoteCursor: {
    color: SPLASH_GOLD,
    opacity: 0.7,
  },
});
