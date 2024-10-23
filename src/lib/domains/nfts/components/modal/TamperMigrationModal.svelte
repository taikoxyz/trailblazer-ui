<script lang="ts">
  import { type FactionNames, FACTIONS } from '$configs/badges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { MovementNames, Movements } from '$lib/domains/profile/types/types';
  import timeUntil from '$lib/shared/utils/date/timeUntil';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeMigration, tamperMigrationModal } from '$shared/stores/modal';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../MigrationBadgeItem.svelte';
  import TamperRadio from '../TamperRadio.svelte';
  import { CoreModal, CoreModalDescription, CoreModalFooter, CoreModalHeader, CoreModalTitle } from './components';

  const badgesWrapperClasses = classNames(
    'flex',
    'w-full',
    'max-w-[1200px]',
    'p-[80px]',
    'gap-[20px]',
    'md:gap-[40px]',
    'lg:gap-[80px]',
  );

  $: s1BadgeId = $activeMigration?.s1Badge?.badgeId || 0;

  $: tamperExpiration = $activeMigration?.tamperExpirationTimeout;
  $: isLoading = false;
  $: badgeName = FACTIONS[s1BadgeId] as FactionNames;

  $: selectedMovement = null as null | Movements;

  async function handleTamper() {
    try {
      if (!$account || !$account.address || selectedMovement === null) return;
      isLoading = true;
      const address = $account.address;

      await profileService.tamperMigration($account.address, s1BadgeId, selectedMovement);
      await profileService.getBadgeMigrations(address);
      isLoading = false;

      $tamperMigrationModal = false;
      successToast({
        title: 'Success',
        message: `You have successfully tampered your badge to ${MovementNames[selectedMovement]}`,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      isLoading = false;
      console.error(e);
      errorToast({
        title: 'Refine error',
        message: e.shortMessage ? e.shortMessage : 'Error refining your forge process',
      });
    }
  }

  const detailsClasses = classNames('flex', 'flex-col', 'w-full', 'justify-center', 'items-center', 'gap-[8px]');

  const radioGroupName = 'radio-tamper';
</script>

<CoreModal open={$tamperMigrationModal}>
  <CoreModalHeader>
    <CoreModalTitle>
      {#if tamperExpiration && new Date() < tamperExpiration}
        Tamper available in {timeUntil(tamperExpiration)}
      {:else}
        Your Season 2 Badge is being forged
      {/if}
    </CoreModalTitle>

    <CoreModalDescription>
      Refine your badge to favor the path of your Season 2 {badgeName}
    </CoreModalDescription>
  </CoreModalHeader>

  <div class={badgesWrapperClasses}>
    <MigrationBadgeItem
      value={$activeMigration?.whaleTampers}
      shadow
      badgeMovement={Movements.Whale}
      badgeId={s1BadgeId}
      {badgeName}>
      <div class={detailsClasses}>
        {MovementNames[Movements.Whale]}
        <TamperRadio
          checked={selectedMovement === Movements.Whale}
          on:change={() => {
            selectedMovement = Movements.Whale;
          }}
          name={radioGroupName} />
      </div>
    </MigrationBadgeItem>

    <MigrationBadgeItem
      value={$activeMigration?.devTampers}
      shadow
      badgeMovement={Movements.Dev}
      badgeId={s1BadgeId}
      {badgeName}>
      <div class={detailsClasses}>
        {MovementNames[Movements.Dev]}
        <TamperRadio
          checked={selectedMovement === Movements.Dev}
          on:change={() => {
            selectedMovement = Movements.Dev;
          }}
          name={radioGroupName} />
      </div>
    </MigrationBadgeItem>

    <MigrationBadgeItem
      value={$activeMigration?.minnowTampers}
      shadow
      badgeMovement={Movements.Minnow}
      badgeId={s1BadgeId}
      {badgeName}>
      <div class={detailsClasses}>
        {MovementNames[Movements.Minnow]}
        <TamperRadio
          checked={selectedMovement === Movements.Minnow}
          on:change={() => {
            selectedMovement = Movements.Minnow;
          }}
          name={radioGroupName} />
      </div>
    </MigrationBadgeItem>
  </div>

  <CoreModalFooter>
    <ActionButton
      loading={isLoading}
      on:click={handleTamper}
      disabled={isLoading || selectedMovement === null}
      priority="primary">Tamper</ActionButton>
  </CoreModalFooter>
</CoreModal>
