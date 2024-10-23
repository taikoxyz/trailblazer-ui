<script lang="ts">
  import { onMount } from 'svelte';
  import { json, t } from 'svelte-i18n';
  import { isAddressEqual } from 'viem';

  import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
  import { FactionBadgeItem } from '$lib/domains/profile/components/ProfileNFTs/FactionBadges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { userProfile } from '$lib/domains/profile/stores';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { FaqBlock } from '$lib/domains/splashpage/components/FaqBlock';
  import type { IFaqEntry } from '$lib/domains/splashpage/components/FaqBlock/FaqBlock.svelte';
  import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
  import type { NFT } from '$lib/shared/types/NFT';
  import { chainId } from '$lib/shared/utils/chain';
  import { account } from '$shared/stores';
  import { activeMigration, endMigrationModal, startMigrationModal, tamperMigrationModal } from '$shared/stores/modal';
  import { classNames } from '$shared/utils/classNames';

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

  $: userBadges = [] as NFT[];

  // overlap between enabledBadgeIds and userBadges
  $: possibleMigrations = [
    ...enabledBadgeIds.filter((badgeId) => userBadges.some((nft) => nft.badgeId === badgeId)),
    ...($userProfile.badgeMigrations || []).map((migration) => migration.s1Badge?.badgeId),
  ];

  $: activeMigrationBadgeId =
    $userProfile.badgeMigrations?.find((migration) => {
      return (
        // ongoing migration
        (migration.claimExpirationTimeout > new Date() && !migration.isCompleted) ||
        // unclaimed migration
        !migration.isCompleted
      );
    })?.s1Badge?.badgeId || -1;

  onMount(async () => {
    const allNFTS = $userProfile.nfts || [];
    userBadges = allNFTS.filter(
      (nft) =>
        isAddressEqual(nft.address, trailblazersBadgesAddress[chainId]) ||
        isAddressEqual(nft.address, trailblazersBadgesS2Address[chainId]),
    );

    enabledBadgeIds = await profileService.getEnabledMigrations();
  });

  async function handleStartMigration(badgeId: number) {
    if (!$account || !$account.address) return;
    const tokenId = await profileService.getBadgeTokenId($account.address, badgeId);
    $activeMigration = {
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
    $startMigrationModal = true;
  }

  async function handleEndMigration(badgeId: number) {
    const migration = $userProfile.badgeMigrations?.find((m) => m.s1Badge?.badgeId === badgeId);
    if (!migration) {
      console.error(`Migration for badge id #${badgeId} not found`);
      return;
    }
    $activeMigration = migration;
    $endMigrationModal = true;
  }
  endMigrationModal;

  function handleTamperModal(badgeId: number) {
    const migration = $userProfile.badgeMigrations?.find((m) => m.s1Badge?.badgeId === badgeId);
    if (!migration) {
      console.error(`Migration for badge id #${badgeId} not found`);
      return;
    }
    $activeMigration = migration;
    $tamperMigrationModal = true;
  }

  $: buttons = {
    NotEligible: {
      disabled: true,
      type: 'primary',
      label: 'Not eligible',
    },
    Refine: {
      type: 'primary',
      label: 'Refine',
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
  } as Record<string, FactionBadgeButton>;

  const faqEntries = $json('badge_forge.faq.entries') as IFaqEntry[];
  const faqWrapperClasses = classNames('pt-[60px]', 'w-full', 'px-[48px]', 'flex', 'flex-col', 'gap-[30px]');
</script>

<div class={containerClass}>
  <div class={rowClass}>
    <div class={titleClasses}>{title}</div>
    <div class={dividerClasses} />

    <div class={boxClasses}>
      {#if enabledBadgeIds.length}
        <div class={nftGridClasses}>
          {#each enabledBadgeIds as badgeId}
            {@const migration = $userProfile?.badgeMigrations?.find((m) => m.s1Badge?.badgeId === badgeId)}
            {@const disabled = !possibleMigrations.includes(badgeId)}
            {@const buttonDisabled =
              (activeMigrationBadgeId >= 0 && activeMigrationBadgeId !== badgeId) ||
              (migration?.tamperExpirationTimeout && migration.tamperExpirationTimeout > new Date())}
            {@const token = (migration?.s2Badge?.tokenId || 0) > 0 ? migration?.s2Badge : migration?.s1Badge}
            {@const tamperExpiration = migration?.tamperExpirationTimeout}
            {@const isTamperActive = migration || (tamperExpiration && tamperExpiration > new Date())}
            {@const claimExpiration = migration?.claimExpirationTimeout}
            {@const blurred =
              (tamperExpiration && tamperExpiration > new Date()) || !possibleMigrations.includes(badgeId)}
            {@const inColor =
              !disabled || (migration && migration.isCompleted) || (tamperExpiration && tamperExpiration > new Date())}

            <FactionBadgeItem
              token={token || {
                tokenId: -1,
                badgeId,
                tokenUri: '',
                address: trailblazersBadgesAddress[chainId],
                src: '',
              }}
              {inColor}
              {blurred}
              {buttonDisabled}
              button={disabled
                ? buttons.NotEligible
                : migration && migration.isCompleted
                  ? null
                  : claimExpiration && claimExpiration < new Date()
                    ? buttons.EndMigration
                    : isTamperActive
                      ? buttons.Refine
                      : buttons.StartMigration}>
              {#if migration}
                <div
                  class={claimExpiration && claimExpiration > new Date()
                    ? timerOverlayClasses
                    : timerOverlayClaimClasses}>
                  <div class={timerLabelClasses}>
                    {#if tamperExpiration && tamperExpiration > new Date()}
                      <!-- cannot re-tamper yet-->
                      You can refine again in:
                    {:else if claimExpiration && claimExpiration > new Date()}
                      <!-- logic for untampered, time 0 -->
                      Badge forged in:
                    {/if}
                  </div>

                  {#if !migration.isCompleted}
                    {#if tamperExpiration && tamperExpiration > new Date()}
                      <!-- cannot re-tamper yet-->
                      <Countdown
                        class={countdownWrapperClasses}
                        itemClasses={countdownItemClasses}
                        labels={{ days: 'd', hours: 'h', minutes: 'min', seconds: 's' }}
                        target={tamperExpiration} />
                    {:else if claimExpiration && claimExpiration > new Date()}
                      <!-- logic for untampered -->
                      <Countdown
                        class={countdownWrapperClasses}
                        itemClasses={countdownItemClasses}
                        labels={{ days: 'd', hours: 'h', minutes: 'min', seconds: 's' }}
                        target={claimExpiration} />
                    {/if}
                  {/if}
                </div>
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

  <div class={faqWrapperClasses}>
    <div class="divider" />

    <FaqBlock title={$t('badge_forge.faq.title')} entries={faqEntries} />
  </div>
</div>
