import { writable } from "svelte/store";

type ScreenMode = "desktop" | "mobile";

export const screenSize = writable<number>(0);
export const screen = writable<ScreenMode>("desktop");
