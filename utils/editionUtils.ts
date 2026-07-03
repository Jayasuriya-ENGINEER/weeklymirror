const getWeekNumber = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), 0, 1);

  const days = Math.floor((date.getTime() - firstDay.getTime()) / 86400000) + 1;

  return Math.ceil(days / 7);
};

