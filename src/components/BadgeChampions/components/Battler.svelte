<script lang="ts">
  import { FactionBadgeItem } from '$components/Profile/UserNFTs';
  import { type FactionNames, FACTIONS } from '$configs/badges';
  import type { IBadgeChampionsParticipant } from '$libs/badge-champions/types';
  import { Movements } from '$libs/badges/const';
  import { classNames } from '$libs/util/classNames';

  const colorsToMovements: Record<string, Movements> = {
    neutral: Movements.Neutral,
    pink: Movements.Based,
    purple: Movements.Boosted,
  };

  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let battler: IBadgeChampionsParticipant;

  let name: FactionNames = FACTIONS[battler.badgeId] as FactionNames;
  let movement: Movements = colorsToMovements[battler.color];
  export let disabled: boolean = false;

  export let framed: boolean = false;

  const wrapperClasses = classNames(
    size === 'md' ? 'w-[300px] h-[150px]' : null,
    size === 'lg' ? 'w-[500px] h-[250px]' : null,
    'flex',
    'flex-row',
    'justify-evenly',
    'items-center',
    framed ? 'border border-[#444A55] bg-base-100' : null,
    'rounded-[30px]',
    size === 'md' ? 'text-[24px]/[36px]' : null,
    size === 'lg' ? 'text-[36px]/[48px]' : null,
  );

  const factionWrapperClasses = classNames('h-full', 'aspect-square');

  const statClasses = classNames('flex', 'flex-col', 'justify-evenly', 'items-center', 'h-full');

  $: valueClasses = classNames(
    'badge',
    'badge-lg',
    'badge-outline',
    size === 'md' ? 'text-[24px]/[36px]' : null,
    size === 'lg' ? 'text-[36px]/[48px]' : null,
    'max-h-auto',
    'h-auto',
    size === 'md' ? 'px-[10px]' : null,
    size === 'lg' ? 'px-[20px]' : null,
  );
</script>

<div class={wrapperClasses}>
  <div class={statClasses}>
    <div>⚔️</div>
    <div class={valueClasses}>{battler.power}</div>
  </div>
  <div class={factionWrapperClasses}>
    <FactionBadgeItem {disabled} showWeek={false} {name} {movement} />
  </div>

  <div class={statClasses}>
    <div>🧬</div>
    <div class={valueClasses}>{battler.tokenId}</div>
  </div>
</div>
