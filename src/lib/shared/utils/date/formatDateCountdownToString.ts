import { get } from 'svelte/store';
import { t } from 'svelte-i18n';

export default function formatDateCountdownToString(targetDate: Date): string {
  const now = new Date();

  const translation = get(t);
  const hoursLabel = translation('date.labels.hours');
  const minutesLabel = translation('date.labels.minutes');
  const secondsLabel = translation('date.labels.seconds');

  // Calculate the difference in milliseconds
  const difference = targetDate.getTime() - now.getTime();

  // If the difference is negative, the target date is in the past
  if (difference <= 0) {
    return `00${minutesLabel} 00${secondsLabel}`;
  }

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Format minutes and seconds to mm:ss
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // Return the appropriate format based on the values of hours and minutes
  if (hours > 0) {
    const formattedHours = String(hours).padStart(2, '0');
    return [
      `${formattedHours}${hoursLabel}`,
      `${formattedMinutes}${minutesLabel}`,
      `${formattedSeconds}${secondsLabel}`,
    ].join(' ');
  } else if (minutes > 0) {
    return [`${formattedMinutes}${minutesLabel}`, `${formattedSeconds}${secondsLabel}`].join(' ');
  } else {
    return `${formattedSeconds}${secondsLabel}`;
  }
}
