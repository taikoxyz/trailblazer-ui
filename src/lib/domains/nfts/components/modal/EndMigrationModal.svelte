<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { FactionNames, FACTIONS } from '$configs/badges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { Movements } from '$libs/badges/const';
  import { classNames } from '$libs/util/classNames';
  import { badgeMigrationStore } from '$stores/badgeMigration';
  import { endMigrationModal } from '$stores/modal';
  import MigrationBadgeItem from '../MigrationBadgeItem.svelte';
  import Flippable from 'svelte-flip';

  import CoreModal from './components/CoreModal.svelte';
  import CoreModalBadges from './components/CoreModalBadges.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';
  import { account } from '$stores/account';

  $: s1BadgeId = $badgeMigrationStore.s1Badge?.badgeId || 0;
  $: badgeName = FACTIONS[s1BadgeId] as FactionNames;

  /*
    function closeModal() {
      $endMigrationModal = false;
    }*/

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

  const cardBackClasses = classNames('[transform:rotateY(180deg)]');

  let flip = false;

  $: isRevealed = false;
</script>

<CoreModal open={$endMigrationModal} loading={isLoading}>
  <CoreModalHeader>
    <CoreModalTitle>Congratulations</CoreModalTitle>

    <CoreModalDescription>
      You’ve successfully migrated your {FACTIONS[s1BadgeId]} Badge to Season 2!
    </CoreModalDescription>
  </CoreModalHeader>
  <div class={badgeWrapperClasses}>
    <Flippable height="400px" width="300px" flip={isRevealed}>
      <MigrationBadgeItem slot="front" unlocked badgeMovement={Movements.Neutral} badgeId={s1BadgeId} {badgeName} />

      <MigrationBadgeItem slot="back" unlocked badgeMovement={Movements.Based} badgeId={s1BadgeId} {badgeName} />
    </Flippable>
  </div>

  <CoreModalFooter>
    <ActionButton on:click={handleEndMigration} priority="primary">
      {#if isRevealed}
        Add to collection
      {:else}
        Reveal
      {/if}
    </ActionButton>
  </CoreModalFooter>
</CoreModal>
