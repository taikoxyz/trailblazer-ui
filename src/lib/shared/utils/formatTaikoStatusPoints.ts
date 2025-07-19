export default function formatTaikoStatusPoints(points: number): string {
  // Round to 2 decimal places
  const roundedPoints = Math.round(points * 100) / 100;
  const pointsString = roundedPoints.toString();

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = pointsString.split('.');

  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return with or without decimal part
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
