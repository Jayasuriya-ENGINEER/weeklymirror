import React from "react";
import { View } from "react-native";

import EditionCover from "./EditionCover";
import DaySection from "./DaySection";
import { AIWeekEdition } from "@/type/aiEdition";

interface Props {
  edition: any;
  groupedMemories: Record<string, any[]>;
  aiEdition: AIWeekEdition | null;
}


export default function EditionReader({
  edition,
  groupedMemories,
  aiEdition,
}: Props) {
  if (!aiEdition) {
    return null;
  }

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

      {Object.entries(groupedMemories).map(([date, memories]) => {
        const aiDay = aiEdition.days.find((day) => day.date === date);

        return (
          <DaySection
            key={date}
            date={date}
            memories={memories}
            aiDay={aiDay}
          />
        );
      })}
    </View>
  );
}
