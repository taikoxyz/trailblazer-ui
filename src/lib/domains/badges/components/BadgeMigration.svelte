<script lang="ts">
  import { onMount } from 'svelte';
  import { json, t } from 'svelte-i18n';
  import { isAddressEqual } from 'viem';

  import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
  import { FactionBadgeItem } from '$lib/domains/profile/components/ProfileNFTs/FactionBadges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { userProfile } from '$lib/domains/profile/stores';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { Movements, Seasons } from '$lib/domains/profile/types/types';
  import { FaqBlock } from '$lib/domains/splashpage/components/FaqBlock';
  import type { IFaqEntry } from '$lib/domains/splashpage/components/FaqBlock/FaqBlock.svelte';
  import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
  import { chainId } from '$lib/shared/utils/chain';
  import { account } from '$shared/stores';
  import {
    activeMigration,
    endMigrationModal,
    refineMigrationModal,
    startMigrationModal,
  } from '$shared/stores/migration';
  import { classNames } from '$shared/utils/classNames';
  import getMockBadge from '$shared/utils/nfts/getMockBadge';

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

  // overlap between enabledBadgeIds and userBadges
  $: possibleMigrations = [
    ...enabledBadgeIds.filter((badgeId) => userBadges.some((nft) => nft.metadata.badgeId === badgeId)),
    ...($userProfile.badgeMigrations || []).map((migration) => migration.s1Badge?.metadata.badgeId),
  ];

  $: activeMigrationBadgeId = $activeMigration?.s1Badge?.metadata.badgeId as number;

  $: allNFTS = $userProfile.nfts || [];
  $: userBadges = allNFTS.filter(
    (nft) =>
      isAddressEqual(nft.address, trailblazersBadgesAddress[chainId]) ||
      isAddressEqual(nft.address, trailblazersBadgesS2Address[chainId]),
  );

  onMount(async () => {
    enabledBadgeIds = await profileService.getEnabledMigrations();
    await forceUpdateUI();
  });

  $: forceRenderFlag = true;
  async function forceUpdateUI() {
    /*
    if (!$account || !$account.address) return;
    forceRenderFlag = false;
    //await profileService.getBadgeMigrations($account.address);
    //enabledBadgeIds = await profileService.getEnabledMigrations()
    forceRenderFlag = true;
    */
  }

  async function handleStartMigration(badgeId: number) {
    if (!$account || !$account.address) return;

    $activeMigration = {
      s1Badge: getMockBadge(Seasons.Season1, badgeId),
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

  function handleTamperModal(badgeId: number) {
    const migration = $userProfile.badgeMigrations?.find((m) => m.s1Badge?.metadata.badgeId === badgeId);
    if (!migration) {
      console.error(`Migration for badge id #${badgeId} not found`);
      return;
    }
    $activeMigration = migration;
    $refineMigrationModal = true;
  }

  async function handleEndMigration(badgeId: number) {
    const migration = $userProfile.badgeMigrations?.find((m) => m.s1Badge?.metadata.badgeId === badgeId);
    if (!migration) {
      console.error(`Migration for badge id #${badgeId} not found`);
      return;
    }
    $activeMigration = migration;
    $endMigrationModal = true;
  }

  $: buttons = {
    NotEligible: {
      disabled: true,
      type: 'primary',
      label: $t('badge_forge.buttons.not_eligible'),
    },
    Refine: {
      type: 'primary',
      label: $t('badge_forge.buttons.refine'),
      handler: handleTamperModal,
    },
    StartMigration: {
      type: 'primary',
      label: $t('badge_forge.buttons.start_migration'),
      handler: handleStartMigration,
    },
    EndMigration: {
      type: 'primary',
      label: $t('badge_forge.buttons.end_migration'),
      handler: handleEndMigration,
    },
  } as Record<string, FactionBadgeButton>;

  const faqEntries = $json('badge_forge.faq.entries') as IFaqEntry[];
  const faqWrapperClasses = classNames('pt-[60px]', 'w-full', 'px-[48px]', 'flex', 'flex-col', 'gap-[30px]');

  $: $endMigrationModal, forceUpdateUI();
  $: $refineMigrationModal, forceUpdateUI();
</script>

<div class={containerClass}>
  <div class={rowClass}>
    <div class={titleClasses}>{title}</div>
    <div class={dividerClasses} />
    <div class={boxClasses}>
      {#if forceRenderFlag && enabledBadgeIds.length}
        <div class={nftGridClasses}>
          {#each enabledBadgeIds as badgeId}
            {@const migration = $userProfile?.badgeMigrations?.find((m) => m.s1Badge.metadata.badgeId === badgeId)}
            {@const disabled = !possibleMigrations.includes(badgeId)}
            {@const buttonDisabled =
              (activeMigrationBadgeId >= 0 && activeMigrationBadgeId !== badgeId) ||
              (migration?.tamperExpirationTimeout && migration.tamperExpirationTimeout > new Date())}
            {@const token = migration?.s2Badge ? migration?.s2Badge : migration?.s1Badge}
            {@const tamperExpiration = migration?.tamperExpirationTimeout}
            {@const isTamperActive = migration || (tamperExpiration && tamperExpiration > new Date())}
            {@const claimExpiration = migration?.claimExpirationTimeout}
            {@const blurred =
              (tamperExpiration && tamperExpiration > new Date()) || !possibleMigrations.includes(badgeId)}
            {@const inColor =
              !disabled || (migration && migration.isCompleted) || (tamperExpiration && tamperExpiration > new Date())}

            <FactionBadgeItem
              token={token || getMockBadge(Seasons.Season1, badgeId, Movements.Dev)}
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
                      {$t('badge_forge.main.can_refine_in')}
                    {:else if claimExpiration && claimExpiration > new Date()}
                      <!-- logic for untampered, time 0 -->
                      {$t('badge_forge.main.can_claim_in')}
                    {/if}
                  </div>

                  {#if !migration.isCompleted}
                    {#if tamperExpiration && tamperExpiration > new Date()}
                      <!-- cannot re-tamper yet-->
                      <Countdown
                        on:end={forceUpdateUI}
                        class={countdownWrapperClasses}
                        itemClasses={countdownItemClasses}
                        labels={{
                          days: $t('date.labels.days'),
                          hours: $t('date.labels.hours'),
                          minutes: $t('date.labels.minutes'),
                          seconds: $t('date.labels.seconds'),
                        }}
                        target={tamperExpiration} />
                    {:else if claimExpiration && claimExpiration > new Date()}
                      <!-- logic for untampered -->
                      <Countdown
                        on:end={forceUpdateUI}
                        class={countdownWrapperClasses}
                        itemClasses={countdownItemClasses}
                        labels={{
                          days: $t('date.labels.days'),
                          hours: $t('date.labels.hours'),
                          minutes: $t('date.labels.minutes'),
                          seconds: $t('date.labels.seconds'),
                        }}
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
          <p>{$t('badge_forge.main.no_enabled_migrations')}</p>
        </div>
      {/if}
    </div>
  </div>

  <div class={faqWrapperClasses}>
    <div class="divider" />

    <FaqBlock title={$t('badge_forge.faq.title')} entries={faqEntries} />
  </div>
</div>
