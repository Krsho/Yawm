const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "Sunday, 1 November 2026" */
export function formatLongDate(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** "1 Nov 2026" */
export function formatShortDate(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)} ${date.getFullYear()}`;
}

/** "Yesterday" for the previous day, otherwise "Friday, 30 October". */
export function formatDayLabel(date: Date, today: Date = new Date()): string {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

/** Monday-to-Sunday dates of the week containing `date`. */
export function getWeekDays(date: Date = new Date()): Date[] {
  const monday = new Date(date);
  const offset = (date.getDay() + 6) % 7; // 0 when date is a Monday
  monday.setDate(date.getDate() - offset);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    return day;
  });
}

export function shortWeekday(date: Date): string {
  return WEEKDAYS[date.getDay()].slice(0, 3);
}
