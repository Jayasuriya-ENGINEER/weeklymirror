export const moodCover = (mood?: string) => {
  switch ((mood || "").toLowerCase()) {
    case "focused":
      return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200";

    case "happy":
      return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200";

    case "calm":
      return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200";

    case "hopeful":
      return "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200";

    default:
      return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200";
  }
};
