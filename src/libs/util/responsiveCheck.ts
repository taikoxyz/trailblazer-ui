import { derived, writable } from 'svelte/store';

// Create writable stores for each media query
export const desktopQuery = window.matchMedia('(min-width: 1200px)');
export const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1199px)');
export const mobileQuery = window.matchMedia('(max-width: 767px)');

const isDesktopQuery = writable(desktopQuery.matches);
const isTabletQuery = writable(tabletQuery.matches);
const isMobileQuery = writable(mobileQuery.matches);

// Update the writable stores based on media query changes
export function updateMediaQueries() {
  isDesktopQuery.set(desktopQuery.matches);
  isTabletQuery.set(tabletQuery.matches);
  isMobileQuery.set(mobileQuery.matches);
}

export function mediaQueryHandler() {
  updateMediaQueries();
}

// Derived stores to compute the values based on media queries
export const isDesktop = derived(isDesktopQuery, ($isDesktopQuery) => $isDesktopQuery);
export const isTablet = derived(isTabletQuery, ($isTabletQuery) => $isTabletQuery);
export const isMobile = derived(isMobileQuery, ($isMobileQuery) => $isMobileQuery);
