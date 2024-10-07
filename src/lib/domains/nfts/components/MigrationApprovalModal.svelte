<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { Icon } from '$components/Icon';
  import Spinner from '$components/Spinner/Spinner.svelte';
  import { FACTIONS } from '$configs/badges';
  import { trailblazersBadgesS2Address } from '$generated/abi';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { chainId } from '$lib/shared/utils/chain';
  import { Movements } from '$libs/badges/const';
  import getMigrationStatus from '$libs/badges/migration/getMigrationStatus';
  import type { Faction } from '$libs/profile';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';
  import { badgeMigrationStore, type IBadgeMigration } from '$stores/badgeMigration';
  import { migrationApprovalModal } from '$stores/modal';

  import MigrationBadgeItem from './MigrationBadgeItem.svelte';

  const wrapperClasses = classNames('modal');

  $: s1BadgeId = $badgeMigrationStore.s1BadgeId;

  function closeModal() {
    $migrationApprovalModal = false;
  }

  const closeButtonClasses = classNames(
    'absolute',
    'top-[40px]',
    'right-[40px]',
    'w-[50px]',
    'h-[50px]',
    'bg-secondary-icon',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    'hover:bg-grey-900',
    'transition-all',
  );

  const closeButtonIconClasses = classNames('fill-primary-icon', 'absolute', 'left-[11px]', 'top-[11px]');

  $: s1BadgeName = FACTIONS[s1BadgeId] as Faction;

  const buttonWrapperClasses = classNames(
    'w-[450px]',
    'justify-center',
    'items-center',
    'gap-[20px]',
    'flex',
    'flex-col',
  );

  $: isApproved = false;
  $: isLoading = false;

  $: $migrationApprovalModal, load();

  $: isStarted = false;
  $: isCompleted = false;

  $: isActive = false;

  $: pinkTampers = 0;
  $: purpleTampers = 0;

  $: status = null as null | IBadgeMigration;
  async function load() {
    /*
    if (!$account || !$account.address) return;

    if (!$migrationApprovalModal) {
      isApproved = false;
      isLoading = false;
      return;
    }
    isLoading = true;

    isApproved = await isApprovedToMigrate($account.address, s1BadgeId);

    status = await getMigrationStatus($account.address);
    isActive = isStarted && !isCompleted && status.s1BadgeId === s1BadgeId;

    isLoading = false;*/
  }

  async function beginMigration() {
    /*
    if (!$account || !$account.address) return;
    isLoading = true;
    await startMigration($account.address, s1BadgeId);
    isLoading = false;*/
  }

  async function setApproveToken() {
    if (!$account || !$account.address) return;
    isLoading = true;
    const tokenId = await profileService.getBadgeTokenId($account.address, s1BadgeId);
    await profileService.approve(trailblazersBadgesS2Address[chainId], tokenId);
    isLoading = false;
    isApproved = true;
  }

  function completeMigration() {}

  const tokenCardWrapperClasses = classNames(
    'relative',
    'w-full',
    'flex',
    'flex-row',
    'justify-center',
    'items-center',
    'gap-[40px]',
  );

  const titleClasses = classNames(
    'text-[35px]/[36px]',
    'font-clash-grotesk',
    'font-[500]',

    'text-primary-content',
  );

  const descriptionClasses = classNames('text-secondary-content', 'text-center', 'text-[16px]/[24px]');

  const instructionsClasses = classNames(
    'text-[24px]/[32px]',
    'font-clash-grotesk',
    'pb-[40px]',
    'text-secondary-content',
    'text-center',
  );

  const textWrapperClasses = classNames(
    'flex',
    'flex-col',
    'gap-[20px]',
    'items-center',
    'justify-center',
    'w-full',
    'max-w-[900px]',
  );

  $: badgeLabel = `${s1BadgeName}`;

  const badgeWrapperClasses = classNames('flex-col', 'flex', 'justify-center', 'items-center', 'gap-[25px]');

  const contentWrapperClasses = classNames(
    'bg-elevated-background',
    'w-full',
    'h-full',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'gap-[60px]',
  );
</script>

{#if $migrationApprovalModal}
  <dialog class={wrapperClasses} class:modal-open={true}>
    <div class={contentWrapperClasses}>
      <div class={textWrapperClasses}>
        <div class={titleClasses}>Choose your path!</div>

        <div class={descriptionClasses}>
          {#if isApproved}
            Migrate your Season 1 Trailblazer Badges to Season 2. Choose your path wisely!
          {:else}
            Upgrade your Season 1 Trailblazer badges to Season 2. You must first approve the Season 2 contract to
            proceed.
          {/if}
        </div>
      </div>
      <div class={tokenCardWrapperClasses}>
        <div class={badgeWrapperClasses}>
          <MigrationBadgeItem
            unlocked={isActive}
            value={pinkTampers}
            badgeMovement={Movements.Based}
            badgeId={s1BadgeId}
            badgeName={s1BadgeName} />
        </div>
        {#if !isActive}
          <MigrationBadgeItem unlocked badgeMovement={Movements.Neutral} badgeId={s1BadgeId} badgeName={s1BadgeName} />
        {/if}

        <div class={badgeWrapperClasses}>
          <MigrationBadgeItem
            unlocked={isActive}
            badgeMovement={Movements.Boosted}
            badgeId={s1BadgeId}
            value={purpleTampers}
            badgeName={s1BadgeName} />
        </div>
      </div>

      <div class={buttonWrapperClasses}>
        {#if isLoading}
          <Spinner size="lg" />
        {:else}
          {#if !isActive}
            {#if isApproved}
              <div class={instructionsClasses}>
                The migration for <b>{badgeLabel}</b> is ready.
              </div>
            {/if}
          {/if}
          {#if isApproved}
            {#if isCompleted}
              <ActionButton on:click={completeMigration} priority="primary">Complete Migration</ActionButton>
            {:else if !isStarted}
              <ActionButton on:click={beginMigration} priority="primary">Start Migration</ActionButton>
            {:else if !isActive}
              another migration is in progress
            {/if}
          {:else}
            <ActionButton on:click={setApproveToken} priority="primary">Approve for <b>{s1BadgeName}</b></ActionButton>
          {/if}
        {/if}
      </div>

      <button class={closeButtonClasses} on:click={closeModal}>
        <Icon type="x-close" class={closeButtonIconClasses} size={24} />
      </button>
    </div>
  </dialog>
{/if}
