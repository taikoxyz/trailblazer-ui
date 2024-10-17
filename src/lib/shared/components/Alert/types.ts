import type { IconType } from '$shared/components/Icon';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

export type AlertIconDetails = {
  iconType: IconType;
  iconFillClass: string;
};
