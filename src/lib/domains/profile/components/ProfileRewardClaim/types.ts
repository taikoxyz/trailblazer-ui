import type { ActionButtonType } from '$shared/components/Button/types';

export type IClaimPanelType = 'claim' | 'prepare' | 'success' | 'error';
export interface IClaimAmount {
  value: number;
  label: string;
}
export interface IClaimButton {
  priority: ActionButtonType;
  label: string;
  handler: () => void;
}
