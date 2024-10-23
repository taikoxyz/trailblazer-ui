<script lang="ts">
  import { FACTIONS } from '$configs/badges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { type Faction, Movements } from '$lib/domains/profile/types/types';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { badgeMigrationStore } from '$shared/stores/badgeMigration';
  import { startMigrationModal, tamperMigrationModal } from '$shared/stores/modal';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../MigrationBadgeItem.svelte';
  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: s1BadgeId = $badgeMigrationStore.s1Badge?.badgeId || 0;
  $: badgeName = FACTIONS[s1BadgeId] as Faction;
  $: isLoading = false;

  async function handleStartMigration() {
    try {
      if (!$account || !$account.address) {
        return;
      }
      isLoading = true;
      await profileService.startMigration(s1BadgeId);
      await profileService.getBadgeMigrations($account.address);

      successToast({
        title: 'Success',
        message: `You have successfully started the migration of your ${badgeName} badge.`,
      });
      isLoading = false;
      $startMigrationModal = false;
      $tamperMigrationModal = true;
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
      <p>Migrate your Season 1 Trailblazer Badges to Season 2. Choose your path wisely!</p>
      <br />
      <p>⚠️ WARNING ⚠️ You won't be able to transfer your season 1 badge for 365 days once the migration starts</p>
    </CoreModalDescription>
  </CoreModalHeader>

  <div class={badgesWrapperClasses}>
    <MigrationBadgeItem badgeMovement={Movements.Dev} badgeId={s1BadgeId} {badgeName}>Season 1</MigrationBadgeItem>
  </div>
  <CoreModalFooter>
    <ActionButton loading={isLoading} disabled={isLoading} on:click={handleStartMigration} priority="primary"
      >Start Migration</ActionButton>
  </CoreModalFooter>
</CoreModal>
