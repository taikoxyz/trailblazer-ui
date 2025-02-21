export const thrillblazerEditionSeasonMapping: Record<number, number> = {
  1: 2, // Edition 1 uses Season 2
  2: 3, // Edition 2 uses Season 3
  3: 3, // Edition 3 uses Season 3
};

export const chillblazerEditionSeasonMapping: Record<number, number> = {
  1: 2, // Edition 1 uses Season 2
  2: 3, // Edition 2 uses Season 3
};

export const cexEditionSeasonMapping: Record<number, number> = {
  1: 3, // Edition 1 uses Season 3
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

export function getSeasonForCexEdition(edition: number): number {
  const season = cexEditionSeasonMapping[edition];
  if (season === undefined) {
    throw new Error(`No season mapping defined for edition ${edition}`);
  }
  return season;
}
