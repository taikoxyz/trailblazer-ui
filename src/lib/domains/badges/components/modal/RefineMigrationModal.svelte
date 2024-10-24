<script lang="ts">
  import { type FactionNames, FACTIONS } from '$configs/badges';
  import { trailblazersBadgesS2Address } from '$generated/abi';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { MovementNames, Movements } from '$lib/domains/profile/types/types';
  import timeUntil from '$lib/shared/utils/date/timeUntil';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeMigration, refineMigrationModal } from '$shared/stores/modal';
  import { chainId } from '$shared/utils/chain';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../MigrationBadgeItem.svelte';
  import TamperRadio from '../RefineRadio.svelte';
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

  $: refineExpiration = $activeMigration?.tamperExpirationTimeout;
  $: isLoading = false;
  $: badgeName = FACTIONS[s1BadgeId] as FactionNames;

  $: selectedMovement = null as null | Movements;

  async function handleRefine() {
    try {
      if (!$account || !$account.address || selectedMovement === null) return;
      isLoading = true;
      const address = $account.address;

      await profileService.refineMigration($account.address, s1BadgeId, selectedMovement);
      await profileService.getBadgeMigrations(address);
      isLoading = false;

      $refineMigrationModal = false;
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

<CoreModal open={$refineMigrationModal}>
  <CoreModalHeader>
    <CoreModalTitle>
      {#if refineExpiration && new Date() < refineExpiration}
        Refine available in {timeUntil(refineExpiration)}
      {:else}
        Your Season 2 Badge is being forged
      {/if}
    </CoreModalTitle>

    <CoreModalDescription>
      Refine your badge to favor the path of your Season 2 {badgeName}
    </CoreModalDescription>
  </CoreModalHeader>

  {#if $activeMigration}
    <div class={badgesWrapperClasses}>
      <MigrationBadgeItem
        value={$activeMigration?.whaleTampers}
        shadow
        token={profileService.getMockBadge(trailblazersBadgesS2Address[chainId], s1BadgeId, Movements.Whale)}>
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

      <MigrationBadgeItem value={$activeMigration?.devTampers} shadow token={$activeMigration.s1Badge}>
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
        token={profileService.getMockBadge(trailblazersBadgesS2Address[chainId], s1BadgeId, Movements.Minnow)}>
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
  {/if}
  <CoreModalFooter>
    <ActionButton
      loading={isLoading}
      on:click={handleRefine}
      disabled={isLoading || selectedMovement === null}
      priority="primary">Refine</ActionButton>
  </CoreModalFooter>
</CoreModal>
