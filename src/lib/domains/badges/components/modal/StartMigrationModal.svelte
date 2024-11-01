<script lang="ts">
  import { format, t } from 'svelte-i18n';

  import { FACTIONS } from '$configs/badges';
  import MigrationBadgeItem from '$lib/domains/badges/components/MigrationBadgeItem.svelte';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeMigration, refineMigrationModal, startMigrationModal } from '$shared/stores/migration';
  import { classNames } from '$shared/utils/classNames';

  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: isLoading = false;

  async function handleStartMigration() {
    try {
      if (!$account || !$account.address || !$activeMigration) {
        return;
      }
      isLoading = true;
      const address = $account.address;

      await profileService.startMigration(address, $activeMigration.s1Badge, $activeMigration);

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
      let title = $t('badge_forge.modal.start_migration.toast.error.title');
      let message = $t('badge_forge.modal.start_migration.toast.error.message.default');

      if (e.message.includes('0x3a0147ec')) {
        title = $t('badge_forge.modal.start_migration.toast.error.title');
        message = $t('badge_forge.modal.start_migration.toast.error.message.already_started');
      } else if (e.message.includes('User rejected the request')) {
        title = $t('badge_forge.modal.start_migration.toast.error.title');
        message = $t('badge_forge.modal.start_migration.toast.error.message.rejected');
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
    'bg-[#382800]',
    'text-[#EBB222]',
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

  $: badgeName = FACTIONS[$activeMigration?.s1Badge?.metadata.badgeId as number] || '';
</script>

<CoreModal bind:open={$startMigrationModal}>
  <CoreModalHeader>
    <CoreModalTitle>
      {$t('badge_forge.modal.start_migration.title')}
    </CoreModalTitle>

    <CoreModalDescription>
      {$format('badge_forge.modal.start_migration.description', {
        values: {
          badgeName,
        },
      })}
    </CoreModalDescription>
  </CoreModalHeader>

  {#if $activeMigration}
    <div class={badgesWrapperClasses}>
      <MigrationBadgeItem token={$activeMigration.s1Badge}>
        {badgeName}
      </MigrationBadgeItem>
    </div>
  {/if}

  <CoreModalFooter>
    <div class={warningClasses}>
      <img src="/icons/exclaimation-circle.svg" alt="Warning" class="w-[24px] h-[24px]" />
      <p>{$t('badge_forge.modal.start_migration.warning')}</p>
    </div>

    <ActionButton loading={isLoading} disabled={isLoading} on:click={handleStartMigration} priority="primary">
      {$t('badge_forge.buttons.start_migration')}
    </ActionButton>
  </CoreModalFooter>
</CoreModal>
