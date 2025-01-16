<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { derived } from 'svelte/store';

  import { page } from '$app/stores';
  import BadgeRecruitment from '$lib/domains/badges/components/BadgeRecruitment.svelte';
  import DevRoom from '$lib/domains/profile/components/DevRoom/DevRoom.svelte';
  import { classNames } from '$shared/utils/classNames';
  import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';

  import ProfileTransactions from './ProfileActivity/ProfileTransactions.svelte';
  import ProfileLockdownTab from './ProfileLockdownTab.svelte';
  import ProfileNftCollection from './ProfileNFTs/NFTCollection/ProfileNFTCollection.svelte';
  import ProfileRewardClaim from './ProfileRewardClaim/ProfileRewardClaim.svelte';

  type TabContent = {
    name: string;
    slug: string;
    content: typeof ProfileTransactions | typeof BadgeRecruitment | typeof DevRoom | typeof ProfileRewardClaim;
  };

  export let isSelfProfile: boolean;

  $: tabs = [
    {
      slug: 'activity',
      name: 'Activity',
      content: ProfileTransactions,
    },
    {
      slug: 'nft-collection',
      name: 'NFT Collection',
      content: ProfileNftCollection,
    },
    ...(isSelfProfile
      ? [
          {
            slug: 'badge-recruitment',
            name: 'Badge Recruitment',
            content: BadgeRecruitment,
          },
          {
            slug: 'claim',
            name: 'Claim',
            content: ProfileRewardClaim,
          },
        ]
      : []),
    ...(isDevelopmentEnv
      ? [
          {
            slug: 'dev-room',
            name: '[Dev Room]',
            content: DevRoom,
          },
        ]
      : []),

    {
      slug: 'lockdown',
      name: 'Lockdown',
      content: ProfileLockdownTab,
    },
  ] as TabContent[];

  $: activeTab = 0;

  const tabPanelClasses = classNames('mx-4', 'md:mx-0', 'relative', '');

  const tabClasses = classNames(
    'text-center',
    'rounded-full',
    'lg:rounded-none',
    'lg:rounded-t-[20px]',
    'h-[44px]',
    'btn',
    'md:tab',
    'md:w-[140px]',
    'px-[20px]',
    'btn-ghost',
    'border-primary-brand',
    'hover:cursor-pointer',
    'hover:bg-primary-interactive-hover',
    'hover:text-white',
    'hover:border-primary-brand',
    'whitespace-nowrap',
    'body-bold',
    'lg:bg-transparent',
    'lg:border-none',
  );

  const tablistClasses = classNames(
    'flex',
    'flex-wrap',
    'w-full',
    'justify-center',
    'lg:justify-start',
    'lg:px-[26px]',
    'tabs',
    'gap-[10px]',
    'mb-[30px]',
    'lg:mb-0',
  );

  const hash = derived(page, ($page) => $page.url.hash);

  const updateActiveTab = (newHash: string) => {
    if (newHash && tabs) {
      const tab = tabs.find((tab) => tab.slug === newHash.slice(1));
      if (tab) {
        activeTab = tabs.indexOf(tab);
      }
    }
  };

  const unsubscribe = hash.subscribe((newHash) => {
    updateActiveTab(newHash);
  });

  onMount(() => {
    updateActiveTab(window.location.hash);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<!-- Tab List -->
<div role="tablist" class={tablistClasses}>
  {#each tabs as tab, index}
    <button
      type="button"
      role="tab"
      class={tabClasses}
      aria-selected={index === activeTab}
      on:click={() => {
        window.location.hash = tab.slug;
      }}
      aria-controls={`tabpanel-${index}`}
      id={`tab-${index}`}
      tabindex={index === activeTab ? 0 : -1}>
      {tab.name}
    </button>
  {/each}
</div>

<!-- Tab Content -->
<div role="tabpanel" class={tabPanelClasses} aria-labelledby={`tab-${activeTab}`} id={`tabpanel-${activeTab}`}>
  <svelte:component this={tabs[activeTab].content} />
</div>

<style>
  [role='tab'][aria-selected='true'] {
    background-color: #e81899;
    color: white;
  }

  button:focus {
    outline: none;
  }

  .md\:tab:is(.tab-active, [aria-selected='true']):not(.tab-disabled):not([disabled]),
  .md\:tab:is(input:checked) {
    border-color: transparent;
  }
</style>
