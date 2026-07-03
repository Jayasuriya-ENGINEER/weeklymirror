import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const PAGES = [
  {
    title: "Welcome to WeeklyMirror",
    description:
      "Your life is made of moments.\nLet's turn them into a beautiful weekly newspaper.",
  },
  {
    title: "Capture Your Days",
    description:
      "Write a few words.\nAdd a photo if you like.\nKeep living your week.",
  },
  {
    title: "AI Creates Your Story",
    description:
      "At the end of every week,\nWeeklyMirror creates your own personal newspaper.",
  },
];

export default function Onboarding() {
  const router = useRouter();

  const flatListRef = useRef<FlatList>(null);

  const [page, setPage] = useState(0);

  const next = () => {
    if (page < PAGES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: page + 1,
      });
    } else {
      router.push("/onboarding-name");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={PAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);

          setPage(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.page}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.bottom}>
        <View style={styles.dots}>
          {PAGES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, page === i && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>
            {page === 2 ? "Continue" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },

  page: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },

  description: {
    marginTop: 30,
    fontSize: 18,
    lineHeight: 32,
    color: "#666",
    textAlign: "center",
  },

  bottom: {
    padding: 30,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
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

  button: {
    backgroundColor: "#A98B5E",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
