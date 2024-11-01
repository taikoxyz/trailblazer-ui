<script lang="ts">
  import { onMount } from 'svelte';
  import { json, t } from 'svelte-i18n';

  import { FactionBadgeItem } from '$lib/domains/profile/components/ProfileNFTs/FactionBadges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { userProfile } from '$lib/domains/profile/stores';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { Movements, Seasons } from '$lib/domains/profile/types/types';
  import { FaqBlock } from '$lib/domains/splashpage/components/FaqBlock';
  import type { IFaqEntry } from '$lib/domains/splashpage/components/FaqBlock/FaqBlock.svelte';
  import { type ActiveBadgeMigration, MigrationStatus } from '$lib/shared/types/BadgeMigration';
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

  const emptyOverlayClasses = classNames(
    'w-full',
    'h-full',
    'absolute',
    'flex',
    'justify-center',
    'items-center',
    'flex-col',
  );
  const timerOverlayClasses = classNames(emptyOverlayClasses, 'glassy-background-lg');

  const borderedBadgeBaseClasses = classNames(
    'w-full',
    'transition-all',
    'rounded-[30px]',
    'box-border',
    'aspect-square',
    'border',
    'border-[3px]',
  );

  const pinkBordered = classNames(borderedBadgeBaseClasses, 'bg-[#FF6FC8]', 'border-[#FF6FC8]');

  const pinkShadowed = classNames(
    borderedBadgeBaseClasses,
    'bg-[#FF6FC8]',
    'border-[#FF6FC8]',
    'shadow-[0_0_20px_0px_rgba(255,111,200,1)]',
    'hover:shadow-[0_0_30px_0px_rgba(255,111,200,1)]',
  );

  const greenBordered = classNames(borderedBadgeBaseClasses, 'bg-[#47e0a0]', 'border-[#47e0a0]');

  const neutralBordered = classNames('w-full', 'transition-all', 'rounded-[30px]', 'box-border', 'aspect-square');

  const timerLabelClasses = classNames('text-[14px]/[20px]', 'text-[#adb1b8]');

  const countdownWrapperClasses = classNames(
    'flex',
    'gap-[10px]',
    'font-clash-grotesk',
    'text-[35px]/[42px]',
    'font-[500]',
    'text-[#f3f3f3]',
  );
  const countdownItemClasses = classNames('h-min');

  $: enabledBadgeIds = [] as number[];

  onMount(async () => {
    enabledBadgeIds = await profileService.getEnabledMigrations();
  });

  $: forceRenderFlag = true;
  async function onCounterEnd(migration: ActiveBadgeMigration, status: MigrationStatus) {
    if (!$account || !$account.address) return;
    forceRenderFlag = false;

    $activeMigration = {
      ...migration,
      status,
    };

    forceRenderFlag = true;
  }

  async function handleStartMigration(badgeId: number) {
    if (!$account || !$account.address) return;

    $activeMigration = {
      badgeId,
      status: MigrationStatus.NOT_STARTED,
      s1Badge: getMockBadge(Seasons.Season1, badgeId),
      id: '',
      whaleTampers: 0,
      minnowTampers: 0,
      claimExpirationTimeout: new Date(),
      tamperExpirationTimeout: undefined,
    } satisfies ActiveBadgeMigration;
    $startMigrationModal = true;
  }

  function handleTamperModal(badgeId: number) {
    const migration = $userProfile.badgeMigrations?.find((m) => m.badgeId === badgeId);
    if (!migration) {
      console.error(`Migration for badge id #${badgeId} not found`);
      return;
    }
    $activeMigration = migration;
    $refineMigrationModal = true;
  }

  async function handleEndMigration(badgeId: number) {
    const migration = $userProfile.badgeMigrations?.find((m) => m.badgeId === badgeId);
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
    OngoingMigration: {
      type: 'primary',
      label: 'Another migration in progress',
      disabled: true,
    },
  } as Record<string, FactionBadgeButton>;

  const faqEntries = $json('badge_forge.faq.entries') as IFaqEntry[];
  const faqWrapperClasses = classNames('pt-[60px]', 'w-full', 'px-[48px]', 'flex', 'flex-col', 'gap-[30px]');

  function getBadgeMovement(badgeId: number): Movements {
    const nft = $userProfile.nfts?.find(
      (nft) => nft.metadata.season === Seasons.Season2 && nft.metadata.badgeId === badgeId,
    );
    if (!nft) {
      return Movements.Undefined;
    }

    return nft.metadata.movement as Movements;
  }
</script>

<div class={containerClass}>
  <div class={rowClass}>
    <div class={titleClasses}>{title}</div>
    <div class={dividerClasses} />
    <div class={boxClasses}>
      {#if forceRenderFlag && enabledBadgeIds.length}
        <div class={nftGridClasses}>
          {#each enabledBadgeIds as badgeId}
            {@const migration =
              $activeMigration && $activeMigration.badgeId === badgeId
                ? $activeMigration
                : $userProfile?.badgeMigrations?.find((m) => m.badgeId === badgeId)}
            {#if migration}
              {@const s1TokenOwned = Boolean(
                $userProfile.nfts?.find(
                  (nft) => nft.metadata.season === Seasons.Season1 && nft.metadata.badgeId === badgeId,
                ),
              )}
              {@const movement = getBadgeMovement(badgeId)}
              {@const tamperExpiration = migration.tamperExpirationTimeout}
              {@const claimExpiration = migration.claimExpirationTimeout}
              {@const isTamperActive = tamperExpiration && tamperExpiration > new Date()}
              {@const isActiveBadge = $activeMigration ? $activeMigration.badgeId === migration.badgeId : false}
              {@const isEligible = migration.status === MigrationStatus.ELIGIBLE || s1TokenOwned}
              {@const isStarted = migration.status === MigrationStatus.STARTED}
              {@const canClaim = migration.status === MigrationStatus.CAN_CLAIM}
              {@const canRefine = migration.status === MigrationStatus.CAN_REFINE}
              {@const isComplete = migration.status === MigrationStatus.COMPLETED}
              {@const blurred = canRefine || isStarted}
              {@const inColor = isEligible || canClaim || canRefine || isComplete}
              {@const buttonDisabled =
                isTamperActive ||
                Boolean($activeMigration ? $activeMigration.badgeId !== migration.badgeId : $activeMigration)}
              <div
                class={canClaim || canRefine
                  ? pinkShadowed
                  : isComplete
                    ? greenBordered
                    : isEligible
                      ? pinkBordered
                      : neutralBordered}>
                <FactionBadgeItem
                  token={getMockBadge(isComplete ? Seasons.Season2 : Seasons.Season1, badgeId, movement)}
                  {inColor}
                  {blurred}
                  {buttonDisabled}
                  button={canRefine || isStarted
                    ? buttons.Refine
                    : canClaim
                      ? buttons.EndMigration
                      : isComplete
                        ? null
                        : isEligible && !isActiveBadge && $activeMigration
                          ? buttons.OngoingMigration
                          : isEligible
                            ? buttons.StartMigration
                            : buttons.NotEligible}>
                  {#if migration}
                    <div class={blurred ? timerOverlayClasses : emptyOverlayClasses}>
                      <div class={timerLabelClasses}>
                        {#if tamperExpiration && tamperExpiration > new Date()}
                          <!-- cannot re-tamper yet-->
                          {$t('badge_forge.main.can_refine_in')}
                        {:else if claimExpiration && claimExpiration > new Date()}
                          <!-- logic for untampered, time 0 -->
                          {$t('badge_forge.main.can_claim_in')}
                        {/if}
                      </div>
                      {#if tamperExpiration && tamperExpiration > new Date()}
                        <!-- cannot re-tamper yet-->
                        <Countdown
                          on:end={() => onCounterEnd(migration, MigrationStatus.CAN_REFINE)}
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
                          on:end={() => onCounterEnd(migration, MigrationStatus.CAN_CLAIM)}
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
                    </div>
                  {/if}
                </FactionBadgeItem>
              </div>
            {/if}
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
