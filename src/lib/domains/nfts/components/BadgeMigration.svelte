<script lang="ts">
  import { onMount } from 'svelte';

  import { FactionNames, FACTIONS } from '$configs/badges';
  import { trailblazersBadgesAddress } from '$generated/abi';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { userProfile } from '$lib/domains/profile/stores';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { Movements } from '$lib/domains/profile/types/types';
  import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
  import type { NFT } from '$lib/shared/types/NFT';
  import { chainId } from '$lib/shared/utils/chain';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { badgeMigrationStore } from '$shared/stores/badgeMigration';
  import {
    endMigrationModal,
    migrationApprovalModal,
    startMigrationModal,
    tamperMigrationModal,
  } from '$shared/stores/modal';
 // import updateMigrationStatus from '$shared/utils/badges/migration/updateMigrationStatus';
  import { classNames } from '$shared/utils/classNames';

  import { FactionBadgeItem } from '../../profile/components/ProfileNFTs/FactionBadges';
  import Countdown from './Countdown.svelte';

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

  const timeOverlayBaseClasses = classNames(
    'w-full',
    'h-full',
    'absolute',
    'rounded-[30px]',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
  );

  const timerOverlayClasses = classNames(
    timeOverlayBaseClasses,
    'border-l-[3px]',
    'glassy-background-lg',
    'border-b-[3px]',
    'border-[#FF6FC8]',
    'shadow-[0_35px_60px_-15px_rgba(255,255,255,1)]',
  );

  const timerOverlayClaimClasses = classNames(timeOverlayBaseClasses,
  'border-[3px]', 'border-[#47E0A0]');

  const timerLabelClasses = classNames('text-[14px]/[20px]', 'text-[#adb1b8]');

  const countdownWrapperClasses = classNames(
    'flex',
    'gap-[10px]',
    'font-clash-grotesk',
    'text-[35px]/[42px]',
    'font-[500]',
    'text-[#f3f3f3]',
  );
  const countdownItemClasses = classNames();

  $: enabledBadgeIds = [] as number[];

  $: displayActiveMigration = false;

  $: userBadges = [] as NFT[];

  // overlap between enabledBadgeIds and userBadges
  $: possibleMigrations = [
    ...enabledBadgeIds.filter((badgeId) => userBadges.some((nft) => nft.badgeId === badgeId)),
    ...($userProfile.badgeMigrations || []).map((migration) => migration.s1Badge?.badgeId),
  ];

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
    //await updateMigrationStatus(address);
    displayActiveMigration = Boolean($badgeMigrationStore.s1Badge?.badgeId! > 0);
  });

  function getAsFactionName(name: string) {
    return name as FactionNames;
  }

  async function handleStartMigration(badgeId: number) {
    if (!$account || !$account.address) return;
    const tokenId = await profileService.getBadgeTokenId($account.address, badgeId);
    const migration = {
      s1Badge: {
        badgeId,
        tokenId,
        tokenUri: '',
        address: trailblazersBadgesAddress[chainId],
        src: '',
      },
      id: '',
      isStarted: false,
      isCompleted: false,
      pinkTampers: 0,
      purpleTampers: 0,
      isApproved: false,
      claimExpirationTimeout: new Date(),
      tamperExpirationTimeout: undefined,
    } satisfies BadgeMigration;

    $badgeMigrationStore = migration;
    $startMigrationModal = true;
  }

  async function handleEndMigration(badgeId: number) {
    const migration = $userProfile.badgeMigrations?.find((m) => m.s1Badge?.badgeId === badgeId);
    if (!migration) {
      console.error(`Migration for badge id #${badgeId} not found`);
      return;
    }
    $badgeMigrationStore = migration;
    $endMigrationModal = true;
  }

  function handleTamperModal(badgeId: number) {
    const migration = $userProfile.badgeMigrations?.find((m) => m.s1Badge?.badgeId === badgeId);
    if (!migration) {
      console.error(`Migration for badge id #${badgeId} not found`);
      return;
    }
    $badgeMigrationStore = migration;
    $tamperMigrationModal = true;
  }

  async function setApprovalForAll() {
    try {
      if (!$account || !$account.address) return;
      await profileService.setApprovalForAll();

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

  async function handleApprovalModal(badgeId: number) {
    if (!$account || !$account.address) return;
    const tokenId = await profileService.getBadgeTokenId($account.address, badgeId);
    const migration = {
      s1Badge: {
        badgeId,
        tokenId,
        tokenUri: '',
        address: trailblazersBadgesAddress[chainId],
        src: '',
      },
      id: '',
      isStarted: false,
      isCompleted: false,
      pinkTampers: 0,
      purpleTampers: 0,
      isApproved: false,
      claimExpirationTimeout: new Date(),
      tamperExpirationTimeout: undefined,
    } satisfies BadgeMigration;

    $badgeMigrationStore = migration;
    $migrationApprovalModal = true;
  }

  $: buttons = {
    NotEligible: {
      type: 'primary',
      label: 'Not eligible',
    },
    View: {
      type: 'primary',
      label: 'Tamper',
      handler: handleTamperModal,
    },
    StartMigration: {
      type: 'primary',
      label: 'Migrate',
      handler: handleStartMigration,
    },
    EndMigration: {
      type: 'primary',
      label: 'Reveal',
      handler: handleEndMigration,
    },
    Approve: {
      type: 'primary',
      label: 'Approve contract',
      handler: handleApprovalModal,
    },
    MigrationComplete: {
      type: 'primary',
      label: 'Migration complete',
      handler: () => {},
    }
  } as Record<string, FactionBadgeButton>;

  $: $userProfile, console.log($userProfile.badgeMigrations)
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
            {@const migration = $userProfile?.badgeMigrations?.find((m) => m.s1Badge?.badgeId === badgeId || m.s2Badge?.badgeId === badgeId)}
            {@const factionName = getAsFactionName(FACTIONS[badgeId])}
            {@const disabled = !possibleMigrations.includes(badgeId)}
            <FactionBadgeItem
              button={disabled
                ? buttons.NotEligible
                : migration && migration.claimExpirationTimeout > new Date()
                  ? buttons.View
                  : migration && migration.isCompleted ?
                      buttons.MigrationComplete
                  : migration && migration.claimExpirationTimeout < new Date()
                    ? buttons.EndMigration
                      : $userProfile?.approvedMigrationBadgeIds?.includes(badgeId)
                      ? buttons.StartMigration
                      : buttons.Approve}
              {disabled}
              movement={Movements.Dev}
              name={factionName}>
              {#if !displayActiveMigration}
                {#if migration}
                  <div
                    class={migration.claimExpirationTimeout > new Date()
                      ? timerOverlayClasses
                      : timerOverlayClaimClasses}>
                    <div class={timerLabelClasses}>
                      {#if migration.tamperExpirationTimeout}
                        <!-- logic for tampering -->
                        {#if migration.tamperExpirationTimeout > new Date()}
                          <!-- cannot re-tamper yet-->
                          Next tamper available in:
                        {:else}
                          Migration claimable in:
                        {/if}
                      {:else if migration.claimExpirationTimeout > new Date()}
                        <!-- logic for untampered, time 0 -->
                        Migration complete in

                      {:else if migration.isCompleted}
                        <!-- logic for untampered, migration time left -->
                        Migration completed
                      {/if}
                    </div>

                    {#if !migration.isCompleted}
                    {#if migration.tamperExpirationTimeout}
                      {#if migration.tamperExpirationTimeout > new Date()}
                        <!-- cannot re-tamper yet-->
                        <Countdown
                          class={countdownWrapperClasses}
                          itemClasses={countdownItemClasses}
                          labels={{ days: 'd', hours: 'h', minutes: 'min', seconds: 's' }}
                          target={migration.tamperExpirationTimeout} />
                      {:else}
                        <Countdown
                          class={countdownWrapperClasses}
                          itemClasses={countdownItemClasses}
                          labels={{ days: 'd', hours: 'h', minutes: 'min', seconds: 's' }}
                          target={migration.claimExpirationTimeout} />
                      {/if}
                    {:else}
                      <!-- logic for untampered -->
                      <Countdown
                        class={countdownWrapperClasses}
                        itemClasses={countdownItemClasses}
                        labels={{ days: 'd', hours: 'h', minutes: 'min', seconds: 's' }}
                        target={migration.claimExpirationTimeout} />
                    {/if}                    {/if}

                  </div>
                {/if}
              {/if}
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
