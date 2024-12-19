import type { ActionButtonType } from '$shared/components/Button/types';

export enum ClaimStates {
  START = 'START',
  CLAIM = 'CLAIM',
  INELIGIBLE = 'INELIGIBLE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface IClaimButton {
  priority: ActionButtonType;
  label: string;
  handler: () => void;
}

export interface AdditionalContent {
  type: 'component' | 'none';
  component?: string; // Name of the component to render, e.g., 'ClaimTerms'
}

export interface ClaimPanelType {
  title: string;
  text: string;
  state: ClaimStates;
  additionalContent: AdditionalContent | null;
  disableButtonCondition: (tokenAccepted: boolean, amount: number | null, isSuccessful: boolean) => boolean;
  buttons: IClaimButton[];
}
