<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from 'svelte-i18n';

  import { FactionBadgeItem } from '$lib/domains/profile/components/ProfileNFTs/FactionBadges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { userProfile } from '$lib/domains/profile/stores';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { Movements, Seasons } from '$lib/domains/profile/types/types';
  import { type IBadgeRecruitment, RecruitmentStatus } from '$lib/shared/types/BadgeRecruitment';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
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

  export let badgeId: number;
  export let enabled: boolean; // contract-level disabling

  export let cycleId: number;

  $: recruitment =
    $activeRecruitment && $activeRecruitment.badgeId === badgeId
      ? $activeRecruitment
      : $userProfile?.badgeRecruitment?.find((m) => m.badgeId === badgeId);

  $: s1TokenOwned = Boolean(
    $userProfile.nfts?.find(
      (nft) => nft.metadata.season === Seasons.Season1 && nft.metadata.badgeId === badgeId && !nft.metadata.frozen,
    ),
  );
  $: movement = getBadgeMovement(badgeId);
  $: influenceExpiration = addGraceCoolDown(recruitment?.influenceExpirationTimeout);
  $: claimExpiration = addGraceCoolDown(recruitment?.claimExpirationTimeout);
  $: isInfluenceActive = recruitment?.cycleId === cycleId && influenceExpiration && influenceExpiration > new Date();
  $: isActiveBadge =
    recruitment?.cycleId === cycleId && $activeRecruitment
      ? $activeRecruitment.badgeId === recruitment?.badgeId
      : false;
  $: isEligible =
    (recruitment?.cycleId === cycleId && recruitment?.status === RecruitmentStatus.ELIGIBLE) || s1TokenOwned;
  $: isStarted = recruitment?.cycleId === cycleId && recruitment?.status === RecruitmentStatus.STARTED;
  $: canClaim = recruitment?.cycleId === cycleId && recruitment?.status === RecruitmentStatus.CAN_CLAIM;
  $: canInfluence = recruitment?.cycleId === cycleId && recruitment?.status === RecruitmentStatus.CAN_REFINE;
  $: isComplete = recruitment?.cycleId === cycleId && recruitment?.status === RecruitmentStatus.COMPLETED;
  $: buttonDisabled =
    isInfluenceActive ||
    Boolean($activeRecruitment ? $activeRecruitment.badgeId !== recruitment?.badgeId : $activeRecruitment);

  $: canReset =
    !isEligible &&
    !canInfluence &&
    !canClaim &&
    recruitment?.cycleId !== cycleId &&
    (
      $userProfile.badgeRecruitment?.filter(
        (m) =>
          m.status !== RecruitmentStatus.NOT_STARTED &&
          m.status !== RecruitmentStatus.COMPLETED &&
          m.badgeId === badgeId,
      ) || []
    ).length > 0;

  $: inColor = canReset || !enabled || isEligible || canClaim || canInfluence || isComplete;
  $: blurred = canReset || canInfluence || isStarted || (influenceExpiration && influenceExpiration > new Date());

  const dispatch = createEventDispatcher();

  async function handleStartRecruitment(badgeId: number) {
    if (!$account || !$account.address) return;

    const nfts = $userProfile.nfts;

    const s1Badge = nfts?.find(
      (nft) => !nft.metadata.frozenS2 && nft.metadata.season === Seasons.Season1 && nft.metadata.badgeId === badgeId,
    );

    if (!s1Badge) {
      console.error(`No eligible badge found`);
      return;
    }

    $activeRecruitment = {
      cycleId: -1,
      badgeId,
      status: RecruitmentStatus.NOT_STARTED,
      s1Badge,
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

  $: disableResetButton = false;
  async function handleResetRecruitment(badgeId: number) {
    try {
      if (!$account || !$account.address) {
        throw new Error('No account found');
      }

      const recruitment = $userProfile.badgeRecruitment?.find(
        (m) =>
          m.badgeId === badgeId &&
          m.status !== RecruitmentStatus.NOT_STARTED &&
          m.status !== RecruitmentStatus.COMPLETED,
      );

      const s1Badge = recruitment?.s1Badge;
      if (!s1Badge) {
        throw new Error('No token id found');
      }
      disableResetButton = true;
      await profileService.resetMigration(s1Badge.tokenId, badgeId, recruitment.cycleId);

      successToast({
        title: 'Success',
        message: `Recruitment for token ID #${s1Badge.tokenId} has been reset`,
      });

      await profileService.getProfileWithNFTs($account.address);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      errorToast({
        title: 'Error',
        message: e.shortMessage || 'Error resetting your recruitment',
      });
    } finally {
      disableResetButton = false;
    }
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
      label: $t('badge_recruitment.buttons.ongoing_recruitment'),
      disabled: true,
    },
  } as Record<string, FactionBadgeButton>;

  function getBadgeMovement(badgeId: number): Movements {
    const nft = $userProfile.nfts?.find(
      (nft) => nft.metadata.season === Seasons.Season2 && nft.metadata.badgeId === badgeId,
    );
    if (!nft) {
      return Movements.Dev;
    }

    return nft.metadata.movement as Movements;
  }

  function addGraceCoolDown(date?: Date): Date | undefined {
    if (!date) return;
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + 1);
    return newDate;
  }

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

  const pinkBordered = classNames(borderedBadgeBaseClasses, 'bg-pink-200', 'border-pink-200');

  const pinkShadowed = classNames(
    borderedBadgeBaseClasses,
    'bg-pink-200',
    'border-pink-200',
    'shadow-[0_0_20px_0px_rgba(255,111,200,1)]',
    'hover:shadow-[0_0_30px_0px_rgba(255,111,200,1)]',
  );

  const greenBordered = classNames(borderedBadgeBaseClasses, 'bg-green-300', 'border-green-300');

  const neutralBordered = classNames('w-full', 'transition-all', 'rounded-[30px]', 'box-border', 'aspect-square');

  const timerLabelClasses = classNames('text-[14px]/[20px]', 'text-secondary-content');

  const countdownWrapperClasses = classNames(
    'flex',
    'gap-[10px]',
    'font-clash-grotesk',
    'text-[35px]/[42px]',
    'font-[500]',
    'text-primary-content',
  );
  const countdownItemClasses = classNames('h-min');
</script>

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
    hideBubbles={canReset || !enabled}
    token={getMockBadge(isComplete ? Seasons.Season2 : Seasons.Season1, badgeId, movement)}
    {inColor}
    {blurred}
    {buttonDisabled}
    button={canReset || !enabled
      ? null
      : canInfluence || isStarted
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
    {#if !canReset && recruitment}
      <div class={blurred ? timerOverlayClasses : emptyOverlayClasses}>
        <div class={timerLabelClasses}>
          {#if influenceExpiration && influenceExpiration > new Date()}
            <!-- cannot re-influence yet-->
            {$t('badge_recruitment.main.can_influence_in')}
          {:else if claimExpiration && claimExpiration > new Date()}
            <!-- logic for uninfluenced, time 0 -->
            {$t('badge_recruitment.main.can_claim_in')}
          {/if}
        </div>
        {#if influenceExpiration && influenceExpiration > new Date()}
          <!-- cannot re-influence yet-->
          <Countdown
            on:end={() => dispatch('counterEnd')}
            class={countdownWrapperClasses}
            itemClasses={countdownItemClasses}
            target={influenceExpiration} />
        {:else if claimExpiration && claimExpiration > new Date()}
          <!-- logic for uninfluenceed -->
          <Countdown
            on:end={() => dispatch('counterEnd')}
            class={countdownWrapperClasses}
            itemClasses={countdownItemClasses}
            target={claimExpiration} />
        {/if}
      </div>
    {/if}

    {#if canReset || !enabled}
      <div class="absolute glassy-background-lg px-[20px] flex justify-center items-center w-full h-full">
        {#if !enabled}
          <p>Currently not recruitable</p>
        {/if}
        {#if canReset}
          <div class="f-col items-stretch text-center justify-center items-center space-y-[10px] h-full">
            <h1 class="text-[20px]">Incomplete recruitment</h1>
            <p class="text-secondary-content font-normal">
              You did not finish your recruitment in the previous cycle.
              <br /><br />
              Unlock your dev badge again and try in another cycle.
            </p>
            <ActionButton
              priority="secondary"
              class="!w-[200px] self-center max-h-[40px]"
              disabled={disableResetButton}
              on:click={() => handleResetRecruitment(badgeId)}>
              Cancel recruitment
            </ActionButton>
          </div>
        {/if}
      </div>
    {/if}
  </FactionBadgeItem>
</div>
