import { DateTimeFormatOptions } from "luxon";

export const fullDateFormat = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as DateTimeFormatOptions

export const isSameDay = (timestamp1: string, timestamp2: string): boolean => {
  const date1 = new Date(Number(timestamp1));
  const date2 = new Date(Number(timestamp2));
  return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
  );
}

export const getLocalDate = (timestamp: string): string => {
  return new Date(Number(timestamp) + 1000).toLocaleDateString()
}