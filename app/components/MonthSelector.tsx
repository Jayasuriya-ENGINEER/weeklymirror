import React, { useRef, useEffect } from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

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

const ITEM_WIDTH = 82;

interface MonthSelectorProps {
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
}

export default function MonthSelector({
  selectedMonth,
  onSelectMonth,
}: MonthSelectorProps) {
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    listRef.current?.scrollToIndex({
      index: selectedMonth,
      animated: true,
      viewPosition: 0.5,
    });
  }, [selectedMonth]);

  return (
    <FlatList
      ref={listRef}
      horizontal
      data={MONTHS}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      contentContainerStyle={styles.container}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={[
            styles.monthButton,
            selectedMonth === index && styles.selectedMonth,
          ]}
          onPress={() => onSelectMonth(index)}
        >
          <Text
            style={[
              styles.monthText,
              selectedMonth === index && styles.selectedText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 120,
    paddingVertical: 10,
  },

  monthButton: {
    width: 72,
    marginHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
  },

  selectedMonth: {
    backgroundColor: "#EFE6DA",
  },

  monthText: {
    fontWeight: "600",
    color: "#666",
  },

  selectedText: {
    color: "#1F1F1F",
  },
});
