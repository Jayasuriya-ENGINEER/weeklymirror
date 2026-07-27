import React from "react";
import { View, Text, StyleSheet } from "react-native";

import EditionCover from "./EditionCover";
import EditionHeader from "./EditionHeader";
import DaySection from "./DaySection";
import EditionFooter from "./edition/EditionFooter";
import { AIWeekEdition } from "@/type/aiEdition";

interface Props {
  edition: any;
  groupedMemories: Record<string, any[]>;
  /** When null, renders the pre-AI newspaper layout from raw memories. */
  aiEdition: AIWeekEdition | null;
  isPreview?: boolean;
}

export default function EditionReader({
  edition,
  groupedMemories,
  aiEdition,
  isPreview = false,
}: Props) {
  const dates = Object.keys(groupedMemories).sort();

  // Pre-AI / in-progress newspaper: components built before AI generation
  if (!aiEdition) {
    return (
      <View>
        <EditionHeader
          issueNumber={edition.issue_number}
          startDate={edition.start_date}
          endDate={edition.end_date}
          capturedDays={edition.captured_days}
          isPreview={isPreview}
        />

        {dates.length === 0 ? (
          <Text style={styles.empty}>No memories captured for this week yet.</Text>
        ) : (
          dates.map((date) => (
            <DaySection
              key={date}
              date={date}
              memories={groupedMemories[date]}
            />
          ))
        )}

        <EditionFooter />
      </View>
    );
  }

  // AI-assisted cover + day sections (used if local AI payload is present)
  return (
    <View>
      <EditionCover
        issueNumber={edition.issue_number}
        startDate={edition.start_date}
        endDate={edition.end_date}
        capturedDays={edition.captured_days}
        title={aiEdition.weekTitle}
        summary={aiEdition.weekSummary}
        quote={aiEdition.quote}
        mood={aiEdition.mood}
      />

      {dates.map((date) => {
        const aiDay = aiEdition.days.find((day) => day.date === date);

        return (
          <DaySection
            key={date}
            date={date}
            memories={groupedMemories[date]}
            aiDay={aiDay}
          />
        );
      })}

      <EditionFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginVertical: 40,
    lineHeight: 24,
  },
});
