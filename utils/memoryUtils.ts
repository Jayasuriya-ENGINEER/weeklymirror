export const groupMemoriesByDate = (memories: any[]) => {
  const grouped: Record<string, any[]> = {};

  memories.forEach((memory) => {
    const date = memory.memory_date;

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(memory);
  });

  return grouped;
};
