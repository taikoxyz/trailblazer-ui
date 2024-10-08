<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { badgeMigrationStore } from '$stores/badgeMigration';
  import { startMigrationModal } from '$stores/modal';

  import CoreModal from './components/CoreModal.svelte';
  import CoreModalBadges from './components/CoreModalBadges.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: s1BadgeId = $badgeMigrationStore.s1BadgeId;

  /*
  function closeModal() {
    $startMigrationModal = false;
  }*/

  $: isLoading = false;

  async function handleStartMigration() {
    /*
      if (!$account || !$account.address) return;
      isLoading = true;
      await startMigration($account.address, s1BadgeId);
      isLoading = false;
      //isMigrationStarted = true;*/
  }
</script>

<CoreModal open={$startMigrationModal} loading={isLoading}>
  <CoreModalHeader>
    <CoreModalTitle>Choose your path!</CoreModalTitle>

    <CoreModalDescription>
      Migrate your Season 1 Trailblazer Badges to Season 2. Choose your path wisely!
    </CoreModalDescription>
  </CoreModalHeader>
  <CoreModalBadges active={false} badgeId={s1BadgeId} />

  <CoreModalFooter>
    <div>You must approve the Season 2 contract to proceed.</div>

    <ActionButton on:click={handleStartMigration} priority="primary">Start Migration</ActionButton>
  </CoreModalFooter>
</CoreModal>
