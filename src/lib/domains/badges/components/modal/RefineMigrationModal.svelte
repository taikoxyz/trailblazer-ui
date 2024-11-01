<script lang="ts">
  import { t } from 'svelte-i18n';

  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { MovementNames, Movements, Seasons } from '$lib/domains/profile/types/types';
  import { ActionButton } from '$shared/components/Button';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores';
  import { activeMigration, refineMigrationModal } from '$shared/stores/migration';
  import { classNames } from '$shared/utils/classNames';
  import getMockBadge from '$shared/utils/nfts/getMockBadge';

  import MigrationBadgeItem from '../MigrationBadgeItem.svelte';
  import TamperRadio from '../RefineRadio.svelte';
  import { CoreModal, CoreModalDescription, CoreModalFooter, CoreModalHeader, CoreModalTitle } from './components';

  const badgesWrapperClasses = classNames(
    'flex',
    'w-full',
    'max-w-[600px]',
    'py-[20px]',
    'gap-[20px]',
    'md:gap-[40px]',
    'lg:gap-[80px]',
  );

  $: s1BadgeId = ($activeMigration?.s1Badge?.metadata.badgeId as number) || 0;

  $: isLoading = false;

  $: selectedMovement = null as null | Movements;

  async function handleRefine() {
    try {
      if (!$account || !$account.address || !$activeMigration || selectedMovement === null) return;
      isLoading = true;

      await profileService.refineMigration(
        $account.address,
        $activeMigration.s1Badge,
        selectedMovement,
        $activeMigration,
      );

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

<CoreModal bind:open={$refineMigrationModal}>
  <CoreModalHeader>
    <CoreModalTitle>
      {$t('badge_forge.modal.refine_migration.title')}
    </CoreModalTitle>

    <CoreModalDescription>
      {$t('badge_forge.modal.refine_migration.description')}
    </CoreModalDescription>
  </CoreModalHeader>

  {#if $activeMigration}
    <div class={badgesWrapperClasses}>
      <MigrationBadgeItem
        hideBubbles
        value={$activeMigration?.whaleTampers}
        shadow={selectedMovement === Movements.Whale}
        token={getMockBadge(Seasons.Season2, s1BadgeId, Movements.Whale)}>
        <div class={detailsClasses}>
          <TamperRadio
            checked={selectedMovement === Movements.Whale}
            on:change={() => {
              selectedMovement = Movements.Whale;
            }}
            name={radioGroupName} />
        </div>
      </MigrationBadgeItem>

      <MigrationBadgeItem
        hideBubbles
        shadow={selectedMovement === Movements.Minnow}
        value={$activeMigration?.minnowTampers}
        token={getMockBadge(Seasons.Season2, s1BadgeId, Movements.Minnow)}>
        <div class={detailsClasses}>
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
      priority="primary">
      {$t('badge_forge.buttons.refine')}
    </ActionButton>
  </CoreModalFooter>
</CoreModal>
