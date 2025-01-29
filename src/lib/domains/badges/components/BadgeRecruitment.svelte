<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { t } from 'svelte-i18n';
  import { zeroAddress } from 'viem';

  import { browser } from '$app/environment';
  import LoadingBlobby from '$lib/domains/profile/components/LoadingBlobby.svelte';
  import FullCollection from '$lib/domains/profile/components/ProfileNFTs/NFTCollection/FullCollection.svelte';
  import { Movements } from '$lib/domains/profile/types/types';
  import { ActionButton, Button } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import RotatingIcon from '$shared/components/Icon/RotatingIcon.svelte';
  import { account } from '$shared/stores';
  import {
    activeRecruitmentStore,
    badgeToRecruit,
    endRecruitmentModal,
    startRecruitmentModal,
  } from '$shared/stores/recruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import { getLogger } from '$shared/utils/logger';

  import badgeRecruitmentService from '../services/BadgeRecruitmentServiceInstance';
  import BadgeRecruitmentItem from './BadgeRecruitmentItem.svelte';
  import Countdown from './Countdown.svelte';
  // import { RecruitmentStatus } from '$shared/types/BadgeRecruitment';

  export let title: string = 'Badge Recruitment';

  const log = getLogger('BadgeRecruitment');

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
  const boxClasses = classNames('w-full', 'gap-[30px]', 'f-col');
  const nftGridClasses = classNames(
    'grid',
    'items-center',
    'place-content-center',
    'justify-items-center',
    'grid-cols-[repeat(auto-fill,_minmax(277px,_1fr))]',
    'gap-[24px]',
  );

  const titleClasses = classNames('f-col', 'gap-[24px]', 'text-grey-200', 'text-[16px]/[24px]');
  const dividerClasses = classNames('divider', 'mt-[18px]', 'mb-[30px]', 'p-0');

  const infoTextClassWrapper = classNames('w-full', 'text-center', 'justify-center', 'text-secondary-content', 'f-col');

  const countdownWrapperClasses = classNames(
    'flex',
    'gap-[5px]',
    'font-clash-grotesk',
    'text-[16px]',
    'font-[500]',
    'text-primary-content',
  );
  const countdownItemClasses = classNames('h-min');

  // $: forceRenderFlag = true;
  async function onCounterEnd() {
    if (!$account || !$account.address) return;
    // forceRenderFlag = false;
    // await handleRefresh();
    // forceRenderFlag = true;
  }

  const iconClasses = classNames('w-[150px]', 'h-[150px]');

  // $: $startRecruitmentModal, !$startRecruitmentModal && handleRefresh();
  // $: $influenceRecruitmentModal, !$influenceRecruitmentModal && handleRefresh();
  // $: $endRecruitmentModal, !$startRecruitmentModal && handleRefresh();

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
  $: cycleId = -1;
  $: enabledRecruitments = [] as number[];
  $: displayAvailableRecruitmentBadges = [] as TBBadge[];
  $: selectedDevBadges = null as TBBadge[] | null;
  // $: status = RecruitmentStatus.NOT_STARTED as RecruitmentStatus;

  // const badgeIds = [0, 1, 2, 3, 4, 5, 6, 7];

  // 4 days from now as timestamp
  const cycleEndDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);

  const initialise = async () => {
    if (!browser || isLoading) return;
    isLoading = true;
    const address = getConnectedAddress();
    if (!address || address === zeroAddress) return;
    const [cycleIdResult, enabledRecruitmentsResult, recruitmentsOfUser] = await Promise.all([
      badgeRecruitmentService.getRecruitmentCycleId(),
      badgeRecruitmentService.getEnabledRecruitments(),
      badgeRecruitmentService.getUserRecruitments(address),
    ]);

    cycleId = cycleIdResult;
    enabledRecruitments = enabledRecruitmentsResult || [];

    log('recruitmentsOfUser', recruitmentsOfUser);

    displayAvailableRecruitmentBadges = await Promise.all(
      enabledRecruitments.map(async (badgeId) => {
        const badge = await badgeRecruitmentService.getDefaultBadge(badgeId);
        return badge;
      }),
    );

    log('enabled recruitments', enabledRecruitments);

    // // prevent reloads with open modals
    // if ($startRecruitmentModal || $influenceRecruitmentModal || $endRecruitmentModal) return;
    // isLoading = true;
    // cycleId = await badgeRecruitmentService.startRecruitment(address, nft, recruitment);
    // enabledBadgeIds = (await profileService.getEnabledRecruitments()) || [];
    // // match address in url
    // const match = window.location.pathname.match(/0x[a-fA-F0-9]{40}/);
    // const address = match ? match[0] : null;
    // if (!address) return;
    // await profileService.getBadgeRecruitments(address as Address);
    isLoading = false;
  };

  const handleCollectionOpen = (event: CustomEvent<{ badges: TBBadge[] }>) => {
    log('Collection open', event);
    selectedDevBadges = event.detail.badges;
  };

  const handleClose = () => {
    selectedDevBadges = null;
  };

  const recruit = async (badge: TBBadge) => {
    log('Recruit', badge);
    const address = getConnectedAddress();
    if (!address || address === zeroAddress) return;
    $startRecruitmentModal = true;
    $badgeToRecruit = badge;
  };

  const claim = () => {
    $endRecruitmentModal = true;
    log('Claim');
  };

  onMount(async () => {
    await initialise();
  });

  setContext('badgeRecruitRecruit', recruit);
  setContext('badgeRecruitClaim', claim);
</script>

<div class={containerClass}>
  {#if selectedDevBadges?.length}
    <div class={rowClass}>
      <div class={titleClasses}>Recruit:</div>
      <div class={dividerClasses} />
      <FullCollection badges={selectedDevBadges} movement={Movements.Devs} on:close={handleClose} />
    </div>
  {:else if selectedDevBadges?.length === 0}
    <div class={rowClass}>
      <div class={titleClasses}>
        <button
          on:click={() => (selectedDevBadges = null)}
          class="btn btn-ghost rounded-full w-[50px] h-[50px] bg-neutral-background">
          <Icon type="chevron-left" />
        </button>
        <div>No badges found</div>
      </div>
      <div class={dividerClasses} />
      <div class={infoTextClassWrapper}>
        <div class="f-col max-w-[400px] self-center items-center">
          <img class={iconClasses} alt="Not eligible" src="/blobby/sad_blobby.svg" />
          <p>{$t('badge_recruitment.main.no_badges_to_recruit')}</p>
        </div>
      </div>
    </div>
  {:else}
    <div class={rowClass}>
      <Button
        type="neutral"
        shape="circle"
        class="bg-neutral rounded-full !w-[28px] !h-[28px] border-none absolute right-[20px] md:right-[48px] top-[30px]"
        on:click={initialise}>
        <RotatingIcon loading={isLoading} type="refresh" size={13} />
      </Button>

      <div class={titleClasses}>{title}</div>
      <div class={dividerClasses} />
      <div class={boxClasses}>
        {#if isLoading}
          <LoadingBlobby />
        {:else if displayAvailableRecruitmentBadges.length}
          <div class="f-col">
            <div>Current cycle: {cycleId}</div>
            <div class="f-row items-center gap-[10px]">
              <Countdown class={countdownWrapperClasses} itemClasses={countdownItemClasses} target={cycleEndDate} /> until
              next cycle TODO CHANGE TO REAL DATE
            </div>
          </div>
          <div class={nftGridClasses}>
            {#each displayAvailableRecruitmentBadges as badge}
              <BadgeRecruitmentItem {badge} on:counterEnd={onCounterEnd} on:open={handleCollectionOpen} />
            {/each}
          </div>
        {:else}
          <div class={infoTextClassWrapper}>
            <p>{$t('badge_recruitment.main.no_enabled_recruitments')}</p>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
<div class={faqWrapperClasses}>
  <div class="md:w-1/2 w-full mb-[25px]">
    <ActionButton href="/badge#faq" priority="primary">
      {$t('badge_recruitment.main.cta')}
    </ActionButton>
  </div>
</div>
