import { TaikoStatusModalType } from '../stores/TaikoStatusModalStore';

export interface TaikoStatusModalConfig {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  showStatusInfo: boolean;
  showBonusInfo: boolean;
}

export const TAIKO_STATUS_MODAL_CONFIGS: Record<TaikoStatusModalType, TaikoStatusModalConfig> = {
  [TaikoStatusModalType.NONE]: {
    title: '',
    description: '',
    buttonText: '',
    buttonHref: '',
    showStatusInfo: false,
    showBonusInfo: false,
  },
  [TaikoStatusModalType.CLAIM]: {
    title: "What's next?",
    description:
      'Holding TAIKO tokens boosts your Status. The more you hold, the more perks you unlock. Check your Taiko Status—you could be just steps away from a new level and unlocking fresh rewards and roles.',
    buttonText: 'Taiko Status',
    buttonHref: 'https://taiko.mirror.xyz/vXGo-HofGENNl3J9ObyGponpAoIqAtNyQG_cKKlHeC4',
    showStatusInfo: true,
    showBonusInfo: false,
  },
  [TaikoStatusModalType.BONUS]: {
    title: 'Gain weekly bonus points',
    description:
      'Holding TAIKO tokens boosts your Status. The more you hold, the more perks you unlock. Check your Taiko Status—you could be just steps away from a new level and unlocking fresh rewards and roles.',
    buttonText: 'Learn More ',
    buttonHref: 'https://taiko.mirror.xyz/',
    showStatusInfo: true,
    showBonusInfo: true,
  },
};
