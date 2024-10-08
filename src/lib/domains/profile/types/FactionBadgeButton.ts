export interface FactionBadgeButton {
    label: string
    handler?: (badgeId: number) => void
  type: 'primary' | 'secondary',
}
