import { get } from 'svelte/store';
import { t } from 'svelte-i18n';

import type { ClaimPanelType } from './types';
import { ClaimStates } from './types';

/**
 * Generates a mapping of claim panels keyed by their respective ClaimStates.
 *
 * @param get(t) - Translation function from svelte-i18n
 * @returns Record mapping each ClaimState to its corresponding ClaimPanelType
 */
export const getPanels = (): Record<ClaimStates, ClaimPanelType> => ({
  [ClaimStates.START]: {
    title: get(t)('claim.panels.start.title'),
    text: get(t)('claim.panels.start.text'),
    state: ClaimStates.START,
    additionalContent: null,
    disableButtonCondition: () => false,
    buttons: [
      {
        priority: 'primary',
        label: get(t)('claim.panels.start.button'),
        handler: () => {},
      },
    ],
  },
  [ClaimStates.INELIGIBLE]: {
    title: get(t)('claim.panels.ineligible.title'),
    text: get(t)('claim.panels.ineligible.text'),
    state: ClaimStates.INELIGIBLE,
    additionalContent: null,
    disableButtonCondition: () => false,
    buttons: [],
  },
  [ClaimStates.CLAIM]: {
    title: get(t)('claim.panels.claim.title'),
    text: get(t)('claim.panels.claim.text'),
    state: ClaimStates.CLAIM,
    additionalContent: {
      type: 'component',
      component: 'ClaimTerms',
    },
    disableButtonCondition: () => true,
    buttons: [
      {
        priority: 'primary',
        label: get(t)('claim.panels.claim.button'),
        handler: () => {},
      },
    ],
  },
  [ClaimStates.SUCCESS]: {
    title: get(t)('claim.panels.success.title'),
    text: get(t)('claim.panels.success.text'),
    state: ClaimStates.SUCCESS,
    additionalContent: null,
    disableButtonCondition: () => false,
    buttons: [
      {
        priority: 'secondary',
        label: get(t)('claim.panels.success.buttons.0'),
        handler: () => {},
      },
      {
        priority: 'tertiary',
        label: get(t)('claim.panels.success.buttons.1'),
        handler: () => {},
      },
    ],
  },
  [ClaimStates.ERROR]: {
    title: get(t)('claim.panels.error.title'),
    text: get(t)('claim.panels.error.text'),
    state: ClaimStates.ERROR,
    additionalContent: null,
    disableButtonCondition: () => false,
    buttons: [
      {
        priority: 'secondary',
        label: get(t)('claim.panels.error.button'),
        handler: () => {},
      },
    ],
  },
});
