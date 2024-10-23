<script lang="ts">
  import { onMount } from 'svelte';
  import { isAddressEqual } from 'viem';

  import { FactionNames, FACTIONS } from '$configs/badges';
  import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { userProfile } from '$lib/domains/profile/stores';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { Movements } from '$lib/domains/profile/types/types';
  import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
  import type { NFT } from '$lib/shared/types/NFT';
  import { chainId } from '$lib/shared/utils/chain';
  import { account } from '$shared/stores';
  import { badgeMigrationStore } from '$shared/stores/badgeMigration';
  import { endMigrationModal, startMigrationModal, tamperMigrationModal } from '$shared/stores/modal';
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

  const timerOverlayClaimClasses = classNames(timeOverlayBaseClasses, 'border-[3px]', 'border-[#47E0A0]');

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
      (nft) =>
        isAddressEqual(nft.address, trailblazersBadgesAddress[chainId]) ||
        isAddressEqual(nft.address, trailblazersBadgesS2Address[chainId]),
    );

    enabledBadgeIds = await profileService.getEnabledMigrations();
    displayActiveMigration = Boolean($badgeMigrationStore.s1Badge?.badgeId);
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
      devTampers: 0,
      whaleTampers: 0,
      minnowTampers: 0,
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
      label: 'Start migration',
      handler: handleStartMigration,
    },
    EndMigration: {
      type: 'primary',
      label: 'Claim',
      handler: handleEndMigration,
    },
    MigrationComplete: {
      type: 'primary',
      label: 'Migration complete',
      handler: () => {},
    },
  } as Record<string, FactionBadgeButton>;
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
            {@const migration = $userProfile?.badgeMigrations?.find((m) => m.s1Badge?.badgeId === badgeId)}
            {@const factionName = getAsFactionName(FACTIONS[badgeId])}
            {@const disabled = !possibleMigrations.includes(badgeId)}
            <FactionBadgeItem
              button={disabled
                ? buttons.NotEligible
                : migration && migration.isCompleted
                  ? buttons.MigrationComplete
                  : migration && migration.claimExpirationTimeout > new Date()
                    ? buttons.View
                    : migration && migration.claimExpirationTimeout < new Date()
                      ? buttons.EndMigration
                      : buttons.StartMigration}
              disabled={disabled ||
                (migration && migration.isCompleted) ||
                (migration && migration.tamperExpirationTimeout && migration.tamperExpirationTimeout > new Date())}
              movement={Movements.Dev}
              name={factionName}>
              {#if !displayActiveMigration}
                {#if migration}
                  <div
                    class={migration.claimExpirationTimeout > new Date()
                      ? timerOverlayClasses
                      : timerOverlayClaimClasses}>
                    <div class={timerLabelClasses}>
                      {#if migration.tamperExpirationTimeout && migration.tamperExpirationTimeout > new Date()}
                        <!-- cannot re-tamper yet-->
                        Next tamper available in:
                      {:else if migration.claimExpirationTimeout > new Date()}
                        <!-- logic for untampered, time 0 -->
                        Migration complete in:
                      {/if}
                    </div>

                    {#if !migration.isCompleted}
                      {#if migration.tamperExpirationTimeout && migration.tamperExpirationTimeout > new Date()}
                        <!-- cannot re-tamper yet-->
                        <Countdown
                          class={countdownWrapperClasses}
                          itemClasses={countdownItemClasses}
                          labels={{ days: 'd', hours: 'h', minutes: 'min', seconds: 's' }}
                          target={migration.tamperExpirationTimeout} />
                      {:else if migration.claimExpirationTimeout > new Date()}
                        <!-- logic for untampered -->
                        <Countdown
                          class={countdownWrapperClasses}
                          itemClasses={countdownItemClasses}
                          labels={{ days: 'd', hours: 'h', minutes: 'min', seconds: 's' }}
                          target={migration.claimExpirationTimeout} />
                      {/if}
                    {/if}
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
