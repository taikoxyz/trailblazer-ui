<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { badgeMigrationStore } from '$stores/badgeMigration';
  import { tamperMigrationModal } from '$stores/modal';

  import {
    CoreModal,
    CoreModalBadges,
    CoreModalDescription,
    CoreModalFooter,
    CoreModalHeader,
    CoreModalTitle,
  } from './components';

  function timeUntil(targetDate: Date): string {
    const now = new Date();

    // Calculate the difference in milliseconds
    const difference = targetDate.getTime() - now.getTime();

    // If the difference is negative, the target date is in the past
    if (difference <= 0) {
      return '00min 00s';
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Format minutes and seconds to mm:ss
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Return the appropriate format based on the values of hours and minutes
    if (hours > 0) {
      const formattedHours = String(hours).padStart(2, '0');
      return `${formattedHours}h ${formattedMinutes}min ${formattedSeconds}s`;
    } else if (minutes > 0) {
      return `${formattedMinutes}min ${formattedSeconds}s`;
    } else {
      return `${formattedSeconds} seconds`;
    }
  }

  $: s1BadgeId = $badgeMigrationStore.s1Badge?.badgeId!;

  $: pinkTampers = 0;
  $: purpleTampers = 0;

  $: claimExpiration = $badgeMigrationStore.claimExpirationTimeout
  $: tamperExpiration = $badgeMigrationStore.tamperExpirationTimeout

  async function handleTamper() {
    // TODO: re-implement under d3
    /*
    isTampering = true;
    await tamperMigration(type);
    isTampering = false;
    */
  }

  $: $badgeMigrationStore, console.log({ $badgeMigrationStore });
</script>

<CoreModal open={$tamperMigrationModal}>
  <CoreModalHeader>
    <CoreModalTitle>
      {#if tamperExpiration && new Date() < tamperExpiration}
        Tamper available in {timeUntil(tamperExpiration)}
      {:else}
        Migration in progress
      {/if}
    </CoreModalTitle>

    <CoreModalDescription>
      {#if claimExpiration}
        Migration claimable in {timeUntil(claimExpiration)}
      {/if}
    </CoreModalDescription>
  </CoreModalHeader>

  <CoreModalBadges {pinkTampers} {purpleTampers} active={false} badgeId={s1BadgeId} />

  <CoreModalFooter>
    <ActionButton on:click={handleTamper} priority="primary">Tamper</ActionButton>
  </CoreModalFooter>
</CoreModal>
