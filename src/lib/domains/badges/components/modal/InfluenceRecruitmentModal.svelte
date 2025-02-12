<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import { getMovementName, MovementNames, Movements } from '$lib/domains/profile/types/types';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import {
    activeRecruitmentStore,
    currentRecruitmentStore,
    influenceRecruitmentModal,
  } from '$shared/stores/recruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import badgeRecruitmentService from '../../services/BadgeRecruitmentServiceInstance';
  import FancyButton from '../FancyButton.svelte';
  import InfluenceRadio from '../InfluenceRadio.svelte';
  import RecruitmentBadgeItem from '../RecruitmentBadgeItem.svelte';
  import { CoreModal, CoreModalDescription, CoreModalFooter, CoreModalHeader, CoreModalTitle } from './components';

  // Reactive state
  let isLoading = false;
  let selectedMovement: Movements | null = null;
  let whaleBadge: TBBadge | null = null;
  let minnowBadge: TBBadge | null = null;

  $: s1BadgeId = ($currentRecruitmentStore?.badge?.badgeId as number) || 0;
  $: influenceCounter = $currentRecruitmentStore
    ? $currentRecruitmentStore.influences.minnow + $currentRecruitmentStore.influences.whale
    : 0;

  // Fetch badges reactively when s1BadgeId updates
  $: (async () => {
    if (s1BadgeId !== undefined) {
      whaleBadge = await badgeRecruitmentService.getDefaultBadge(s1BadgeId, Movements.Whales);
      minnowBadge = await badgeRecruitmentService.getDefaultBadge(s1BadgeId, Movements.Minnows);
    }
  })();

  async function handleInfluence() {
    try {
      if (!$account || !$account.address || !$currentRecruitmentStore || selectedMovement === null) return;
      isLoading = true;

      await badgeRecruitmentService.influenceRecruitment(
        $account.address,
        $currentRecruitmentStore.badge,
        selectedMovement,
      );

      isLoading = false;
      $influenceRecruitmentModal = false;

      successToast({
        title: $t('badge_recruitment.modal.influence_recruitment.toast.success.title'),
        message: $t('badge_recruitment.modal.influence_recruitment.toast.success.message', {
          values: { movement: MovementNames[selectedMovement] },
        }),
      });
      // eslint-disable-next-line
    } catch (e: any) {
      isLoading = false;
      console.error(e);
      errorToast({
        title: $t('badge_recruitment.modal.influence_recruitment.toast.error.title'),
        message: e.shortMessage
          ? e.shortMessage
          : $t('badge_recruitment.modal.influence_recruitment.toast.error.message'),
      });
    }
  }

  $: influenceRecruitmentModal && $account?.address && badgeRecruitmentService.getUserRecruitments($account.address);

  let maxInfluences = 0;

  onMount(async () => {
    // maxInfluences = (await profileService.getMaxInfluences()) || 5;
    maxInfluences = 5;
  });

  const detailsClasses = classNames('flex', 'flex-col', 'w-full', 'justify-center', 'items-center', 'gap-[8px]');

  const radioGroupName = 'radio-influence';

  const badgesWrapperClasses = classNames(
    'flex',
    'w-full',
    'max-w-[600px]',
    'py-[20px]',
    'gap-[20px]',
    'md:gap-[40px]',
    'lg:gap-[80px]',
  );
</script>

<CoreModal bind:open={$influenceRecruitmentModal}>
  <CoreModalHeader>
    <CoreModalTitle>
      {$t('badge_recruitment.modal.influence_recruitment.title')}
    </CoreModalTitle>

    <CoreModalDescription>
      {$t('badge_recruitment.modal.influence_recruitment.description')}
    </CoreModalDescription>
  </CoreModalHeader>

  {#if $activeRecruitmentStore && whaleBadge && minnowBadge}
    <div class={badgesWrapperClasses}>
      <RecruitmentBadgeItem
        on:click={() => {
          selectedMovement = Movements.Whales;
        }}
        locked
        hideBubbles
        value={$currentRecruitmentStore?.influences.whale}
        shadow={selectedMovement === Movements.Whales}
        token={whaleBadge}>
        <div class={detailsClasses}>
          {getMovementName(Movements.Whales)}
          <InfluenceRadio checked={selectedMovement === Movements.Whales} name={radioGroupName} />
        </div>
      </RecruitmentBadgeItem>

      <RecruitmentBadgeItem
        locked
        hideBubbles
        on:click={() => {
          selectedMovement = Movements.Minnows;
        }}
        shadow={selectedMovement === Movements.Minnows}
        value={$currentRecruitmentStore?.influences.minnow}
        token={minnowBadge}>
        <div class={detailsClasses}>
          {getMovementName(Movements.Minnows)}
          <InfluenceRadio checked={selectedMovement === Movements.Minnows} name={radioGroupName} />
        </div>
      </RecruitmentBadgeItem>
    </div>
  {/if}

  <CoreModalFooter>
    <FancyButton
      loading={isLoading}
      disabled={isLoading || selectedMovement === null || influenceCounter === maxInfluences}
      on:click={handleInfluence}>
      {#if isLoading}
        {$t('badge_recruitment.buttons.influencing')}
      {:else}
        {$t('badge_recruitment.buttons.influence')}
      {/if}
      ( {influenceCounter} / {maxInfluences})
    </FancyButton>
  </CoreModalFooter>
</CoreModal>
