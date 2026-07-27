import { parseLocalDate } from "./weekUtils";

/** Minimum captured days required before AI publish is offered. */
export const AI_PUBLISH_MIN_DAYS = 3;

export type EditionDisplayStatus =
  | "waiting"
  | "draft"
  | "simple"
  | "ready"
  | "empty"
  | "generating"
  | "completed"
  | "failed";

/**
 * Resolves what the Rack card should show.
 *
 * Rules:
 * - Week still open + any captures → draft (newspaper preview)
 * - Week ended + 0 days → empty
 * - Week ended + 1–2 days → simple (newspaper only, no AI)
 * - Week ended + ≥3 days → ready (AI publish)
 * - DB statuses completed / generating / failed win when set
 */
export const getEditionStatus = (
  status: string,
  endDate: string,
  capturedDays: number,
): EditionDisplayStatus => {
  if (status === "completed") return "completed";
  if (status === "generating") return "generating";
  if (status === "failed") return "failed";

  const today = new Date();
  const end = parseLocalDate(endDate);
  end.setHours(23, 59, 59, 999);

  const weekEnded = today > end;

  if (!weekEnded) {
    return capturedDays === 0 ? "waiting" : "draft";
  }

  if (capturedDays === 0) {
    return "empty";
  }

  if (capturedDays >= AI_PUBLISH_MIN_DAYS) {
    return "ready";
  }

  return "simple";
};

/** Whether this edition should open the AI-generated reader. */
export const isAiEdition = (status: string) => status === "completed";

/** Whether the user can open the newspaper-style memory view. */
export const canViewNewspaper = (displayStatus: EditionDisplayStatus) =>
  displayStatus === "draft" ||
  displayStatus === "simple" ||
  displayStatus === "completed" ||
  displayStatus === "ready";
