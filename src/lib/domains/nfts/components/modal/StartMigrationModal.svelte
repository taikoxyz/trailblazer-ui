<script lang="ts">
  import { ActionButton } from '$components/Button';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { badgeMigrationStore } from '$stores/badgeMigration';
  import { startMigrationModal } from '$stores/modal';

  import CoreModal from './components/CoreModal.svelte';
  import CoreModalBadges from './components/CoreModalBadges.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: s1BadgeId = $badgeMigrationStore.s1Badge?.badgeId || 0;

  $: isLoading = false;

  async function handleStartMigration() {
    isLoading = true;
    await profileService.startMigration(s1BadgeId);
    isLoading = false;
    $startMigrationModal = false;
  }
</script>

<CoreModal open={$startMigrationModal}>
  <CoreModalHeader>
    <CoreModalTitle>Choose your path!</CoreModalTitle>

    <CoreModalDescription>
      Migrate your Season 1 Trailblazer Badges to Season 2. Choose your path wisely!
    </CoreModalDescription>
  </CoreModalHeader>
  <CoreModalBadges active={false} badgeId={s1BadgeId} />

  <CoreModalFooter>
    <ActionButton loading={isLoading} disabled={isLoading} on:click={handleStartMigration} priority="primary"
      >Start Migration</ActionButton>
  </CoreModalFooter>
</CoreModal>
