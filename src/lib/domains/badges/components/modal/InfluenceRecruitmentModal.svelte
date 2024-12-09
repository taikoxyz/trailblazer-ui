<script lang="ts">
  import * as Sentry from '@sentry/sveltekit';
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { MovementNames, Movements, Seasons } from '$lib/domains/profile/types/types';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeRecruitment, influenceRecruitmentModal } from '$shared/stores/recruitment';
  import { classNames } from '$shared/utils/classNames';
  import getMockBadge from '$shared/utils/nfts/getMockBadge';

  import FancyButton from '../FancyButton.svelte';
  import InfluenceRadio from '../InfluenceRadio.svelte';
  import RecruitmentBadgeItem from '../RecruitmentBadgeItem.svelte';
  import { CoreModal, CoreModalDescription, CoreModalFooter, CoreModalHeader, CoreModalTitle } from './components';

  $: isLoading = false;
  $: selectedMovement = null as null | Movements;

  $: s1BadgeId = ($activeRecruitment?.s1Badge?.metadata.badgeId as number) || 0;
  $: influenceCounter = $activeRecruitment
    ? $activeRecruitment.minnowInfluences + $activeRecruitment?.whaleInfluences
    : 0;

  async function handleInfluence() {
    try {
      if (!$account || !$account.address || !$activeRecruitment || selectedMovement === null) return;
      isLoading = true;

      await profileService?.influenceRecruitment(
        $account.address,
        $activeRecruitment.s1Badge,
        selectedMovement,
        $activeRecruitment,
      );

      isLoading = false;
      $influenceRecruitmentModal = false;

      successToast({
        title: $t('badge_recruitment.modal.influence_recruitment.toast.success.title'),
        message: $t('badge_recruitment.modal.influence_recruitment.toast.success.message', {
          values: { movement: MovementNames[selectedMovement] },
        }),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      isLoading = false;
      console.error(e);
      errorToast({
        title: $t('badge_recruitment.modal.influence_recruitment.toast.error.title'),
        message: e.shortMessage
          ? e.shortMessage
          : $t('badge_recruitment.modal.influence_recruitment.toast.error.message'),
      });
      Sentry.captureException(e);
    }
  }

  $: maxInfluences = 0;
  onMount(async () => {
    maxInfluences = (await profileService?.getMaxInfluences()) || 5;
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

  {#if $activeRecruitment}
    <div class={badgesWrapperClasses}>
      <RecruitmentBadgeItem
        locked
        on:click={() => {
          selectedMovement = Movements.Whale;
        }}
        hideBubbles
        value={$activeRecruitment?.whaleInfluences}
        shadow={selectedMovement === Movements.Whale}
        token={getMockBadge(Seasons.Season2, s1BadgeId, Movements.Whale)}>
        <div class={detailsClasses}>
          <InfluenceRadio checked={selectedMovement === Movements.Whale} name={radioGroupName} />
        </div>
      </RecruitmentBadgeItem>

      <RecruitmentBadgeItem
        locked
        hideBubbles
        on:click={() => {
          selectedMovement = Movements.Minnow;
        }}
        shadow={selectedMovement === Movements.Minnow}
        value={$activeRecruitment?.minnowInfluences}
        token={getMockBadge(Seasons.Season2, s1BadgeId, Movements.Minnow)}>
        <div class={detailsClasses}>
          <InfluenceRadio checked={selectedMovement === Movements.Minnow} name={radioGroupName} />
        </div>
      </RecruitmentBadgeItem>
    </div>
  {/if}
  <CoreModalFooter>
    <FancyButton
      loading={isLoading}
      disabled={isLoading || selectedMovement === null || influenceCounter === maxInfluences}
      on:click={handleInfluence}>
      {$t('badge_recruitment.buttons.influence')}
      ( {influenceCounter} / {maxInfluences})
    </FancyButton>
  </CoreModalFooter>
</CoreModal>
