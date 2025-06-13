export const thrillblazerEditionSeasonMapping: Record<number, number> = {
  1: 2, // Edition 1 uses Season 2
  2: 3, // Edition 2 uses Season 3
  3: 3, // Edition 3 uses Season 3
  4: 4, // Edition 4 uses Season 4
  5: 4, // Edition 5 uses Season 4
  6: 4, // Edition 6 uses Season 4
  7: 5, // Edition 7 uses Season 5
};

export const chillblazerEditionSeasonMapping: Record<number, number> = {
  1: 2, // Edition 1 uses Season 2
  2: 3, // Edition 2 uses Season 3
};

export const liquidityEditionSeasonMapping: Record<number, number> = {
  1: 2, // Edition 1 uses Season 2
  2: 3, // Edition 2 uses Season 3
  3: 4, // Edition 3 uses Season 4
  4: 5, // Edition 4 uses Season 5
};

export function getSeasonForThrillblazerEdition(edition: number): number {
  const season = thrillblazerEditionSeasonMapping[edition];
  if (season === undefined) {
    throw new Error(`No season mapping defined for edition ${edition}`);
  }
  return season;
}

export function getSeasonForChillblazerEdition(edition: number): number {
  const season = chillblazerEditionSeasonMapping[edition];
  if (season === undefined) {
    throw new Error(`No season mapping defined for edition ${edition}`);
  }
  return season;
}

export function getSeasonForLiquidityEdition(edition: number): number {
  const season = liquidityEditionSeasonMapping[edition];
  if (season === undefined) {
    throw new Error(`No season mapping defined for edition ${edition}`);
  }
  return season;
}
