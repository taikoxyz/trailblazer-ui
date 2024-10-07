<script lang="ts">
  import { onMount } from 'svelte';

  import { ActionButton } from '$components/Button';
  import { errorToast, successToast } from '$components/NotificationToast';
  import { FactionNames, FACTIONS } from '$configs/badges';
  import { trailblazersBadgesAddress } from '$generated/abi';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { userProfile } from '$lib/domains/profile/stores';
  import type { NFT } from '$lib/shared/types/NFT';
  import { chainId } from '$lib/shared/utils/chain';
  import { Movements } from '$libs/badges/const';
  import updateMigrationStatus from '$libs/badges/migration/updateMigrationStatus';
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
    'pb-[30px]',
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

  const approvalInfoWrapperClasses = classNames(
    'border-l-[6px]',
    'pl-[16px]',
    'border-primary',
    'text-[#ADB1B8]',
    'w-full',
    'flex',
    'flex-col',
    'justify-center',
    'items-start',
    'font-[500]',
    'relative',
    'lg:pr-[40%]',
    'mb-[50px]',
  );
  const approvalInfoTitleClasses = classNames(
    'mb-[12px]',

    'text-[#F3F3F3]',
    'text-[26px]/[26px]',
    'font-clash-grotesk',
  );
  const approvalButtonWrapperClasses = classNames(
    'mt-[20px]',
    'w-full',
    'lg:w-max',
    'lg:mt-0',
    'lg:absolute',
    'right-0',
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

    await profileService.startMigration(badgeId);
    await updateMigrationStatus($account.address);
    /*
    if (!$account || !$account.address) return;
    const isApproved = await isApprovedToMigrate($account.address, badgeId);

    if (!isApproved) {
      $badgeMigrationStore.s1BadgeId = badgeId;
      $migrationApprovalModal = true;
      return;
    }
    await startMigration($account.address, badgeId);
    await updateMigrationStatus($account.address);*/
  }

  async function setApprovalForAll() {
    try {
      if (!$account || !$account.address) return;
      await profileService.setApprovalForAll($account.address);

      successToast({
        title: 'Success',
        message: 'Approved all tokens',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error('approve all error', e);
      errorToast({
        title: 'Error',
        message: e.message,
      });
    }
  }

  async function openApprovalModal(badgeId: number) {
    $badgeMigrationStore.s1BadgeId = badgeId;
    $migrationApprovalModal = true;
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

    {#if $userProfile?.approvedMigrationBadgeIds?.length !== 8}
      <div class={approvalInfoWrapperClasses}>
        <div class={approvalInfoTitleClasses}>Streamline your badge upgrades</div>
        Approve all badges in your collection with one click, or manage them individually for a customized Season 2 experience.
        Once the contract is approved, you can seamlessly migrate your badges.

        <div class={approvalButtonWrapperClasses}>
          <ActionButton on:click={setApprovalForAll} priority="primary">Approve all badges</ActionButton>
        </div>
      </div>
    {/if}
    <div class={boxClasses}>
      {#if enabledBadgeIds.length}
        <div class={nftGridClasses}>
          {#each enabledBadgeIds as badgeId}
            {@const factionName = getAsFactionName(FACTIONS[badgeId])}
            {@const disabled = !possibleMigrations.includes(badgeId)}
            <FactionBadgeItem {disabled} movement={Movements.Neutral} name={factionName}>
              {#if !displayActiveMigration}
                <div class={migrateButtonWrapperClasses}>
                  {JSON.stringify($userProfile?.approvedMigrationBadgeIds)}
                  {#if disabled}
                    <ActionButton disabled priority="primary">Not eligible</ActionButton>
                  {:else if $userProfile?.approvedMigrationBadgeIds?.includes(badgeId)}
                    <ActionButton {disabled} on:click={() => handleStartMigration(badgeId)} priority="primary">
                      Start Migration
                    </ActionButton>
                  {:else}
                    <ActionButton {disabled} on:click={() => openApprovalModal(badgeId)} priority="primary">
                      Approve contract
                    </ActionButton>
                  {/if}
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
