import { get } from 'svelte/store';
import { t } from 'svelte-i18n';

import { PUBLIC_ACTIVE_SEASON } from '$env/static/public';

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
    text: get(t)('claim.panels.ineligible.text', {
      values: {
        seasonNumber: PUBLIC_ACTIVE_SEASON,
        blogUrl: 'https://taiko.mirror.xyz/naE5ZNssGzw_FVs_-r2Eqd3DquRkx1dQ5Cg5kUswwns',
      },
    }),
    state: ClaimStates.INELIGIBLE,
    additionalContent: null,
    disableButtonCondition: () => false,
    buttons: [],
  },
  [ClaimStates.CLAIM]: {
    title: get(t)('claim.panels.claim.title'),
    text: '',
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
  [ClaimStates.ERROR_CLAIM]: {
    title: get(t)('claim.panels.error_claim.title'),
    text: get(t)('claim.panels.error_claim.text'),
    state: ClaimStates.ERROR_CLAIM,
    additionalContent: null,
    disableButtonCondition: () => false,
    buttons: [
      {
        priority: 'secondary',
        label: get(t)('claim.panels.error_claim.button'),
        handler: () => {},
      },
    ],
  },
  [ClaimStates.ERROR_GENERIC]: {
    title: get(t)('claim.panels.error_generic.title'),
    text: get(t)('claim.panels.error_generic.text'),
    state: ClaimStates.ERROR_GENERIC,
    additionalContent: null,
    disableButtonCondition: () => false,
    buttons: [
      {
        priority: 'secondary',
        label: get(t)('claim.panels.error_generic.button'),
        handler: () => {},
      },
    ],
  },
  [ClaimStates.ERROR_TIMEOUT]: {
    title: get(t)('claim.panels.error_timeout.title'),
    text: get(t)('claim.panels.error_timeout.text'),
    state: ClaimStates.ERROR_TIMEOUT,
    additionalContent: null,
    disableButtonCondition: () => false,
    buttons: [],
  },
});
