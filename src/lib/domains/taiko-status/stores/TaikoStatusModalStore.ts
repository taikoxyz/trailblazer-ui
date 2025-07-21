import { writable } from 'svelte/store';

export enum TaikoStatusModalType {
  NONE = 'none',
  CLAIM = 'claim',
  BONUS = 'bonus',
}

export interface TaikoStatusModalState {
  type: TaikoStatusModalType;
  isOpen: boolean;
}

export const TaikoStatusModalStore = writable<TaikoStatusModalState>({
  type: TaikoStatusModalType.NONE,
  isOpen: false,
});

export function openTaikoStatusBonusModal() {
  TaikoStatusModalStore.set({ type: TaikoStatusModalType.BONUS, isOpen: true });
}

export function closeTaikoStatusModal() {
  TaikoStatusModalStore.set({ type: TaikoStatusModalType.NONE, isOpen: false });
}

// Legacy stores for backwards compatibility (deprecated)
export const TaikoStatusClaimModalStore = writable<boolean>(false);
export const TaikoStatusBonusModalStore = writable<boolean>(false);
