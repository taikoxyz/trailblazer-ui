export interface FactionBadgeButton {
  hidden?: boolean;
  disabled?: boolean;
  label: string;
  handler?: (badgeId: number) => void;
  type: 'primary' | 'secondary';
}
