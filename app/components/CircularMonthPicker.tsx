import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const SIZE = 260;
const RADIUS = 105;

interface Props {
  selectedMonth: number;
  selectedYear: number;
  onSelectMonth: (month: number) => void;
}

export default function CircularMonthPicker({
  selectedMonth,
  selectedYear,
  onSelectMonth,
}: Props) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: selectedMonth,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [selectedMonth]);

  const rotate = rotation.interpolate({
    inputRange: [0, 11],
    outputRange: ["0deg", "-330deg"],
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.outerRing} />
      <View style={styles.innerRing} />
      <Animated.View style={styles.circle}>
        {MONTHS.map((month, index) => {
          const angle = (360 / 12) * index - 90;

          const rad = (angle * Math.PI) / 180;

          const x = Math.cos(rad) * RADIUS;

          const y = Math.sin(rad) * RADIUS;

          return (
            <TouchableOpacity
              key={month}
              onPress={() => onSelectMonth(index)}
              style={[
                styles.month,
                {
                  left: SIZE / 2 + x - 26,
                  top: SIZE / 2 + y - 16,
                },
                index === selectedMonth && styles.selectedMonth,
              ]}
            >
              <Text
                style={[
                  styles.monthText,
                  index === selectedMonth && styles.selectedText,
                ]}
              >
                {month}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      <View style={styles.center}>
        <Text style={styles.centerMonth}>{MONTHS[selectedMonth]}</Text>

        <Text style={styles.centerYear}>{selectedYear}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: SIZE,
    height: SIZE,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  circle: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 1,
    borderColor: "#E6E1D8",
  },

  month: {
    position: "absolute",
    width: 52,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedMonth: {
    backgroundColor: "#C8A25A",
    borderRadius: 16,
  },

  monthText: {
    fontWeight: "700",
    color: "#777",
  },

  outerRing: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 1,
    borderColor: "#E8E2D8",
  },

  innerRing: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#EEE8DF",
  },

  selectedText: {
    color: "#FFF",
  },

  center: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F2EB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },

  centerMonth: {
    fontSize: 24,
    fontWeight: "800",
    color: "#222",
  },

  centerYear: {
    marginTop: 6,
    color: "#888",
    fontSize: 16,
  },
});
