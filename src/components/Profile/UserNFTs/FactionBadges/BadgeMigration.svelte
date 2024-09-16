<script lang="ts">
  import { onMount } from 'svelte';

  import { ActionButton } from '$components/Button';
  import { FactionNames, FACTIONS } from '$configs/badges';
  import { Movements } from '$libs/badges/const';
  import { getUserBadges } from '$libs/badges/getUserBadges';
  import isApprovedToMigrate from '$libs/badges/isApprovedToMigrate';
  import getEnabledMigrationIds from '$libs/badges/migration/getEnabledMigrationIds';
  import updateMigrationStatus from '$libs/badges/migration/updateMigrationStatus';
  import startMigration from '$libs/badges/startMigration';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';
  import { badgeMigrationStore } from '$stores/badgeMigration';
  import { migrationApprovalModal } from '$stores/modal';

  import { FactionBadgeItem } from '.';

  const wrapperClasses = classNames('w-full', 'flex', 'flex-col', 'items-center', 'justify-start', 'gap-[60px]');

  const sectionDividerClasses = classNames(
    'text-[16px]/[24px]',
    'text-white',
    'font-[700]',
    'border-b',
    'w-full',
    'border-divider-border',
    'pb-[10px]',
  );

  const sectionWrapperClasses = classNames('w-full', 'flex', 'flex-col', 'gap-[30px]');

  const gridClasses = classNames('grid', 'grid-cols-4', 'gap-[24px]');
  $: enabledBadgeIds = [] as number[];

  $: displayActiveMigration = false;

  $: userFactions = {
    [FactionNames.Ravers]: false,
    [FactionNames.Robots]: false,
    [FactionNames.Bouncers]: false,
    [FactionNames.Masters]: false,
    [FactionNames.Monks]: false,
    [FactionNames.Androids]: false,
    [FactionNames.Drummers]: false,
    [FactionNames.Shinto]: false,
  } as Record<FactionNames, boolean>;

  //$: status = null as null | IBadgeMigration;

  async function refresh() {
    if (!$account || !$account.address) {
      return;
    }
    // status = await getMigrationStatus($account.address);
  }

  onMount(async () => {
    enabledBadgeIds = await getEnabledMigrationIds();
    if (!$account || !$account.address) {
      return;
    }
    const address = $account.address;
    await updateMigrationStatus(address);

    displayActiveMigration = $badgeMigrationStore.s1BadgeId > 0;

    userFactions = await getUserBadges(address);

    await refresh();
  });

  function getAsFactionName(name: string) {
    return name as FactionNames;
  }

  const migrateButtonWrapperClasses = classNames('absolute', 'bottom-[10px]', 'w-full', 'px-[10px]');

  async function handleStartMigration(badgeId: number) {
    if (!$account || !$account.address) return;
    const isApproved = await isApprovedToMigrate($account.address, badgeId);

    if (!isApproved) {
      $badgeMigrationStore.s1BadgeId = badgeId;
      $migrationApprovalModal = true;
      return;
    }
    await startMigration($account.address, badgeId);
    await updateMigrationStatus($account.address);
  }
</script>

<div class={wrapperClasses}>
  {#if displayActiveMigration}
    <div class={sectionWrapperClasses}>
      <div class={sectionDividerClasses}>Active Migration</div>
      {JSON.stringify($badgeMigrationStore, null, 2)}
    </div>
  {/if}
  <div class={sectionWrapperClasses}>
    <div class={sectionDividerClasses}>Enabled Migrations</div>

    <div class={gridClasses}>
      {#if enabledBadgeIds.length}
        {#each enabledBadgeIds as badgeId}
          {@const factionName = getAsFactionName(FACTIONS[badgeId])}
          <FactionBadgeItem disabled={!userFactions[factionName]} movement={Movements.Neutral} name={factionName}>
            {#if userFactions[factionName]}
              {#if !displayActiveMigration}
                <div class={migrateButtonWrapperClasses}>
                  <ActionButton on:click={() => handleStartMigration(badgeId)} priority="primary">
                    Start Migration
                  </ActionButton>
                </div>{/if}{/if}
          </FactionBadgeItem>
        {/each}
      {:else}
        No migrations are currently enabled
      {/if}
    </div>
  </div>
</div>
