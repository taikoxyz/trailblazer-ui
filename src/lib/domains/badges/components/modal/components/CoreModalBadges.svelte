<script lang="ts">
  import { MovementNames, Movements } from '$lib/domains/profile/types/types';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../../../../badges/components/MigrationBadgeItem.svelte';

  export let active: boolean;
  export let devTampers: number = 0;
  export let whaleTampers: number = 0;
  export let minnowTampers: number = 0;
  export let hideResult: boolean = false;

  export let token: NFT;

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
</script>

<div class={wrapperClasses}>
  {#if !hideResult}
    <div class={badgeWrapperClasses}>
      <MigrationBadgeItem token={{ ...token, movement: Movements.Whale }} blurred={!active} value={whaleTampers}>
        {MovementNames[Movements.Whale]}
      </MigrationBadgeItem>
    </div>
  {/if}
  {#if !active}
    <div class={centralBadgeWrapperClasses}>
      <MigrationBadgeItem token={{ ...token, movement: Movements.Dev }} value={devTampers}>
        {MovementNames[Movements.Dev]}
      </MigrationBadgeItem>
    </div>
  {/if}
  {#if !hideResult}
    <div class={badgeWrapperClasses}>
      <MigrationBadgeItem token={{ ...token, movement: Movements.Minnow }} blurred={!active} value={minnowTampers}>
        {MovementNames[Movements.Minnow]}
      </MigrationBadgeItem>
    </div>
  {/if}
</div>
