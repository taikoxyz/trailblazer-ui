<script lang="ts">
  import { FACTIONS } from '$configs/badges';
  import { type Faction, MovementNames, Movements } from '$lib/domains/profile/types/types';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../../MigrationBadgeItem.svelte';

  const badgeWrapperClasses = classNames(
    'flex-col',
    'w-[250px]',
    'flex',
    'justify-center',
    'items-center',
    'gap-[25px]',
  );

  const centralBadgeWrapperClasses = classNames(badgeWrapperClasses, 'w-[300px]');
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
  export let devTampers: number = 0;
  export let whaleTampers: number = 0;
  export let minnowTampers: number = 0;
  export let badgeId: number;
  export let hideResult: boolean = false;
  $: badgeName = FACTIONS[badgeId] as Faction;
</script>

<div class={wrapperClasses}>
  {#if !hideResult}
    <div class={badgeWrapperClasses}>
      <MigrationBadgeItem blurred={!active} value={whaleTampers} badgeMovement={Movements.Whale} {badgeId} {badgeName}>
        {MovementNames[Movements.Whale]}
      </MigrationBadgeItem>
      <!--
    {#if tamperExpiration && new Date() > tamperExpiration}
      <button disabled={isTampering} on:click={() => activateTamper('pink')} class={pinkTamperButtonClasses}>
        Tamper</button>
    {/if}-->
    </div>
  {/if}
  {#if !active}
    <div class={centralBadgeWrapperClasses}>
      <MigrationBadgeItem badgeMovement={Movements.Dev} {badgeId} value={devTampers} {badgeName}>
        {MovementNames[Movements.Dev]}
      </MigrationBadgeItem>
    </div>
  {/if}
  {#if !hideResult}
    <div class={badgeWrapperClasses}>
      <MigrationBadgeItem
        blurred={!active}
        badgeMovement={Movements.Minnow}
        {badgeId}
        value={minnowTampers}
        {badgeName}>
        {MovementNames[Movements.Minnow]}
      </MigrationBadgeItem>
      <!--
    {#if tamperExpiration && new Date() > tamperExpiration}
      <button disabled={isTampering} on:click={() => activateTamper('purple')} class={purpleTamperButtonClasses}>
        Tamper</button>
    {/if}-->
    </div>
  {/if}
</div>
