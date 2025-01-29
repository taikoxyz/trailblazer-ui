<script lang="ts">
  import BadgeRecruitmentItem from '$lib/domains/badges/components/BadgeRecruitmentItem.svelte';
  import type { Movements } from '$lib/domains/profile/types/types';
  import { activeRecruitmentStore } from '$shared/stores/recruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { FactionBadgeItem } from '../FactionBadges';
  import { getMovementName, Multipliers } from '$lib/domains/profile/types/types';
  import RecruitingStatus from '$lib/domains/badges/components/RecruitingStatus.svelte';
  import { t } from 'svelte-i18n';
  import { ExplorerLink } from '$shared/components/Links';
  import { classNames } from '$shared/utils/classNames';

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

  const collectionDetailsWrapperClasses = classNames('space-y-[10px]', 'mt-[60px]', 'w-full', 'order-3');
  const collectionDetailsRowClasses = classNames('f-row', 'justify-between', 'font-bold', 'w-full');
</script>

<div class={wrapperClasses}>
  {#if $activeRecruitmentStore?.badge?.tokenId === selectedBadge.tokenId}
    <BadgeRecruitmentItem
      badge={$activeRecruitmentStore.badge}
      recruitment={$activeRecruitmentStore}
      blurred={selectedBadge.frozen} />
  {:else}
    <FactionBadgeItem token={selectedBadge} class={badgeItemClasses} blurred={selectedBadge.frozen} hideBubbles />
  {/if}
  <div class={collectionDetailsWrapperClasses}>
    <div class={collectionDetailsRowClasses}>
      <span class="text-secondary-content">{$t('nfts.collection.faction')}</span>
      <div>
        {selectedBadge.faction}
      </div>
    </div>
    <div class={collectionDetailsRowClasses}>
      <span class="text-secondary-content">{$t('nfts.collection.team')}</span>
      <span> {typeof movement !== 'string' ? getMovementName(movement) : movement}</span>
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
      <span> {selectedBadge.tokenId}</span>
    </div>
    {#if selectedBadge.frozen}
      <div class={collectionDetailsRowClasses}>
        <span class="text-secondary-content">{$t('common.status')}</span>
        <span>{$t('nfts.collection.locked')}</span>
      </div>
    {/if}

    {#if recruitingView}
      <div class="h-sep py-2" />
      <RecruitingStatus badge={selectedBadge} />
    {/if}
  </div>
</div>
