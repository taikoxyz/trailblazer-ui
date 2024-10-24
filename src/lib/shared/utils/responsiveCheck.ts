import { derived, writable } from 'svelte/store';

export let desktopQuery: MediaQueryList;
export let tabletQuery: MediaQueryList;
export let tabletLgQuery: MediaQueryList;
export let mobileQuery: MediaQueryList;

// Writable stores to track media query states
const isDesktopQuery = writable(true);
const isTabletQuery = writable(false);
const isTabletLgQuery = writable(false);
const isMobileQuery = writable(false);

// Function to update the writable stores based on media query changes
export function updateMediaQueries() {
  if (desktopQuery) {
    isDesktopQuery.set(desktopQuery.matches);
  }
  if (tabletLgQuery) {
    isTabletLgQuery.set(tabletLgQuery.matches);
  }
  if (tabletQuery) {
    isTabletQuery.set(tabletQuery.matches);
  }
  if (mobileQuery) {
    isMobileQuery.set(mobileQuery.matches);
  }
}

export function mediaQueryHandler() {
  updateMediaQueries();
}

// Derived stores to compute the values based on media queries
export const isDesktop = derived(isDesktopQuery, ($isDesktopQuery) => $isDesktopQuery);
export const isTablet = derived(isTabletQuery, ($isTabletQuery) => $isTabletQuery);
export const isTabletLg = derived(isTabletLgQuery, ($isTabletLgQuery) => $isTabletLgQuery);
export const isMobile = derived(isMobileQuery, ($isMobileQuery) => $isMobileQuery);

// Function to initialize media queries only on the client side
export function initializeMediaQueries() {
  if (typeof window !== 'undefined') {
    desktopQuery = window.matchMedia('(min-width: 1280px)');
    tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    tabletLgQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1279px)');
    mobileQuery = window.matchMedia('(max-width: 767px)');

    // Set initial values
    updateMediaQueries();

    // Listen for changes
    desktopQuery.addEventListener('change', updateMediaQueries);
    tabletQuery.addEventListener('change', updateMediaQueries);
    tabletLgQuery.addEventListener('change', updateMediaQueries);
    mobileQuery.addEventListener('change', updateMediaQueries);
  }
}
