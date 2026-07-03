export const calculateCurrentStreak = (dates: string[]) => {
  const uniqueDates = [...new Set(dates)].sort().reverse();

  if (uniqueDates.length === 0) {
    return 0;
  }

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`;

  const today = new Date();

  const todayString = formatDate(today);

  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  const yesterdayString = formatDate(yesterday);

  let startDate: Date;

  if (uniqueDates.includes(todayString)) {
    startDate = today;
  } else if (uniqueDates.includes(yesterdayString)) {
    startDate = yesterday;
  } else {
    return 0;
  }

  let streak = 0;

  let currentDate = new Date(startDate);

  while (true) {
    const dateString = formatDate(currentDate);

    if (uniqueDates.includes(dateString)) {
      streak++;

      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export const calculateLongestStreak = (dates: string[]) => {
  const uniqueDates = [...new Set(dates)].sort();

  if (uniqueDates.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);

    const curr = new Date(uniqueDates[i]);

    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
};
