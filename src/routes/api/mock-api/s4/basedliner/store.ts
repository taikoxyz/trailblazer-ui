import { writable } from 'svelte/store';

export const MockBasedlinerStore = writable<
  Record<
    string,
    {
      rank: number;
      address: string;
      ['phase-1']: number | null;
      ['phase-2']: number | null;
      total: number | null;
    }
  >
>({});
