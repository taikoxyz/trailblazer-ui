<script lang="ts">
  import { onMount } from 'svelte';

  import BadgeRecruitment from '$lib/domains/badges/components/BadgeRecruitment.svelte';
  import DevRoom from '$lib/domains/profile/components/DevRoom/DevRoom.svelte';
  import { ProfileNFTs } from '$lib/domains/profile/components/ProfileNFTs';
  import { classNames } from '$shared/utils/classNames';
  import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';

  import ProfileTransactions from './ProfileActivity/ProfileTransactions.svelte';
  import ProfileLockdownTab from './ProfileLockdownTab.svelte';
  import ProfileRewardClaim from './ProfileRewardClaim/ProfileRewardClaim.svelte';

  type TabContent = {
    name: string;
    slug: string;
    content:
      | typeof ProfileTransactions
      | typeof ProfileNFTs
      | typeof BadgeRecruitment
      | typeof DevRoom
      | typeof ProfileRewardClaim;
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
      content: ProfileNFTs,
    },
    ...(isSelfProfile
      ? [
          {
            slug: 'badge-recruitment',
            name: 'Badge Recruitment',
            content: BadgeRecruitment,
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
    /*
    {
      slug: 'claim',
      name: 'Claim',
      content: ProfileRewardClaim,
    },*/
    {
      slug: 'lockdown',
      name: 'Lockdown',
      content: ProfileLockdownTab,
    },
  ] as TabContent[];

  let activeTab = 0;

  const tabPanelClasses = classNames('mx-4', 'md:mx-0', 'relative', '');

  const tabClasses = classNames(
    'text-center',
    'rounded-full',
    'md:rounded-none',
    'md:rounded-t-[20px]',
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
    'md:bg-transparent',
    'md:border-none',
  );

  const tablistClasses = classNames(
    'flex',
    'flex-wrap',
    'w-full',
    'justify-center',
    'md:justify-start',
    'lg:px-0',
    'tabs',
    'gap-[10px]',
    'mb-[30px]',
    'md:mb-0',
  );

  function onHashChange() {
    const hash = window.location.hash;
    if (hash) {
      const tab = tabs.find((tab) => tab.slug === hash.slice(1));
      if (tab) {
        activeTab = tabs.indexOf(tab);
      }
    }
  }

  onMount(() => {
    onHashChange();
  });
</script>

<svelte:window on:hashchange={onHashChange} />

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
    border-color: transparent !important;
  }
</style>
