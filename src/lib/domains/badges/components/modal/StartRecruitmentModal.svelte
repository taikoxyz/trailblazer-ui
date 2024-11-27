<script lang="ts">
  import { format, t } from 'svelte-i18n';

  import RecruitmentBadgeItem from '$lib/domains/badges/components/RecruitmentBadgeItem.svelte';
  import { FactionNames } from '$lib/domains/nfts/types/badges/types';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeRecruitment, influenceRecruitmentModal, startRecruitmentModal } from '$shared/stores/recruitment';
  import { classNames } from '$shared/utils/classNames';

  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: isLoading = false;

  async function handleStartRecruitment() {
    try {
      if (!$account || !$account.address || !$activeRecruitment) {
        return;
      }
      isLoading = true;
      const address = $account.address;

      await profileService.startRecruitment(address, $activeRecruitment.s1Badge, $activeRecruitment);

      successToast({
        title: $t('badge_recruitment.modal.start_recruitment.toast.success.title'),
        message: $t('badge_recruitment.modal.start_recruitment.toast.success.message'),
      });

      isLoading = false;
      $startRecruitmentModal = false;
      $influenceRecruitmentModal = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      let title = $t('badge_recruitment.modal.start_recruitment.toast.error.title');
      let message = $t('badge_recruitment.modal.start_recruitment.toast.error.message.default');

      if (e.message.includes('0x3a0147ec')) {
        title = $t('badge_recruitment.modal.start_recruitment.toast.error.title');
        message = $t('badge_recruitment.modal.start_recruitment.toast.error.message.already_started');
      } else if (e.message.includes('User rejected the request')) {
        title = $t('badge_recruitment.modal.start_recruitment.toast.error.title');
        message = $t('badge_recruitment.modal.start_recruitment.toast.error.message.rejected');
      }

      errorToast({
        title,
        message,
      });

      isLoading = false;
    }
  }

  const badgesWrapperClasses = classNames(
    'flex',
    'w-[250px]',
    'max-w-[80vw]',
    'gap-[20px]',
    'md:gap-[40px]',
    'lg:gap-[80px]',
  );

  const warningClasses = classNames(
    'bg-yellow-800',
    'text-yellow-400',
    'px-[20px]',
    'py-[12px]',
    'rounded-[10px]',
    'flex',
    'gap-[12px]',
    'text-left',
    'text-[16px]/[24px]',
    'font-[400]',
    'justify-center',
    'items-center',
  );

  $: badgeName = Object.values(FactionNames)[$activeRecruitment?.s1Badge?.metadata.badgeId as number] || '';
</script>

<CoreModal bind:open={$startRecruitmentModal}>
  <CoreModalHeader>
    <CoreModalTitle>
      {$t('badge_recruitment.modal.start_recruitment.title')}
    </CoreModalTitle>

    <CoreModalDescription>
      {$format('badge_recruitment.modal.start_recruitment.description', {
        values: {
          badgeName,
        },
      })}
    </CoreModalDescription>
  </CoreModalHeader>

  {#if $activeRecruitment}
    <div class={badgesWrapperClasses}>
      <RecruitmentBadgeItem token={$activeRecruitment.s1Badge}>
        {badgeName}
      </RecruitmentBadgeItem>
    </div>
  {/if}

  <CoreModalFooter>
    <div class={warningClasses}>
      <Icon type="exclamation-circle" size={48} class="mx-[12px]" fillClass="fill-yellow-400" />
      <p>{$t('badge_recruitment.modal.start_recruitment.warning')}</p>
    </div>

    <ActionButton loading={isLoading} disabled={isLoading} on:click={handleStartRecruitment} priority="primary">
      {$t('badge_recruitment.buttons.start_recruitment')}
    </ActionButton>
  </CoreModalFooter>
</CoreModal>
