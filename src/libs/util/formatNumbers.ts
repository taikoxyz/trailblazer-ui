/**
 * Adds dots to a number for better readability and replaces the decimal point with a comma if present.
 * Example: 100000 -> 100,000, 1000000 -> 1,000,000, 1236285.9 -> 1,236,285.9
 *
 * @param num - The number to be formatted
 * @returns The formatted string with dots and a comma for the decimal part
 */
export function formatNumbers(num: number): string {
  const [integerPart, decimalPart] = num.toString().split('.');

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decimalPart !== undefined) {
    return `${formattedIntegerPart}.${decimalPart}`;
  }

  return formattedIntegerPart;
}
