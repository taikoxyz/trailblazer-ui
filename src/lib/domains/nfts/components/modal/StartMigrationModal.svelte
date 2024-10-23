<script lang="ts">
  import { FACTIONS } from '$configs/badges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { type Faction, Movements } from '$lib/domains/profile/types/types';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeMigration, startMigrationModal, tamperMigrationModal } from '$shared/stores/modal';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../MigrationBadgeItem.svelte';
  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: s1BadgeId = $activeMigration?.s1Badge?.badgeId || 0;
  $: badgeName = FACTIONS[s1BadgeId] as Faction;
  $: isLoading = false;

  async function handleStartMigration() {
    try {
      if (!$account || !$account.address) {
        return;
      }
      isLoading = true;
      const address = $account.address;

      profileService.migrationListener(address, async () => {
        await profileService.getBadgeMigrations(address);
        successToast({
          title: 'Success',
          message: `You have successfully started the migration of your ${badgeName} badge.`,
        });
        isLoading = false;
        $startMigrationModal = false;
        $tamperMigrationModal = true;
      });
      await profileService.startMigration(s1BadgeId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      if (e.message.includes('0x3a0147ec')) {
        e.message = 'You have already started another migration.';
      }
      errorToast({
        title: 'Error',
        message: e.message,
      });
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
    <CoreModalTitle>Start your migration</CoreModalTitle>

    <CoreModalDescription>
      Time to forge your Season 2 {badgeName} badge.
    </CoreModalDescription>
  </CoreModalHeader>

  <div class={badgesWrapperClasses}>
    <MigrationBadgeItem badgeMovement={Movements.Dev} badgeId={s1BadgeId} {badgeName}>Season 1</MigrationBadgeItem>
  </div>
  <CoreModalFooter>
    ⚠️ WARNING ⚠️ You won't be able to transfer your season 1 badge for 365 days once the forge process starts

    <ActionButton loading={isLoading} disabled={isLoading} on:click={handleStartMigration} priority="primary"
      >Start Migration</ActionButton>
  </CoreModalFooter>
</CoreModal>
