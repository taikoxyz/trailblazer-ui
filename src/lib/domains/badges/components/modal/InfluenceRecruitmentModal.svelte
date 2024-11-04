<script lang="ts">
  import { t } from 'svelte-i18n';

  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { MovementNames, Movements, Seasons } from '$lib/domains/profile/types/types';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeRecruitment, influenceRecruitmentModal } from '$shared/stores/recruitment';
  import { classNames } from '$shared/utils/classNames';
  import getMockBadge from '$shared/utils/nfts/getMockBadge';

  import InfluenceRadio from '../InfluenceRadio.svelte';
  import RecruitmentBadgeItem from '../RecruitmentBadgeItem.svelte';
  import { CoreModal, CoreModalDescription, CoreModalFooter, CoreModalHeader, CoreModalTitle } from './components';

  const badgesWrapperClasses = classNames(
    'flex',
    'w-full',
    'max-w-[600px]',
    'py-[20px]',
    'gap-[20px]',
    'md:gap-[40px]',
    'lg:gap-[80px]',
  );

  $: s1BadgeId = ($activeRecruitment?.s1Badge?.metadata.badgeId as number) || 0;

  $: isLoading = false;

  $: selectedMovement = null as null | Movements;

  async function handleInfluence() {
    try {
      if (!$account || !$account.address || !$activeRecruitment || selectedMovement === null) return;
      isLoading = true;

      await profileService.influenceRecruitment(
        $account.address,
        $activeRecruitment.s1Badge,
        selectedMovement,
        $activeRecruitment,
      );

      isLoading = false;
      $influenceRecruitmentModal = false;

      successToast({
        title: 'Success',
        message: `You have successfully influenceed your badge to ${MovementNames[selectedMovement]}`,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      isLoading = false;
      console.error(e);
      errorToast({
        title: 'Influence error',
        message: e.shortMessage ? e.shortMessage : 'Error refining your recruitment process',
      });
    }
  }

  const detailsClasses = classNames('flex', 'flex-col', 'w-full', 'justify-center', 'items-center', 'gap-[8px]');

  const radioGroupName = 'radio-influence';
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
    <ActionButton
      loading={isLoading}
      on:click={handleInfluence}
      disabled={isLoading || selectedMovement === null}
      priority="primary">
      {$t('badge_recruitment.buttons.influence')}
    </ActionButton>
  </CoreModalFooter>
</CoreModal>
