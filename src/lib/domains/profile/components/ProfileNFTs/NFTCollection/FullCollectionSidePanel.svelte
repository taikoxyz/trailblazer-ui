<script lang="ts">
  import { t } from 'svelte-i18n';

  import BadgeRecruitmentItem from '$lib/domains/badges/components/BadgeRecruitmentItem.svelte';
  import Countdown from '$lib/domains/badges/components/Countdown.svelte';
  import RecruitingStatus from '$lib/domains/badges/components/RecruitingStatus.svelte';
  import type { Movements } from '$lib/domains/profile/types/types';
  import { getMovementName, Multipliers } from '$lib/domains/profile/types/types';
  import { ExplorerLink } from '$shared/components/Links';
  import { currentRecruitmentStore } from '$shared/stores/recruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { isBadgeLocked } from '$shared/utils/badges/isBadgeLocked';
  import { classNames } from '$shared/utils/classNames';

  import { FactionBadgeItem } from '../FactionBadges';

  export let selectedBadge: TBBadge;
  export let movement: Movements | 'taikoon' | 'snaefell';
  export let recruitingView: boolean = false;

  const wrapperClasses = classNames(
    'md:w-[324px]',
    'bg-elevated-background',
    'p-[24px]',
    'gap-[60px]',
    'rounded-[20px]',
  );

  const badgeItemClasses = classNames(
    'max-h-[276px]',
    'max-w-[276px]',
    'lg:h-[276px]',
    'lg:w-[276px]',
    'rounded-[30px]',
  );

  const countdownClasses = classNames(
    'flex',
    'gap-[5px]',
    'font-clash-grotesk',
    'text-[16px]',
    'font-[500]',
    'text-primary-content',
  );

  const collectionDetailsWrapperClasses = classNames('space-y-[10px]', 'w-full', 'order-3');
  const collectionDetailsRowClasses = classNames('f-row', 'justify-between', 'font-bold', 'w-full');

  const detailsContainerClasses = classNames('collapse', 'collapse-arrow', 'mt-[25px]');
  const detailsTitleClasses = classNames('collapse-title', 'cursor-pointer', 'w-full', 'text-left', 'px-0');

  const detailsContentClasses = classNames(
    'p-0',
    'collapse-content',
    'peer-checked:max-h-[100rem]',
    'max-h-0',
    'overflow-hidden',
    'peer-checked:overflow-visible',
    'transition-all',
  );

  const detailsUuid = crypto.randomUUID();

  $: isRecruiting = $currentRecruitmentStore?.cooldowns.claim
    ? new Date($currentRecruitmentStore.cooldowns.claim) > new Date()
    : false;

  $: isInfluencing = $currentRecruitmentStore?.cooldowns.influence
    ? new Date($currentRecruitmentStore.cooldowns.influence) > new Date()
    : false;
</script>

<div class={wrapperClasses}>
  {#if $currentRecruitmentStore?.badge?.tokenId === selectedBadge.tokenId}
    {#if isRecruiting && !isInfluencing}
      <div class="relative">
        <div class="absolute inset-0 flex items-center justify-center z-50 gap-5 f-col">
          Recruiting
          <Countdown
            class="f-row gap-2"
            itemClasses={countdownClasses}
            target={$currentRecruitmentStore?.cooldowns.claim} />
        </div>
        <BadgeRecruitmentItem
          badge={$currentRecruitmentStore.badge}
          recruitment={$currentRecruitmentStore}
          blurred={true} />
      </div>
    {:else if isInfluencing}
      <div class="relative">
        <div class="absolute inset-0 flex items-center justify-center z-50 gap-5 f-col">
          Influencing
          <Countdown
            class="f-row gap-2"
            itemClasses={countdownClasses}
            target={$currentRecruitmentStore?.cooldowns.influence}
            on:end={() => (isInfluencing = false)} />
        </div>
        <BadgeRecruitmentItem
          badge={$currentRecruitmentStore.badge}
          recruitment={$currentRecruitmentStore}
          blurred={true} />
      </div>
    {:else}
      <BadgeRecruitmentItem
        badge={$currentRecruitmentStore.badge}
        recruitment={$currentRecruitmentStore}
        blurred={isBadgeLocked(selectedBadge)} />
    {/if}
  {:else}
    <FactionBadgeItem
      token={selectedBadge}
      class={badgeItemClasses}
      blurred={isBadgeLocked(selectedBadge)}
      hideBubbles />
  {/if}

  {#if recruitingView}
    <div class="h-sep py-2" />
    <RecruitingStatus badge={selectedBadge} />
  {/if}

  <div class={detailsContainerClasses}>
    <input type="checkbox" checked={!recruitingView} id={detailsUuid} class="collapse-checkbox peer hidden" />
    <label for={detailsUuid} class={detailsTitleClasses}>Badge Details</label>
    <div class={detailsContentClasses}>
      <div class={collectionDetailsWrapperClasses}>
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">{$t('nfts.collection.faction')}</span>
          <div>{selectedBadge.faction}</div>
        </div>
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">{$t('nfts.collection.team')}</span>
          <span>{typeof movement !== 'string' ? getMovementName(movement) : movement}</span>
        </div>
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">{$t('nfts.collection.multiplier')}</span>
          <span>+{Multipliers[movement]}x</span>
        </div>
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">{$t('nfts.collection.contract_address')}</span>
          <ExplorerLink shorten category="address" urlParam={selectedBadge.address} />
        </div>
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">{$t('nfts.collection.token_id')}</span>
          <span>{selectedBadge.tokenId}</span>
        </div>
        {#if isBadgeLocked(selectedBadge)}
          <div class={collectionDetailsRowClasses}>
            <span class="text-secondary-content">{$t('common.status')}</span>
            <span>{$t('nfts.collection.locked')}</span>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
