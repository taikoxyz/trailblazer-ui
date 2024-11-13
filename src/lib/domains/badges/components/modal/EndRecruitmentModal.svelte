<script lang="ts">
  import Flippable from 'svelte-flip';
  import { t } from 'svelte-i18n';

  import RecruitmentBadgeItem from '$lib/domains/badges/components/RecruitmentBadgeItem.svelte';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { MovementNames, Movements } from '$lib/domains/profile/types/types';
  import { Spinner } from '$shared/components';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeRecruitment, endRecruitmentModal } from '$shared/stores/recruitment';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: isLoading = false;

  $: backToken = null as null | NFT;

  async function handleEndRecruitment() {
    try {
      if (!$account || !$account.address) {
        return;
      }

      if (!$activeRecruitment || !$activeRecruitment.s1Badge) {
        return;
      }
      isLoading = true;
      await profileService.endRecruitment($account.address, $activeRecruitment.s1Badge, $activeRecruitment);
      backToken = $activeRecruitment.s2Badge!;
      // give 1s of buffer before re-fetching
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

  const badgeWrapperClasses = classNames('w-full', 'flex', 'justify-center', 'items-center');

  $: isRevealed = false;

  function getMovementName(token: NFT) {
    return MovementNames[token.metadata.movement as Movements];
  }
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

  {#if $activeRecruitment}
    <div class={badgeWrapperClasses}>
      <Flippable height="400px" width="300px" flip={isRevealed}>
        <RecruitmentBadgeItem locked token={$activeRecruitment.s1Badge} slot="front" />

        <div slot="back">
          {#if backToken && backToken.metadata.movement !== undefined}
            <RecruitmentBadgeItem hideBubbles token={backToken}>
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
      <ActionButton loading={isLoading} disabled={isLoading} on:click={handleEndRecruitment} priority="primary">
        {$t('badge_recruitment.buttons.reveal')}
      </ActionButton>
    {:else}
      <ActionButton on:click={() => ($endRecruitmentModal = false)} priority="secondary">Confirm</ActionButton>
    {/if}
  </CoreModalFooter>
</CoreModal>
