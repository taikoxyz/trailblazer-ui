<script lang="ts">
  import { t } from 'svelte-i18n';

  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeMigration, refineMigrationModal, startMigrationModal } from '$shared/stores/migration';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../../../badges/components/MigrationBadgeItem.svelte';
  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: s1BadgeId = ($activeMigration?.s1Badge?.metadata.badgeId as number) || 0;
  $: isLoading = false;

  async function handleStartMigration() {
    try {
      if (!$account || !$account.address) {
        return;
      }
      isLoading = true;
      const address = $account.address;

      await profileService.startMigration(s1BadgeId);
      await profileService.getBadgeMigrations(address);
      successToast({
        title: $t('badge_forge.modal.start_migration.toast.success.title'),
        message: $t('badge_forge.modal.start_migration.toast.success.message'),
      });
      isLoading = false;
      $startMigrationModal = false;
      $refineMigrationModal = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      if (e.message.includes('0x3a0147ec')) {
        errorToast({
          title: $t('badge_forge.modal.start_migration.toast.error.title'),
          message: $t('badge_forge.modal.start_migration.toast.error.message.already_started'),
        });
      } else if (e.message.includes('User rejected the request')) {
        errorToast({
          title: $t('badge_forge.modal.start_migration.toast.error.title'),
          message: $t('badge_forge.modal.start_migration.toast.error.message.rejected'),
        });
      } else {
        errorToast({
          title: $t('badge_forge.modal.start_migration.toast.error.title'),
          message: $t('badge_forge.modal.start_migration.toast.error.message.default'),
        });
      }

      isLoading = false;
    }
  }

  const badgesWrapperClasses = classNames(
    'flex',
    'w-[350px]',
    'max-w-[90vw]',
    'gap-[20px]',
    'md:gap-[40px]',
    'lg:gap-[80px]',
  );
</script>

<CoreModal open={$startMigrationModal}>
  <CoreModalHeader>
    <CoreModalTitle>
      {$t('badge_forge.modal.start_migration.title')}
    </CoreModalTitle>

    <CoreModalDescription>
      {$t('badge_forge.modal.start_migration.description')}
    </CoreModalDescription>
  </CoreModalHeader>

  {#if $activeMigration}
    <div class={badgesWrapperClasses}>
      <MigrationBadgeItem token={$activeMigration.s1Badge}>
        {$t('badge_forge.labels.season')} 1</MigrationBadgeItem>
    </div>
  {/if}

  <CoreModalFooter>
    {$t('badge_forge.modal.start_migration.warning')}
    <ActionButton loading={isLoading} disabled={isLoading} on:click={handleStartMigration} priority="primary">
      {$t('badge_forge.buttons.start_migration')}
    </ActionButton>
  </CoreModalFooter>
</CoreModal>
