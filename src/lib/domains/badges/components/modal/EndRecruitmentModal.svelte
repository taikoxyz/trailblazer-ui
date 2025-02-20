<script lang="ts">
  import { tick } from 'svelte';
  import Flippable from 'svelte-flip';
  import { t } from 'svelte-i18n';

  import RecruitmentBadgeItem from '$lib/domains/badges/components/RecruitmentBadgeItem.svelte';
  import { MovementNames, Movements } from '$lib/domains/profile/types/types';
  import { Spinner } from '$shared/components';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { currentRecruitmentStore, endRecruitmentModal } from '$shared/stores/recruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import badgeRecruitmentService from '../../services/BadgeRecruitmentServiceInstance';
  import FancyButton from '../FancyButton.svelte';
  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: isLoading = false;

  $: backToken = null as null | TBBadge;

  async function handleEndRecruitment() {
    try {
      if (!$account || !$account.address) {
        return;
      }

      if (!$currentRecruitmentStore || !$currentRecruitmentStore.badge) {
        return;
      }
      isLoading = true;
      await badgeRecruitmentService.endRecruitment($account.address, $currentRecruitmentStore.badge);
      backToken = $currentRecruitmentStore.recruitedBadge!;
      tick();
      isRevealed = true;

      successToast({
        title: $t('badge_recruitment.modal.end_recruitment.toast.success.title'),
        message: $t('badge_recruitment.modal.end_recruitment.toast.success.message'),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      errorToast({
        title: $t('badge_recruitment.modal.end_recruitment.toast.error.title'),
        message: e.shortMessage
          ? e.shortMessage
          : $t('badge_recruitment.modal.end_recruitment.toast.error.default_message'),
      });
    } finally {
      isLoading = false;
    }
  }

  $: isRevealed = false;

  function getMovementName(token: TBBadge) {
    return MovementNames[token.movement as Movements];
  }

  const badgeWrapperClasses = classNames('w-full', 'flex', 'justify-center', 'items-center');
</script>

<CoreModal bind:open={$endRecruitmentModal}>
  <CoreModalHeader>
    <CoreModalTitle>
      {$t('badge_recruitment.modal.end_recruitment.title')}
    </CoreModalTitle>
    <CoreModalDescription>
      {$t('badge_recruitment.modal.end_recruitment.description')}
    </CoreModalDescription>
  </CoreModalHeader>

  {#if $currentRecruitmentStore}
    <div class={badgeWrapperClasses}>
      <Flippable height="400px" width="300px" flip={isRevealed}>
        <RecruitmentBadgeItem locked token={$currentRecruitmentStore.badge} slot="front">?</RecruitmentBadgeItem>
        <div slot="back">
          {#if backToken && backToken.movement !== undefined}
            <RecruitmentBadgeItem token={backToken}>
              {getMovementName(backToken)}
            </RecruitmentBadgeItem>
          {:else}
            <Spinner />
          {/if}
        </div>
      </Flippable>
    </div>
  {/if}

  <CoreModalFooter>
    {#if !isRevealed}
      <FancyButton disabled={isLoading} loading={isLoading} on:click={handleEndRecruitment}>
        {$t('badge_recruitment.buttons.reveal')}
      </FancyButton>
    {:else}
      <ActionButton on:click={() => ($endRecruitmentModal = false)} priority="primary">Confirm</ActionButton>
    {/if}
  </CoreModalFooter>
</CoreModal>
