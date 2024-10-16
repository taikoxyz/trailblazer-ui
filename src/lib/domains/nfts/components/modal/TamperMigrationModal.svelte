<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { errorToast, successToast } from '$components/NotificationToast';
  import { FACTIONS, type FactionNames } from '$configs/badges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { Movements } from '$libs/badges/const';
  import { classNames } from '$libs/util/classNames';
  import { badgeMigrationStore } from '$stores/badgeMigration';
  import { tamperMigrationModal } from '$stores/modal';
  import MigrationBadgeItem from '../MigrationBadgeItem.svelte';
  import TamperRadio from '../TamperRadio.svelte';

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

  $: claimExpiration = $badgeMigrationStore.claimExpirationTimeout;
  $: tamperExpiration = $badgeMigrationStore.tamperExpirationTimeout;
  $: isLoading = false;

  console.log({ $badgeMigrationStore });

  async function handleTamper() {
    try {
      isLoading = true;
      await profileService.tamperMigration(isPinkSelected && !isPurpleSelected);

      isLoading = false;

      $tamperMigrationModal = false;

      successToast({
        title: 'Success',
        message: `You have successfully approved the Season 2 contract for ${s1BadgeName}`,
      });
    } catch (e: any) {
      isLoading = false;
      console.error(e);
      errorToast({
        title: 'Error',
        message: e.message,
      });
    }
  }

  $: $badgeMigrationStore, console.log({ $badgeMigrationStore });

  const badgesWrapperClasses = classNames(
    'flex',
    'w-[700px]',
    'max-w-[90vw]',
    'gap-[20px]',
    'md:gap-[40px]',
    'lg:gap-[80px]',
  );

  $: badgeName = FACTIONS[s1BadgeId] as FactionNames;

  $: isPinkSelected = false;
  $: isPurpleSelected = false;
  function handleOptionClick(event: any) {
    console.log(event);
    const { badgeId } = event.detail;
    console.log(badgeId);
  }
</script>

<CoreModal open={$tamperMigrationModal} loading={isLoading}>
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

  <div class={badgesWrapperClasses}>
    <MigrationBadgeItem shadow badgeMovement={Movements.Based} badgeId={s1BadgeId} {badgeName}>
      <TamperRadio
        checked={isPinkSelected}
        on:change={() => {
          isPinkSelected = true;
          isPurpleSelected = false;
        }}
        name="radio-tamper" />
    </MigrationBadgeItem>
    <MigrationBadgeItem shadow badgeMovement={Movements.Boosted} badgeId={s1BadgeId} {badgeName}>
      <TamperRadio
        on:change={() => {
          isPinkSelected = false;
          isPurpleSelected = true;
        }}
        name="radio-tamper"
        checked={isPurpleSelected} />
    </MigrationBadgeItem>
  </div>

  <CoreModalFooter>
    <ActionButton on:click={handleTamper} disabled={!isPinkSelected && !isPurpleSelected} priority="primary"
      >Tamper</ActionButton>
  </CoreModalFooter>
</CoreModal>
