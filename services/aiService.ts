import { AIWeekEdition } from "../type/aiEdition";
//as of now this AIWekkdition contains the parsing details;

export const generateEditionAI = async (edition: any,
    groupedMemories: Record<string, any[]>) => {



        const days = Object.entries(groupedMemories).map(
          ([date, memories], index) => {
            const firstMemory = memories[0];

            return {
              date,

              title: `Day ${index + 1}`,

              summary: firstMemory?.content.substring(0, 90) + "...",

              keywords: [],
            };
          },
        );

        const dayCount = Object.keys(groupedMemories).length;

        const weekTitle = `${dayCount} Days Worth Remembering`;

        let mood: AIWeekEdition["mood"] = "Growth";

        if (dayCount <= 2) {
          mood = "Reflection";
        } else if (dayCount >= 5) {
          mood = "Adventure";
        }

  return {
    weekTitle: weekTitle,

    weekSummary:
      "This week marked an important milestone in building WeeklyMirror. Core features including the edition engine, rack view, and newspaper reader were completed, transforming scattered memories into a readable weekly publication.",

    mood: mood,

    quote: "Great products are built one careful step at a time.",

    reflection:
      "Looking back, consistency mattered more than speed. Every completed feature became another brick in the foundation of WeeklyMirror.",

   days: days,
  };
};
