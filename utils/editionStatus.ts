export const getEditionStatus = (
  status: string,
  endDate: string,
  capturedDays: number,
) => {
  // Database-controlled states
  if (status === "completed") return "completed";

  if (status === "generating") return "generating";

  if (status === "failed") return "failed";

  const today = new Date();

  const end = new Date(endDate);

  end.setHours(23, 59, 59, 999);

  const weekEnded = today > end;

  // Week is still active
  if (!weekEnded) {
    return capturedDays === 0 ? "waiting" : "draft";
  }

  // Week ended with no memories
  if (capturedDays === 0) {
    return "empty";
  }

  // Week ended with at least one captured day
  return "ready";
};
