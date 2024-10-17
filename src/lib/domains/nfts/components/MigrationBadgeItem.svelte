<script lang="ts">
  import { FACTIONS } from '$configs/badges';
  import { FactionImage } from '$lib/domains/profile/components/ProfileNFTs';
  import { Movements } from '$libs/badges/const';
  import type { Faction } from '$libs/profile';
  import { classNames } from '$libs/util/classNames';

  import TamperRings from './TamperRings.svelte';

  export let badgeId: number;
  export let badgeName: Faction;
  export let badgeMovement: Movements;
  export let blurred: boolean = false;
  export let value: number = 0;
  export let shadow: boolean = false;

  // tmp refactor fix

  $: unlocked = !blurred;
  $: wrapperClasses = classNames(
    'bg-white',
    'p-[8px]',
    // badgeMovement === Movements.Neutral ? 'w-[300px]' : 'w-[250px]',
    'w-full',
    'relative',
    'border',
    'border-white',
    'gap-[23px]',
    'border-[3px]',
    'md:rounded-[30px]',
    'rounded-[15px]',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'pb-0',
    'transition-all',
    shadow && badgeMovement === Movements.Based ? 'border-secondary  shadow-[0_0px_50px_0px_#E81899]' : null,
    shadow && badgeMovement === Movements.Boosted ? 'border-[#5D08C8] shadow-[0_0px_50px_0px_#5D08C8]' : null,
    shadow && badgeMovement === Movements.Neutral ? 'border-[white] shadow-[0_0px_50px_0px_white]' : null,

    /*
    badgeMovement === Movements.Based ?
    'border-secondary hover:shadow hover:shadow-[0_0px_50px_0px_#E81899]' : null,
    badgeMovement === Movements.Boosted ? 'border-[#5D08C8]
    hover:shadow hover:shadow-[0_0px_50px_0px_#5D08C8]' : null,*/
  );

  const imageWrapperClasses = classNames(
    'w-full',
    'rounded-[15px]',
    'md:rounded-[30px]',
    'overflow-hidden',
    'flex',
    'flex-row',
    'relative',
  );

  const badgeTextClasses = classNames(
    'w-full',
    'text-elevated-background',
    'md:text-[26px]/[32px]',
    'sm:text-[20px]/[26px]',
    'font-[500]',
    'font-clash-grotesk',
    'text-center',
    'pb-[22px]',
    'flex',
    'justify-center',
    'items-center',
  );
  $: badgeName = FACTIONS[badgeId] as Faction;

  const lockImageOverlayClasses = classNames('absolute', 'w-full', 'h-full', 'glassy-background');
</script>

<div class={wrapperClasses}>
  <div class={imageWrapperClasses}>
    <FactionImage movement={badgeMovement} type={badgeName} />
    {#if !unlocked}
      <div class={lockImageOverlayClasses}></div>{/if}
  </div>
  <div class={badgeTextClasses}>
    <slot />
  </div>

  {#if badgeMovement !== Movements.Neutral}
    <TamperRings {value} color={badgeMovement === Movements.Based ? 'pink' : 'purple'} />
  {/if}
</div>
