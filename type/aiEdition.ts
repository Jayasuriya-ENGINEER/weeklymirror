export interface AIWeekEdition {
  weekTitle: string;
  weekSummary: string;
  mood: MoodTag;
  quote: string;
  reflection: string;
  days: AIDayArticle[];
}

export interface AIDayArticle {
  date: string;
  title: string;
  summary: string;
  keywords: string[];
}

export type MoodTag =
  | "Growth"
  | "Calm"
  | "Joy"
  | "Adventure"
  | "Reflection"
  | "Grateful"
  | "Creative"
  | "Busy"
  | "Hopeful"
  | "Challenging";
