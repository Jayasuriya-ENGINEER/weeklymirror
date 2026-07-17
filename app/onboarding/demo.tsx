import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";

const TOTAL_SCREENS = 8;
const CURRENT_SCREEN = 4;

const { width } = Dimensions.get("window");
const VIDEO_HEIGHT = (width * 0.8 * 9) / 16; // 16:9 aspect ratio

// Placeholder video URI - replace with your actual MP4 URL
// For now, using a placeholder. You'll need to update this with your supabase/google drive URL
const VIDEO_URI = ""; // Add your video URL here when ready

export default function OnboardingDemo() {
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const next = () => {
    router.push("/onboarding/reminder" as any);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setVideoError(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress dots */}
        <View style={styles.dotsContainer}>
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === CURRENT_SCREEN && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <Text style={styles.headline}>See it in action</Text>
        <Text style={styles.subheadline}>
          This is what you'll create — your own personal newspaper
        </Text>

        {/* Video container */}
        <View style={styles.videoContainer}>
          {VIDEO_URI ? (
            <>
              <Video
                ref={videoRef}
                source={{ uri: VIDEO_URI }}
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                shouldPlay
                onLoad={handleVideoLoad}
                onError={handleVideoError}
              />
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#A98B5E" />
                </View>
              )}
              {videoError && (
                <View style={styles.errorOverlay}>
                  <Text style={styles.errorText}>
                    Video could not be loaded
                  </Text>
                  <Text style={styles.errorSubtext}>
                    We'll show your demo here
                  </Text>
                </View>
              )}
            </>
          ) : (
            // Fallback if no video URI is set
            <View style={[styles.video, styles.placeholderVideo]}>
              <Text style={styles.placeholderText}>
                Demo Video Placeholder
              </Text>
              <Text style={styles.placeholderSubtext}>
                Your demo video will appear here
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.caption}>
          *Your weekly memories, automatically transformed
        </Text>

        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  content: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    width: "100%",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DDD",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#A98B5E",
    width: 28,
  },
  headline: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    lineHeight: 42,
  },
  subheadline: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 28,
    color: "#666",
    textAlign: "center",
  },
  videoContainer: {
    marginVertical: 40,
    width: "100%",
    alignItems: "center",
  },
  video: {
    width: width * 0.8,
    height: VIDEO_HEIGHT,
    backgroundColor: "#000",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  placeholderVideo: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
  },
  errorText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorSubtext: {
    color: "#CCC",
    fontSize: 14,
    marginTop: 4,
  },
  placeholderText: {
    color: "#888",
    fontSize: 18,
    fontWeight: "600",
  },
  placeholderSubtext: {
    color: "#666",
    fontSize: 14,
    marginTop: 8,
  },
  caption: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#A98B5E",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginTop: 40,
    alignItems: "center",
    alignSelf: "center",
    minWidth: 200,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
