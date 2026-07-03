export const getEditionStatus = (
  status: string,
  endDate: string,
  capturedDays: number,
) => {
  if (status === "completed") return "completed";

  if (status === "generating") return "generating";

  if (status === "failed") return "failed";

  const today = new Date();

  const end = new Date(endDate);

  end.setHours(23, 59, 59, 999);

  if (today > end && capturedDays >= 3) {
    return "ready";
  }

  return "ready";
};
