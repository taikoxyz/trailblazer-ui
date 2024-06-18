export enum Movements {
  Neutral,
  Based,
  Boosted,
}

export const MovementNames: string[] = Object.keys(Movements).filter((key) => isNaN(Number(key)));
