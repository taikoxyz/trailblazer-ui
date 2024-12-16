<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import type { Address } from 'viem';

  import { browser } from '$app/environment';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { Spinner } from '$shared/components';
  import { ActionButton, Button } from '$shared/components/Button';
  import RotatingIcon from '$shared/components/Icon/RotatingIcon.svelte';
  import { account } from '$shared/stores';
  import { endRecruitmentModal, influenceRecruitmentModal, startRecruitmentModal } from '$shared/stores/recruitment';
  import { classNames } from '$shared/utils/classNames';

  import BadgeRecruitmentItem from './BadgeRecruitmentItem.svelte';

  export let title: string = 'Badge Recruitment';

  const containerClass = classNames(
    'container',
    'w-full',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'rounded-[30px]',
    'relative',
    'pb-[30px]',
  );

  const rowClass = classNames(
    'relative',
    'grid',
    'items-center',
    'gap-x-[26px]',
    'px-[16px]',
    'pt-[34px]',
    'md:px-[47px]',
    'body-bold',
    'text-sm',
  );
  const boxClasses = classNames('w-full');
  const nftGridClasses = classNames(
    'grid',
    'items-center',
    'place-content-center',
    'justify-items-center',
    'grid-cols-[repeat(auto-fill,_minmax(277px,_1fr))]',
    'gap-[24px]',
  );

  const titleClasses = classNames('text-grey-200', 'text-[16px]/[24px]');
  const dividerClasses = classNames('divider', 'mt-[18px]', 'mb-[30px]', 'p-0');

  const infoTextClasses = classNames(
    'w-full',
    'text-center',
    'justify-center',
    'text-secondary-content',
    'flex',
    'h-[70px]',
  );

  $: enabledBadgeIds = [] as number[];

  $: forceRenderFlag = true;
  async function onCounterEnd() {
    if (!$account || !$account.address) return;
    forceRenderFlag = false;
    await handleRefresh();
    forceRenderFlag = true;
  }

  $: $startRecruitmentModal, !$startRecruitmentModal && handleRefresh();
  $: $influenceRecruitmentModal, !$influenceRecruitmentModal && handleRefresh();
  $: $endRecruitmentModal, !$startRecruitmentModal && handleRefresh();

  const faqWrapperClasses = classNames(
    'pt-[60px]',
    'w-full',
    'px-[48px]',
    'flex',
    'flex-col',
    'gap-[30px]',
    'justify-center',
    'items-center',
  );

  $: isLoading = false;

  const handleRefresh = async () => {
    if (!browser || isLoading) return;
    // prevent reloads with open modals
    if ($startRecruitmentModal || $influenceRecruitmentModal || $endRecruitmentModal) return;
    isLoading = true;
    enabledBadgeIds = (await profileService.getEnabledRecruitments()) || [];
    // match address in url
    const match = window.location.pathname.match(/0x[a-fA-F0-9]{40}/);
    const address = match ? match[0] : null;

    if (!address) return;
    await profileService.getBadgeRecruitments(address as Address);

    isLoading = false;
  };

  onMount(async () => {
    await handleRefresh();
  });
</script>

<div class={containerClass}>
  <div class={rowClass}>
    <Button
      type="neutral"
      shape="circle"
      class="bg-neutral rounded-full !w-[28px] !h-[28px] border-none absolute right-[20px] md:right-[48px] top-[30px]"
      on:click={handleRefresh}>
      <RotatingIcon loading={isLoading} type="refresh" size={13} />
    </Button>

    <div class={titleClasses}>{title}</div>
    <div class={dividerClasses} />
    <div class={boxClasses}>
      {#if isLoading}
        <div class="w-full flex justify-center">
          <Spinner size="lg" />
        </div>
      {:else if forceRenderFlag && enabledBadgeIds.length}
        <div class={nftGridClasses}>
          {#each enabledBadgeIds as badgeId}
            <BadgeRecruitmentItem {badgeId} on:counterEnd={onCounterEnd} />
          {/each}
        </div>
      {:else}
        <div class={infoTextClasses}>
          <p>{$t('badge_recruitment.main.no_enabled_recruitments')}</p>
        </div>
      {/if}
    </div>
  </div>

  <div class={faqWrapperClasses}>
    <div class="md:w-1/2 w-full mb-[25px]">
      <ActionButton href="/badge#faq" priority="primary">
        {$t('badge_recruitment.main.cta')}
      </ActionButton>
    </div>
  </div>
</div>
