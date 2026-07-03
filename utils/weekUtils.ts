export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
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