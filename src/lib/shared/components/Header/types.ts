import type { IconType } from '$shared/components/Icon';

export type NavigationData = {
  url?: string;
  name: string;
  route?: string;
  icon?: IconType;
};
