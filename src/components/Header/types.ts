import type { IconType } from '$components/Icon';

export type NavigationData = {
  url?: string;
  name: string;
  route?: string;
  icon?: IconType;
};
