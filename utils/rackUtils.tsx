export function isFutureMonth(month: number, year: number) {
  const today = new Date();

  if (year > today.getFullYear()) return true;

  if (year === today.getFullYear() && month > today.getMonth()) {
    return true;
  }

  return false;
}
