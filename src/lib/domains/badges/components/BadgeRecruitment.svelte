<script lang="ts">
  import { onMount } from 'svelte';
  import { json, t } from 'svelte-i18n';
  import type { Address } from 'viem';

  import { browser } from '$app/environment';
  import { FactionBadgeItem } from '$lib/domains/profile/components/ProfileNFTs/FactionBadges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { userProfile } from '$lib/domains/profile/stores';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { Movements, Seasons } from '$lib/domains/profile/types/types';
  import { FaqBlock } from '$lib/domains/splashpage/components/FaqBlock';
  import type { IFaqEntry } from '$lib/domains/splashpage/components/FaqBlock/FaqBlock.svelte';
  import { type IBadgeRecruitment, RecruitmentStatus } from '$lib/shared/types/BadgeRecruitment';
  import { Spinner } from '$shared/components';
  import { Button } from '$shared/components/Button';
  import RotatingIcon from '$shared/components/Icon/RotatingIcon.svelte';
  import { account } from '$shared/stores';
  import {
    activeRecruitment,
    endRecruitmentModal,
    influenceRecruitmentModal,
    startRecruitmentModal,
  } from '$shared/stores/recruitment';
  import { classNames } from '$shared/utils/classNames';
  import getMockBadge from '$shared/utils/nfts/getMockBadge';

  import Countdown from './Countdown.svelte';

  export let title: string = 'Badge Recruitment';

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
    enabledBadgeIds = await profileService.getEnabledRecruitments();
  });

  $: forceRenderFlag = true;
  async function onCounterEnd(recruitment: IBadgeRecruitment, status: RecruitmentStatus) {
    if (!$account || !$account.address) return;
    forceRenderFlag = false;

    $activeRecruitment = {
      ...recruitment,
      status,
    };

    forceRenderFlag = true;
  }

  async function handleStartRecruitment(badgeId: number) {
    if (!$account || !$account.address) return;

    $activeRecruitment = {
      badgeId,
      status: RecruitmentStatus.NOT_STARTED,
      s1Badge: getMockBadge(Seasons.Season1, badgeId),
      id: '',
      whaleInfluences: 0,
      minnowInfluences: 0,
      claimExpirationTimeout: new Date(),
      influenceExpirationTimeout: undefined,
    } satisfies IBadgeRecruitment;
    $startRecruitmentModal = true;
  }

  function handleInfluenceModal(badgeId: number) {
    const recruitment = $userProfile.badgeRecruitment?.find((m) => m.badgeId === badgeId);
    if (!recruitment) {
      console.error(`Recruitment for badge id #${badgeId} not found`);
      return;
    }
    $activeRecruitment = recruitment;
    $influenceRecruitmentModal = true;
  }

  async function handleEndRecruitment(badgeId: number) {
    const recruitment = $userProfile.badgeRecruitment?.find((m) => m.badgeId === badgeId);
    if (!recruitment) {
      console.error(`Recruitment for badge id #${badgeId} not found`);
      return;
    }
    $activeRecruitment = recruitment;
    $endRecruitmentModal = true;
  }

  $: buttons = {
    NotEligible: {
      disabled: true,
      type: 'primary',
      label: $t('badge_recruitment.buttons.not_eligible'),
    },
    Influence: {
      type: 'primary',
      label: $t('badge_recruitment.buttons.influence'),
      handler: handleInfluenceModal,
    },
    StartRecruitment: {
      type: 'primary',
      label: $t('badge_recruitment.buttons.start_recruitment'),
      handler: handleStartRecruitment,
    },
    EndRecruitment: {
      type: 'primary',
      label: $t('badge_recruitment.buttons.end_recruitment'),
      handler: handleEndRecruitment,
    },
    OngoingRecruitment: {
      type: 'primary',
      label: 'Another recruitment in progress',
      disabled: true,
    },
  } as Record<string, FactionBadgeButton>;

  const faqEntries = $json('badge_recruitment.faq.entries') as IFaqEntry[];
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

  $: isLoading = false;
  const handleRefresh = async () => {
    if (!browser) return;
    isLoading = true;
    const address = window.location.pathname.split('/').pop();
    if (!address) return;
    await profileService.getProfileWithNFTs(address as Address);
    enabledBadgeIds = await profileService.getEnabledRecruitments();
    isLoading = false;
  };

  onMount(async () => {
    await handleRefresh();
  });

  function addGraceCoolDown(date?: Date): Date | undefined {
    if (!date) return;
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + 1);
    return newDate;
  }
</script>

<div class={containerClass}>
  <div class={rowClass}>
    <Button
      type="neutral"
      shape="circle"
      class="bg-neutral rounded-full !w-[28px] !h-[28px] border-none absolute right-[20px] md:right-[48px] top-[30px]"
      on:click={handleRefresh}>
      <RotatingIcon loading={isLoading} type="refresh" size={13} />
    </Button>

    <div class={titleClasses}>{title}</div>
    <div class={dividerClasses} />
    <div class={boxClasses}>
      {#if isLoading}
        <div class="w-full flex justify-center">
          <Spinner size="lg" />
        </div>
      {:else if forceRenderFlag && enabledBadgeIds.length}
        <div class={nftGridClasses}>
          {#each enabledBadgeIds as badgeId}
            {@const recruitment =
              $activeRecruitment && $activeRecruitment.badgeId === badgeId
                ? $activeRecruitment
                : $userProfile?.badgeRecruitment?.find((m) => m.badgeId === badgeId)}
            {#if recruitment}
              {@const s1TokenOwned = Boolean(
                $userProfile.nfts?.find(
                  (nft) => nft.metadata.season === Seasons.Season1 && nft.metadata.badgeId === badgeId,
                ),
              )}
              {@const movement = getBadgeMovement(badgeId)}
              {@const influenceExpiration = addGraceCoolDown(recruitment.influenceExpirationTimeout)}
              {@const claimExpiration = addGraceCoolDown(recruitment.claimExpirationTimeout)}
              {@const isInfluenceActive = influenceExpiration && influenceExpiration > new Date()}
              {@const isActiveBadge = $activeRecruitment ? $activeRecruitment.badgeId === recruitment.badgeId : false}
              {@const isEligible = recruitment.status === RecruitmentStatus.ELIGIBLE || s1TokenOwned}
              {@const isStarted = recruitment.status === RecruitmentStatus.STARTED}
              {@const canClaim = recruitment.status === RecruitmentStatus.CAN_CLAIM}
              {@const canInfluence = recruitment.status === RecruitmentStatus.CAN_REFINE}
              {@const isComplete = recruitment.status === RecruitmentStatus.COMPLETED}
              {@const blurred = canInfluence || isStarted}
              {@const inColor = isEligible || canClaim || canInfluence || isComplete}
              {@const buttonDisabled =
                isInfluenceActive ||
                Boolean($activeRecruitment ? $activeRecruitment.badgeId !== recruitment.badgeId : $activeRecruitment)}
              <div
                class={canClaim || canInfluence
                  ? pinkShadowed
                  : isComplete
                    ? greenBordered
                    : isEligible
                      ? $activeRecruitment && isActiveBadge
                        ? pinkShadowed
                        : pinkBordered
                      : neutralBordered}>
                <FactionBadgeItem
                  token={getMockBadge(isComplete ? Seasons.Season2 : Seasons.Season1, badgeId, movement)}
                  {inColor}
                  {blurred}
                  {buttonDisabled}
                  button={canInfluence || isStarted
                    ? buttons.Influence
                    : canClaim
                      ? buttons.EndRecruitment
                      : isComplete
                        ? null
                        : isEligible && !isActiveBadge && $activeRecruitment
                          ? buttons.OngoingRecruitment
                          : isEligible
                            ? buttons.StartRecruitment
                            : buttons.NotEligible}>
                  {#if recruitment}
                    <div class={blurred ? timerOverlayClasses : emptyOverlayClasses}>
                      <div class={timerLabelClasses}>
                        {#if influenceExpiration && influenceExpiration > new Date()}
                          <!-- cannot re-influence yet-->
                          {$t('badge_recruitment.main.can_influence_in')}
                        {:else if claimExpiration && claimExpiration > new Date()}
                          <!-- logic for uninfluenceed, time 0 -->
                          {$t('badge_recruitment.main.can_claim_in')}
                        {/if}
                      </div>
                      {#if influenceExpiration && influenceExpiration > new Date()}
                        <!-- cannot re-influence yet-->
                        <Countdown
                          on:end={() => onCounterEnd(recruitment, RecruitmentStatus.CAN_REFINE)}
                          class={countdownWrapperClasses}
                          itemClasses={countdownItemClasses}
                          labels={{
                            days: $t('date.labels.days'),
                            hours: $t('date.labels.hours'),
                            minutes: $t('date.labels.minutes'),
                            seconds: $t('date.labels.seconds'),
                          }}
                          target={influenceExpiration} />
                      {:else if claimExpiration && claimExpiration > new Date()}
                        <!-- logic for uninfluenceed -->
                        <Countdown
                          on:end={() => onCounterEnd(recruitment, RecruitmentStatus.CAN_CLAIM)}
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
          <p>{$t('badge_recruitment.main.no_enabled_recruitments')}</p>
        </div>
      {/if}
    </div>
  </div>

  <div class={faqWrapperClasses}>
    <div class="divider" />

    <FaqBlock title={$t('badge_recruitment.faq.title')} entries={faqEntries} />
  </div>
</div>
