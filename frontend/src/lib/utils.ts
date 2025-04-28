import { format, differenceInHours, intervalToDuration } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes conditionally
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to locale date
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

/**
 * Format a time string (HH:MM:SS) to AM/PM format
 */
export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes} ${period}`;
};

/**
 * Format a combined date and time string to "MMM dd, yyyy HH:mm"
 */
export const formatDateTime = (dateStr: string, timeStr: string): string => {
  const date = new Date(`${dateStr.split('T')[0]}T${timeStr}`);
  return format(date, 'MMM dd, yyyy HH:mm');
};

/**
 * Calculate age from date of birth
 */
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Format ISO 8601 duration string to a short human-readable format
 * Example: "P6Y126DT20H4M58.917815S" -> "6y 126d 20h 4m"
 */
export const formatShortDuration = (durationString: string): string => {
  const regex = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?)?/;
  const matches = durationString.match(regex);

  if (!matches) return 'Invalid duration';

  const [_, years, months, days, hours, minutes] = matches;
  const parts: string[] = [];

  if (years) parts.push(`${years}y`);
  if (months) parts.push(`${months}m`);
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);

  return parts.join(' ') || '0m';
};

/**
 * Format how long ago a test was taken
 */
export const formatTimeSinceLastTest = (dateString: string): string => {
  if (!dateString) return 'N/A';

  const now = new Date();
  const lastTest = new Date(dateString);
  const hours = differenceInHours(now, lastTest);

  if (hours < 96) {
    return `${hours}h`;
  }

  const duration = intervalToDuration({ start: lastTest, end: now });
  const parts: string[] = [];

  if (duration.years) parts.push(`${duration.years}y`);
  if (duration.months) parts.push(`${duration.months}m`);
  if (duration.days) parts.push(`${duration.days}d`);

  return parts.join(' ') || '0d';
};
