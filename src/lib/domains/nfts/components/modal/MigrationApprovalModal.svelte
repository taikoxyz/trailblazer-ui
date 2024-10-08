<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { FACTIONS } from '$configs/badges';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import type { Faction } from '$libs/profile';
  import { account } from '$stores/account';
  import { badgeMigrationStore } from '$stores/badgeMigration';
  import { migrationApprovalModal } from '$stores/modal';

  import {
    CoreModal,
    CoreModalBadges,
    CoreModalDescription,
    CoreModalFooter,
    CoreModalHeader,
    CoreModalTitle,
  } from './components';

  $: s1BadgeId = $badgeMigrationStore.s1BadgeId;

  $: s1BadgeName = FACTIONS[s1BadgeId] as Faction;

  $: isLoading = false;

  async function handleApprove() {
    if (!$account || !$account.address) return;
    isLoading = true;
    const tokenId = await profileService.getBadgeTokenId($account.address, s1BadgeId);
    await profileService.approve(tokenId);
    isLoading = false;
  }
</script>

<CoreModal open={$migrationApprovalModal} loading={isLoading}>
  <CoreModalHeader>
    <CoreModalTitle>Choose your path!</CoreModalTitle>
    <CoreModalDescription>
      Upgrade your Season 1 Trailblazer badges to Season 2. You must first approve the Season 2 contract to proceed.
    </CoreModalDescription>
  </CoreModalHeader>

  <CoreModalBadges active={false} badgeId={s1BadgeId} />

  <CoreModalFooter>
    <ActionButton on:click={handleApprove} priority="primary">Approve for <b>{s1BadgeName}</b></ActionButton>
  </CoreModalFooter>
</CoreModal>
