<script lang="ts">
  import { FACTIONS } from '$configs/badges';
  import type { Faction } from '$lib/domains/profile/types/types';
  import { Movements } from '$libs/badges/const';
  import { classNames } from '$libs/util/classNames';

  import MigrationBadgeItem from '../../MigrationBadgeItem.svelte';

  const badgeWrapperClasses = classNames('flex-col', 'flex', 'justify-center', 'items-center', 'gap-[25px]');
  const wrapperClasses = classNames(
    'relative',
    'w-full',
    'flex',
    'flex-row',
    'justify-center',
    'items-center',
    'gap-[40px]',
  );
  export let active: boolean;
  export let pinkTampers: number = 0;
  export let purpleTampers: number = 0;
  export let badgeId: number;

  $: badgeName = FACTIONS[badgeId] as Faction;
</script>

<div class={wrapperClasses}>
  <div class={badgeWrapperClasses}>
    <MigrationBadgeItem unlocked={active} value={pinkTampers} badgeMovement={Movements.Based} {badgeId} {badgeName} />
    <!--
    {#if tamperExpiration && new Date() > tamperExpiration}
      <button disabled={isTampering} on:click={() => activateTamper('pink')} class={pinkTamperButtonClasses}>
        Tamper</button>
    {/if}-->
  </div>
  {#if !active}
    <MigrationBadgeItem unlocked badgeMovement={Movements.Neutral} {badgeId} {badgeName} />
  {/if}

  <div class={badgeWrapperClasses}>
    <MigrationBadgeItem
      unlocked={active}
      badgeMovement={Movements.Boosted}
      {badgeId}
      value={purpleTampers}
      {badgeName} />
    <!--
    {#if tamperExpiration && new Date() > tamperExpiration}
      <button disabled={isTampering} on:click={() => activateTamper('purple')} class={purpleTamperButtonClasses}>
        Tamper</button>
    {/if}-->
  </div>
</div>
