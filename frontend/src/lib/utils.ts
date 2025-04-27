import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

export const formatDateTime = (date: string, time: string) => {
  return `${formatDate(date)} ${time}`
}

export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust age if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Format a time string (HH:MM:SS) to a more readable format
 */
export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  
  return `${displayHour}:${minutes} ${period}`;
};

/**
 * Format ISO 8601 duration string to a human-readable format
 * Example: "P6Y126DT20H4M58.917815S" -> "6 years, 126 days, 20 hours, 4 minutes"
 */
export const formatDuration = (durationString: string): string => {
  // Parse ISO 8601 duration
  const regex = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:([\d.]+)S)?)?/;
  const matches = durationString.match(regex);
  
  if (!matches) return 'Invalid duration';
  
  const [_, years, months, days, hours, minutes, seconds] = matches;
  
  const parts: string[] = [];
  
  if (years) parts.push(`${years} ${parseInt(years, 10) === 1 ? 'year' : 'years'}`);
  if (months) parts.push(`${months} ${parseInt(months, 10) === 1 ? 'month' : 'months'}`);
  if (days) parts.push(`${days} ${parseInt(days, 10) === 1 ? 'day' : 'days'}`);
  if (hours) parts.push(`${hours} ${parseInt(hours, 10) === 1 ? 'hour' : 'hours'}`);
  if (minutes) parts.push(`${minutes} ${parseInt(minutes, 10) === 1 ? 'minute' : 'minutes'}`);
  
  return parts.join(', ');
};
