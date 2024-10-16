<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { errorToast, successToast } from '$components/NotificationToast';
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

  $: s1BadgeId = $badgeMigrationStore.s1Badge?.badgeId || 0;

  $: s1BadgeName = FACTIONS[s1BadgeId] as Faction;

  $: isLoading = false;

  async function handleApprove() {
    try {
      if (!$account || !$account.address) return;
      isLoading = true;
      const tokenId = await profileService.getBadgeTokenId($account.address, s1BadgeId);
      await profileService.approve(tokenId);

      isLoading = false;
      $migrationApprovalModal = false;

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
</script>

<CoreModal open={$migrationApprovalModal} loading={isLoading}>
  <CoreModalHeader>
    <CoreModalTitle>Choose your path</CoreModalTitle>
    <CoreModalDescription>
      Upgrade your Season 1 Trailblazer badges to Season 2. You must first approve the Season 2 contract to proceed.
    </CoreModalDescription>
  </CoreModalHeader>

  <CoreModalBadges active={false} badgeId={s1BadgeId} />

  <CoreModalFooter>
    <ActionButton on:click={handleApprove} priority="primary">Approve for <b>{s1BadgeName}</b></ActionButton>
  </CoreModalFooter>
</CoreModal>
