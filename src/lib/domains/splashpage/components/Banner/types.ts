import type { SvelteComponent } from 'svelte';

export interface Slide {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: typeof SvelteComponent<any>;
  url?: string;
}
