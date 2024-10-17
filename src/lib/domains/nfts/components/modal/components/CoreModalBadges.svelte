<script lang="ts">
  import { FACTIONS } from '$configs/badges';
  import { type Faction,MovementNames, Movements } from '$lib/domains/profile/types/types';
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
  export let pinkTampers: number = 0;
  export let purpleTampers: number = 0;
  export let badgeId: number;
  export let hideResult: boolean = false;
  $: badgeName = FACTIONS[badgeId] as Faction;
</script>

<div class={wrapperClasses}>
  {#if !hideResult}
    <div class={badgeWrapperClasses}>
      <MigrationBadgeItem blurred={!active} value={pinkTampers} badgeMovement={Movements.Based} {badgeId} {badgeName}>
        {MovementNames[Movements.Based]}
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
      <MigrationBadgeItem badgeMovement={Movements.Neutral} {badgeId} {badgeName}>
        {MovementNames[Movements.Neutral]}
      </MigrationBadgeItem>
    </div>
  {/if}
  {#if !hideResult}
    <div class={badgeWrapperClasses}>
      <MigrationBadgeItem
        blurred={!active}
        badgeMovement={Movements.Boosted}
        {badgeId}
        value={purpleTampers}
        {badgeName}>
        {MovementNames[Movements.Boosted]}
      </MigrationBadgeItem>
      <!--
    {#if tamperExpiration && new Date() > tamperExpiration}
      <button disabled={isTampering} on:click={() => activateTamper('purple')} class={purpleTamperButtonClasses}>
        Tamper</button>
    {/if}-->
    </div>
  {/if}
</div>
