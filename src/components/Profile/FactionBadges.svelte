<script lang="ts">
  import { t } from 'svelte-i18n';
  import { type Address, getAddress, zeroAddress } from 'viem';

  import { page } from '$app/stores';
  import { ActionButton } from '$components/Button';
  import { FactionNames } from '$configs/badges';
  import getMovement from '$libs/badges/getMovement';
  import { getUserBadges } from '$libs/badges/getUserBadges';
  import { classNames } from '$libs/util/classNames';
  import getConnectedAddress from '$libs/util/getConnectedAddress';
  import { account } from '$stores/account';
  import { currentProfile } from '$stores/profile';

  import FactionBadgeItem from './FactionBadgeItem.svelte';
  import {default as MovementSelection} from './MovementSelection.modal.svelte';

  let factions = Object.keys(FactionNames).reverse() as FactionNames[];
  $: userFactions = {} as Record<FactionNames, boolean>;

  $: profile = $currentProfile;
  $: movement = -1;

  $: isSelfProfile = false;

  async function load() {
    const urlAddress = $page.url.pathname.split('/').pop();
    address = urlAddress as Address;
    movement = await getMovement(address);
    userFactions = await getUserBadges(address);
    isSelfProfile = getAddress(address) === getAddress(getConnectedAddress());
  }
  $: address = zeroAddress as Address;
  $: $account, load();
  $: profile, load();

  $: movementModalVisible = false;

  // CSS Classes
  const wrapperClasses = classNames(
    'flex',
    'justify-between',
    'items-center',
    'w-full',
    'border',
    'border-[#F997D0]',
    'border-[3px]',
    'rounded-[30px]',
    'p-6',
    'gap-6',
    'mb-6',
  );

  const iconClasses = classNames('w-[66px]', 'h-[66px]');
  const movementTextClasses = classNames('text-[26px]/[32px]', 'font-clash-grotesk', 'font-[500]', 'w-full');

  const buttonWrapperClasses = classNames('min-w-[250px]');
</script>

{#if isSelfProfile}
  <div class={wrapperClasses}>
    <img class={iconClasses} src="/factions/group.svg" alt="Group Icon" />

    <div class={movementTextClasses}>
      {$t('badges.movement.banner')}
    </div>

    <div class={buttonWrapperClasses}>
      <ActionButton priority="primary"
      on:click={() => movementModalVisible = true}
      >
        {$t('badges.movement.selectButton')}
      </ActionButton>
    </div>
  </div>
{/if}

<div class="box gap-4">
  {#each factions as faction}
    <FactionBadgeItem
      {address}
      {movement}
      canClick={isSelfProfile && !userFactions[faction]}
      name={faction}
      unlocked={userFactions[faction]} />
  {/each}
</div>

<style>
  /* 306px is the size of the card bg */
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(306px, 1fr));
    gap: 25px;
  }
</style>


<MovementSelection
bind:visible={movementModalVisible}
/>
