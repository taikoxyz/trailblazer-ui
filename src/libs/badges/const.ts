export enum Movements {
  Neutral, // Devs
  Based, // Whales
  Boosted, // Minnows
}

export const MovementNames: string[] = Object.keys(Movements).filter((key) => isNaN(Number(key)));
