<script lang="ts">
  import { type FactionNames, FACTIONS } from '$configs/badges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { Movements } from '$lib/domains/profile/types/types';
  import timeUntil from '$lib/shared/utils/date/timeUntil';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { badgeMigrationStore } from '$shared/stores/badgeMigration';
  import { tamperMigrationModal } from '$shared/stores/modal';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../MigrationBadgeItem.svelte';
  import TamperRadio from '../TamperRadio.svelte';
  import { CoreModal, CoreModalDescription, CoreModalFooter, CoreModalHeader, CoreModalTitle } from './components';

  const badgesWrapperClasses = classNames(
    'flex',
    'w-[700px]',
    'max-w-[90vw]',
    'gap-[20px]',
    'md:gap-[40px]',
    'lg:gap-[80px]',
  );

  $: s1BadgeId = $badgeMigrationStore.s1Badge?.badgeId!;

  // $: pinkTampers = $badgeMigrationStore.pinkTampers;
  // $: purpleTampers = $badgeMigrationStore.purpleTampers;

  $: claimExpiration = $badgeMigrationStore.claimExpirationTimeout;
  $: tamperExpiration = $badgeMigrationStore.tamperExpirationTimeout;
  $: isLoading = false;
  $: badgeName = FACTIONS[s1BadgeId] as FactionNames;

  $: isPinkSelected = false;
  $: isPurpleSelected = false;

  async function handleTamper() {
    try {
      if (!$account || !$account.address) return;
      isLoading = true;
      await profileService.tamperMigration($account.address, s1BadgeId, isPinkSelected && !isPurpleSelected);

      isLoading = false;

      $tamperMigrationModal = false;

      const color = isPinkSelected ? 'pink' : 'purple';

      successToast({
        title: 'Success',
        message: `You have successfully tampered your badge to ${color}`,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      isLoading = false;
      console.error(e);
      errorToast({
        title: 'Error',
        message: e.message,
      });
    }
  }
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

  <div class={badgesWrapperClasses}>
    <MigrationBadgeItem shadow badgeMovement={Movements.Whale} badgeId={s1BadgeId} {badgeName}>
      <TamperRadio
        checked={isPinkSelected}
        on:change={() => {
          isPinkSelected = true;
          isPurpleSelected = false;
        }}
        name="radio-tamper" />
    </MigrationBadgeItem>
    <MigrationBadgeItem shadow badgeMovement={Movements.Minnow} badgeId={s1BadgeId} {badgeName}>
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
    <ActionButton
      loading={isLoading}
      on:click={handleTamper}
      disabled={isLoading || (!isPinkSelected && !isPurpleSelected)}
      priority="primary">Tamper</ActionButton>
  </CoreModalFooter>
</CoreModal>
