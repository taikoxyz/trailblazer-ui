<script lang="ts">
  import Flippable from 'svelte-flip';
  import { t } from 'svelte-i18n';

  import MigrationBadgeItem from '$lib/domains/badges/components/MigrationBadgeItem.svelte';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { MovementNames, Movements } from '$lib/domains/profile/types/types';
  import { Spinner } from '$shared/components';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeMigration, endMigrationModal } from '$shared/stores/migration';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import CoreModal from './components/CoreModal.svelte';
  import CoreModalDescription from './components/CoreModalDescription.svelte';
  import CoreModalFooter from './components/CoreModalFooter.svelte';
  import CoreModalHeader from './components/CoreModalHeader.svelte';
  import CoreModalTitle from './components/CoreModalTitle.svelte';

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
      await profileService.endMigration($account.address, $activeMigration.s1Badge, $activeMigration);
      backToken = $activeMigration.s2Badge!;
      isLoading = false;
      isRevealed = true;

      successToast({
        title: $t('badge_forge.modal.end_migration.toast.success.title'),
        message: $t('badge_forge.modal.end_migration.toast.success.message'),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      errorToast({
        title: $t('badge_forge.modal.end_migration.toast.error.title'),
        message: e.shortMessage ? e.shortMessage : $t('badge_forge.modal.end_migration.toast.error.default_message'),
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
    <CoreModalTitle>
      {$t('badge_forge.modal.end_migration.title')}
    </CoreModalTitle>
    <CoreModalDescription>
      {$t('badge_forge.modal.end_migration.description')}
    </CoreModalDescription>
  </CoreModalHeader>

  {#if $activeMigration}
    <div class={badgeWrapperClasses}>
      <Flippable height="400px" width="300px" flip={isRevealed}>
        <MigrationBadgeItem token={$activeMigration.s1Badge} slot="front">
          {$t('badge_forge.labels.season')} 1</MigrationBadgeItem>

        <div slot="back">
          {#if backToken && backToken.metadata.movement !== undefined}
            <MigrationBadgeItem hideBubbles token={backToken}>
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
        {$t('badge_forge.buttons.reveal')}
      </ActionButton>
    {/if}
  </CoreModalFooter>
</CoreModal>
