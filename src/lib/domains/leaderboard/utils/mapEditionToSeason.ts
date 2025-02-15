export const thrillblazerEditionSeasonMapping: Record<number, number> = {
  1: 2, // Edition 1 uses Season 2
  2: 3, // Edition 2 uses Season 3
  3: 3, // Edition 3 uses Season 3
};

export function getSeasonForThrillblazerEdition(edition: number): number {
  const season = thrillblazerEditionSeasonMapping[edition];
  if (season === undefined) {
    throw new Error(`No season mapping defined for edition ${edition}`);
  }
  return season;
}
