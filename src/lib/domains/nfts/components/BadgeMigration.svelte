<script lang="ts">
  import { onMount } from 'svelte';

  import { ActionButton } from '$components/Button';
  import { FactionNames, FACTIONS } from '$configs/badges';
  import { trailblazersBadgesAddress } from '$generated/abi';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { userProfile } from '$lib/domains/profile/stores';
  import type { NFT } from '$lib/shared/types/NFT';
  import { chainId } from '$lib/shared/utils/chain';
  import { Movements } from '$libs/badges/const';
  import isApprovedToMigrate from '$libs/badges/isApprovedToMigrate';
  import updateMigrationStatus from '$libs/badges/migration/updateMigrationStatus';
  import startMigration from '$libs/badges/startMigration';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';
  import { badgeMigrationStore } from '$stores/badgeMigration';
  import { migrationApprovalModal } from '$stores/modal';

  import { FactionBadgeItem } from '../../profile/components/ProfileNFTs/FactionBadges';

  export let title: string = 'Badge Migration';

  const containerClass = classNames(
    'container',
    'w-full',
    'bg-elevated-background',
    'xl:max-w-[1344px]',
    'sm:rounded-b-[30px]',
    'rounded-t-[30px]',
    'md:rounded-tl-none',
    'rounded-[30px]',
    'relative',
  );

  const rowClass = classNames(
    'relative',
    'grid',
    'items-center',
    'gap-x-[26px]',
    'px-[16px]',
    'pt-[34px]',
    'md:px-[47px]',
    'body-bold',
    'text-sm',
  );
  const boxClasses = classNames('w-full');
  const nftGridClasses = classNames(
    'grid',
    'items-center',
    'place-content-center',
    'justify-items-center',
    'grid-cols-[repeat(auto-fill,_minmax(277px,_1fr))]',
    'gap-[24px]',
  );

  const titleClasses = classNames('text-grey-200', 'text-[16px]/[24px]');
  const dividerClasses = classNames('divider', 'mt-[18px]', 'mb-[30px]', 'p-0');

  const migrateButtonWrapperClasses = classNames('absolute', 'bottom-[10px]', 'w-full', 'px-[10px]');
  const infoTextClasses = classNames(
    'w-full',
    'text-center',
    'justify-center',
    'text-secondary-content',
    'flex',
    'h-[70px]',
  );

  $: enabledBadgeIds = [] as number[];

  $: displayActiveMigration = false;

  $: userBadges = [] as NFT[];

  // overlap between enabledBadgeIds and userBadges
  $: possibleMigrations = enabledBadgeIds.filter((badgeId) => userBadges.some((nft) => nft.badgeId === badgeId));

  onMount(async () => {
    const allNFTS = $userProfile.nfts || [];
    userBadges = allNFTS.filter(
      (nft) => nft.address.toLowerCase() === trailblazersBadgesAddress[chainId].toLowerCase(),
    );
    // enabledBadgeIds = await getEnabledMigrationIds();

    enabledBadgeIds = await profileService.getEnabledMigrations();

    // TODO: TEMPORARY
    // slice the nfts, only leave the first
    // userBadges = userBadges.slice(0, 2);
    // enabledBadgeIds = [1, 2, 3, 4];
    // END TEMPORARY

    if (!$account || !$account.address) {
      return;
    }
    const address = $account.address;
    await updateMigrationStatus(address);

    displayActiveMigration = $badgeMigrationStore.s1BadgeId > 0;
  });

  function getAsFactionName(name: string) {
    return name as FactionNames;
  }

  async function handleStartMigration(badgeId: number) {
    if (!$account || !$account.address) return;
    const isApproved = await isApprovedToMigrate($account.address, badgeId);

    if (!isApproved) {
      $badgeMigrationStore.s1BadgeId = badgeId;
      $migrationApprovalModal = true;
      return;
    }
    await startMigration($account.address, badgeId);
    await updateMigrationStatus($account.address);
  }
</script>

<div class={containerClass}>
  <div class={rowClass}>
    {#if displayActiveMigration}
      <div class="">Active Migration</div>
      {JSON.stringify($badgeMigrationStore, null, 2)}
    {/if}
    <div class={titleClasses}>{title}</div>
    <div class={dividerClasses} />
    <div class={boxClasses}>
      {#if enabledBadgeIds.length}
        <div class={nftGridClasses}>
          {#each enabledBadgeIds as badgeId}
            {@const factionName = getAsFactionName(FACTIONS[badgeId])}
            {@const disabled = !possibleMigrations.includes(badgeId)}
            <FactionBadgeItem {disabled} movement={Movements.Neutral} name={factionName}>
              {#if !displayActiveMigration}
                <div class={migrateButtonWrapperClasses}>
                  <ActionButton {disabled} on:click={() => handleStartMigration(badgeId)} priority="primary">
                    Start Migration
                  </ActionButton>
                </div>{/if}
            </FactionBadgeItem>
          {/each}
        </div>
      {:else}
        <div class={infoTextClasses}>
          <p>No migrations are currently enabled. Stay tuned!</p>
        </div>
      {/if}
    </div>
  </div>
</div>
