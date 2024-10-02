import type { ActionButtonType } from '$components/Button/types';

export type IClaimPanelType = 'claim' | 'success' | 'error';
export interface IClaimAmount {
  value: number;
  label: string;
}
export interface IClaimButton {
  priority: ActionButtonType;
  label: string;
}
