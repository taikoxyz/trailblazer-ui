/**
 * Converts a Unix timestamp to a localized date and time string.
 *
 * @param timestamp - The Unix timestamp (in seconds) to be formatted
 * @returns A string representation of the date and time in the local format
 */
export function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString();
}
