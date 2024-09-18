<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { Icon } from '$components/Icon';
  import Spinner from '$components/Spinner/Spinner.svelte';
  import { FACTIONS } from '$configs/badges';
  import approve from '$libs/badges/approve';
  import { Movements } from '$libs/badges/const';
  import { getTokenId } from '$libs/badges/getTokenId';
  import isApprovedToMigrate from '$libs/badges/isApprovedToMigrate';
  import getMigrationStatus from '$libs/badges/migration/getMigrationStatus';
  import setApprovalForAll from '$libs/badges/setApprovalForAll';
  import startMigration from '$libs/badges/startMigration';
  import tamperMigration from '$libs/badges/tamperMigration';
  import { chainId } from '$libs/chain';
  import type { Faction } from '$libs/profile';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';
  import { badgeMigrationStore } from '$stores/badgeMigration';
  import { badgeMigrationModal } from '$stores/modal';

  import { trailblazersBadgesS2Address } from '../../../../generated/abi';
  import MigrationBadgeItem from './MigrationBadgeItem.svelte';

  function timeUntil(targetDate: Date): string {
    const now = new Date();

    // Calculate the difference in milliseconds
    const difference = targetDate.getTime() - now.getTime();

    // If the difference is negative, the target date is in the past
    if (difference <= 0) {
      return '00min 00s';
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Format minutes and seconds to mm:ss
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Return the appropriate format based on the values of hours and minutes
    if (hours > 0) {
      const formattedHours = String(hours).padStart(2, '0');
      return `${formattedHours}h ${formattedMinutes}min ${formattedSeconds}s`;
    } else if (minutes > 0) {
      return `${formattedMinutes}min ${formattedSeconds}s`;
    } else {
      return `${formattedSeconds} seconds`;
    }
  }

  const wrapperClasses = classNames(
    'z-100',
    'fixed',
    'top-0',
    'gap-[60px]',
    'left-0',
    'w-[100vw]',
    'h-[100vh]',
    'overflow-hidden',
    'glassy-background-lg',
    'bg-black',
    'bg-opacity-70',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
  );

  $: s1BadgeId = $badgeMigrationStore.s1BadgeId;

  function closeModal() {
    $badgeMigrationModal = false;
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

  // $: isMigrationStarted = false;
  // $: isMigrationCompleted = false;
  $: isApproved = false;
  $: isLoading = false;

  $: $badgeMigrationModal, load();

  $: isStarted = false;
  $: isCompleted = false;

  $: isActive = false;

  $: pinkTampers = 0;
  $: purpleTampers = 0;

  $: claimExpiration = undefined as Date | undefined;
  $: tamperExpiration = undefined as Date | undefined;

  async function load() {
    if (!$account || !$account.address) return;

    if (!$badgeMigrationModal) {
      // closing modal, reset
      //  isMigrationStarted = false;
      // isMigrationCompleted = false;
      isApproved = false;
      isLoading = false;
      return;
    }
    isLoading = true;

    isApproved = await isApprovedToMigrate($account.address, s1BadgeId);

    const status = await getMigrationStatus($account.address);
    isStarted = status.isStarted;
    isCompleted = status.isCompleted;
    pinkTampers = status.pinkTampers;
    purpleTampers = status.purpleTampers;
    claimExpiration = status.claimExpiration;
    tamperExpiration = status.tamperExpiration;
    isActive = isStarted && !isCompleted && status.s1BadgeId === s1BadgeId;

    isLoading = false;
  }

  async function beginMigration() {
    if (!$account || !$account.address) return;
    isLoading = true;
    await startMigration($account.address, s1BadgeId);
    isLoading = false;
    //isMigrationStarted = true;
  }

  async function setApproveSeason2() {
    if (!$account || !$account.address) return;
    isLoading = true;
    await setApprovalForAll(trailblazersBadgesS2Address[chainId]);
    isLoading = false;
    isApproved = true;
  }

  async function setApproveToken() {
    if (!$account || !$account.address) return;
    isLoading = true;
    const tokenId = await getTokenId($account.address, s1BadgeId);
    await approve(trailblazersBadgesS2Address[chainId], tokenId);
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

  async function activateTamper(type: 'pink' | 'purple') {
    isTampering = true;
    await tamperMigration(type);
    isTampering = false;
  }

  $: isTampering = false;

  $: badgeLabel = `#${s1BadgeId + 1} - ${s1BadgeName}`;

  const badgeWrapperClasses = classNames('flex-col', 'flex', 'justify-center', 'items-center', 'gap-[25px]');

  const tamperButtonClasses = classNames(
    'rounded-full',
    'px-[75px]',
    'py-[15px]',
    'font-clash-grotesk',
    'text-[#fff]',
    'font-[700]',
    'transition-all',
    'disabled:border-neutral',
    'disabled:text-neutral',
    'border',
    'disabled:bg-transparent',
    'disabled:shadow-none',
    'bg-opacity-60',
    'hover:bg-opacity-100',
    'bg-transparent',
    'w-full',
  );

  const pinkTamperButtonClasses = classNames(
    tamperButtonClasses,
    'shadow-[0_0px_30px_0px_#E81899]',
    'border-secondary',
    'bg-secondary',
    'hover:shadow-[0_0px_50px_0px_#E81899]',
  );

  const purpleTamperButtonClasses = classNames(
    tamperButtonClasses,
    'shadow-[0_0px_30px_0px_#5D08C8]',
    'border-[#5D08C8]',

    'bg-[#5D08C8]',
    'hover:shadow-[0_0px_50px_0px_#5D08C8]',
  );
</script>

{#if $badgeMigrationModal}
  <div class={wrapperClasses}>
    <div class={textWrapperClasses}>
      <div class={titleClasses}>
        {#if isActive}
          {#if tamperExpiration && new Date() < tamperExpiration}
            Tamper available in {timeUntil(tamperExpiration)}
          {:else}
            Migration in progress
          {/if}
        {:else}
          Choose your path!{/if}
      </div>

      <div class={descriptionClasses}>
        {#if isActive}
          {#if claimExpiration}
            Migration claimable in {timeUntil(claimExpiration)}
          {/if}
        {:else}
          Migrate your Season 1 Trailblazer Badges to Season 2. Choose your path wisely!
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

        {#if tamperExpiration && new Date() > tamperExpiration}
          <button disabled={isTampering} on:click={() => activateTamper('pink')} class={pinkTamperButtonClasses}>
            Tamper</button>
        {/if}
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
        {#if tamperExpiration && new Date() > tamperExpiration}
          <button disabled={isTampering} on:click={() => activateTamper('purple')} class={purpleTamperButtonClasses}>
            Tamper</button>
        {/if}
      </div>
    </div>

    <div class={buttonWrapperClasses}>
      {#if isLoading}
        <Spinner size="lg" />
      {:else}
        {#if !isActive}
          <div class={instructionsClasses}>
            {#if isApproved}
              The migration for <b>{badgeLabel}</b> is ready.
            {:else}
              You must approve the Season 2 contract to proceed.
            {/if}
          </div>{/if}
        {#if isApproved}
          {#if isCompleted}
            <ActionButton on:click={completeMigration} priority="primary">Complete Migration</ActionButton>
          {:else if !isStarted}
            <ActionButton on:click={beginMigration} priority="primary">Start Migration</ActionButton>
          {:else if !isActive}
            another migration is in progress
          {/if}
        {:else}
          <ActionButton on:click={setApproveToken} priority="primary"
            >Approve for <b>#{s1BadgeId + 1} - {s1BadgeName}</b></ActionButton>
          <div class="w-1/2">
            <div class="divider">or</div>
          </div>
          <ActionButton on:click={setApproveSeason2} priority="secondary">Approve All</ActionButton>
        {/if}
      {/if}
    </div>

    <button class={closeButtonClasses} on:click={closeModal}>
      <Icon type="x-close" class={closeButtonIconClasses} size={24} />
    </button>
  </div>
{/if}
