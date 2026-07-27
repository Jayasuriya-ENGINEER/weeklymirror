export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

/** Parse YYYY-MM-DD as a local calendar date (avoids UTC shift from Date.parse). */
export const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getWeekStart = (date: Date) => {
  const monday = new Date(date);

  const day = monday.getDay();

  const offset = day === 0 ? -6 : 1 - day;

  monday.setDate(monday.getDate() + offset);

  monday.setHours(0, 0, 0, 0);

  return monday;
};

export const getWeekEnd = (date: Date) => {
  const sunday = new Date(getWeekStart(date));

  sunday.setDate(sunday.getDate() + 6);

  return sunday;
};

export const getWeekNumber = (date: Date) => {
  const monday = getWeekStart(date);

  const firstMonday = getWeekStart(new Date(date.getFullYear(), 0, 1));

  const diff = monday.getTime() - firstMonday.getTime();

  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) + 1;
};

export const getWeekKey = (date: Date) => {
  return `${date.getFullYear()}-W${getWeekNumber(date)}`;
};

/**
 * Month/year used to file a weekly edition in the Rack.
 * Uses the month that contains the majority of the week's days so a week that
 * starts in July and ends in August still appears under July (current month).
 */
export const getDisplayMonthYear = (weekStart: Date, weekEnd: Date) => {
  const counts = new Map<string, number>();
  const cursor = new Date(weekStart);

  while (cursor.getTime() <= weekEnd.getTime()) {
    const key = `${cursor.getFullYear()}-${cursor.getMonth() + 1}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
    cursor.setDate(cursor.getDate() + 1);
  }

  let bestKey = `${weekStart.getFullYear()}-${weekStart.getMonth() + 1}`;
  let bestCount = 0;

  for (const [key, count] of counts) {
    if (count > bestCount) {
      bestKey = key;
      bestCount = count;
    }
  }

  const [year, month] = bestKey.split("-").map(Number);

  return {
    display_month: month,
    display_year: year,
  };
};