export default function timeUntil(targetDate: Date): string {
  const now = new Date();

  // Calculate the difference in milliseconds
  const difference = targetDate.getTime() - now.getTime();

  // If the difference is negative, the target date is in the past
  if (difference <= 0) {
    return '00min 00s';
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
    return `${formattedHours}h ${formattedMinutes}min ${formattedSeconds}s`;
  } else if (minutes > 0) {
    return `${formattedMinutes}min ${formattedSeconds}s`;
  } else {
    return `${formattedSeconds} seconds`;
  }
}
