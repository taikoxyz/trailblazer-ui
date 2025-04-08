export default function formatTaikoStatusPoints(points: number): string {
  const pointsString = points.toString();
  const formattedPoints = pointsString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedPoints;
}
