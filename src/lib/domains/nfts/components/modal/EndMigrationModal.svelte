<script lang="ts">
  import Flippable from 'svelte-flip';

  import { FactionNames, FACTIONS } from '$configs/badges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { Movements } from '$lib/domains/profile/types/types';
  import { ActionButton } from '$shared/components/Button';
  import { account } from '$shared/stores';
  import { badgeMigrationStore } from '$shared/stores/badgeMigration';
  import { endMigrationModal } from '$shared/stores/modal';
  import { classNames } from '$shared/utils/classNames';

  import MigrationBadgeItem from '../MigrationBadgeItem.svelte';
  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

  $: s1BadgeId = $badgeMigrationStore.s1Badge?.badgeId || 0;
  $: badgeName = FACTIONS[s1BadgeId] as FactionNames;

  $: isLoading = false;

  async function handleEndMigration() {
    if (!$account || !$account.address) {
      return;
    }
    isLoading = true;
    await profileService.endMigration($account.address, s1BadgeId);
    isLoading = false;
    isRevealed = true;
  }

  const badgeWrapperClasses = classNames('w-full', 'flex', 'justify-center', 'items-center');

  $: isRevealed = false;
</script>

<CoreModal open={$endMigrationModal}>
  <CoreModalHeader>
    <CoreModalTitle>Congratulations</CoreModalTitle>

    <CoreModalDescription>
      You’ve successfully migrated your {FACTIONS[s1BadgeId]} Badge to Season 2!
    </CoreModalDescription>
  </CoreModalHeader>
  <div class={badgeWrapperClasses}>
    <Flippable height="400px" width="300px" flip={isRevealed}>
      <MigrationBadgeItem slot="front" badgeMovement={Movements.Dev} badgeId={s1BadgeId} {badgeName} />

      <MigrationBadgeItem slot="back" badgeMovement={Movements.Whale} badgeId={s1BadgeId} {badgeName} />
    </Flippable>
  </div>

  <CoreModalFooter>
    <ActionButton loading={isLoading} disabled={isLoading} on:click={handleEndMigration} priority="primary">
      {#if isRevealed}
        Add to collection
      {:else}
        Reveal
      {/if}
    </ActionButton>
  </CoreModalFooter>
</CoreModal>
