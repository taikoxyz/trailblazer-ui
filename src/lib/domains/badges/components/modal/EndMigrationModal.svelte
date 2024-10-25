<script lang="ts">
  import Flippable from 'svelte-flip';

  import { FACTIONS } from '$configs/badges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { MovementNames, Movements } from '$lib/domains/profile/types/types';
  import { Spinner } from '$shared/components';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeMigration, endMigrationModal } from '$shared/stores/migration';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../../../badges/components/MigrationBadgeItem.svelte';
  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: s1BadgeId = ($activeMigration?.s1Badge?.metadata.badgeId as number) || 0;

  $: isLoading = false;

  $: backToken = null as null | NFT;

  async function handleEndMigration() {
    try {
      if (!$account || !$account.address) {
        return;
      }

      if (!$activeMigration || !$activeMigration.s1Badge) {
        return;
      }
      isLoading = true;
      backToken = await profileService.endMigration($account.address, $activeMigration.s1Badge);
      isLoading = false;
      isRevealed = true;

      successToast({
        title: 'Badge forge claim',
        message: `You have successfully claimed your badge`,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      errorToast({
        title: 'Badge forge claim error',
        message: e.shortMessage ? e.shortMessage : 'Error claiming your badge forge',
      });
    }
  }

  const badgeWrapperClasses = classNames('w-full', 'flex', 'justify-center', 'items-center');

  $: isRevealed = false;

  function getMovementName(token: NFT) {
    return MovementNames[token.metadata.movement as Movements];
  }
</script>

<CoreModal open={$endMigrationModal}>
  <CoreModalHeader>
    <CoreModalTitle>Congratulations</CoreModalTitle>

    <CoreModalDescription>
      You’ve successfully migrated your {FACTIONS[s1BadgeId]} Badge to Season 2! Click on the reveal button to see your new
      badge.
    </CoreModalDescription>
  </CoreModalHeader>

  {#if $activeMigration}
    <div class={badgeWrapperClasses}>
      <Flippable height="400px" width="300px" flip={isRevealed}>
        <MigrationBadgeItem token={$activeMigration.s1Badge} slot="front">Season 1</MigrationBadgeItem>

        <div slot="back">
          {#if backToken && backToken.metadata.movement !== undefined}
            <MigrationBadgeItem token={backToken}>
              {getMovementName(backToken)}
            </MigrationBadgeItem>
          {:else}
            <Spinner />
          {/if}
        </div>
      </Flippable>
    </div>
  {/if}

  <CoreModalFooter>
    {#if !isRevealed}
      <ActionButton loading={isLoading} disabled={isLoading} on:click={handleEndMigration} priority="primary">
        Reveal
      </ActionButton>
    {/if}
  </CoreModalFooter>
</CoreModal>
