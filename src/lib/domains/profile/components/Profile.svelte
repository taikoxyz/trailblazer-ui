<script lang="ts">
  import { onMount } from 'svelte';
  import { type Address, isAddressEqual } from 'viem';

  import { page } from '$app/stores';
  import ProfileCard from '$lib/domains/profile/components/ProfileCard.svelte';
  import ProfileModals from '$lib/domains/profile/components/ProfileModals.svelte';
  import ProfileTabs from '$lib/domains/profile/components/ProfileTabs.svelte';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { profileLoading } from '$lib/domains/profile/stores/profileStore';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  import { Alert } from '$shared/components/Alert';
  import LeaderboardDisclaimer from '$shared/components/Disclaimer/LeaderboardDisclaimer.svelte';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import NewsCard from './NewsCard/NewsCard.svelte';
  import MultiplierCard from './ProfileMultiplierCard/MultiplierCard.svelte';
  import SeasonDetails from './SeasonDetails.svelte';
  // import ProfileSeasonBonusCard from './ProfileSeasonBonusCard/ProfileSeasonBonusCard.svelte';

  let isSelfProfile: boolean;

  const disclaimerWrapperClasses = classNames('mt-[100px]', 'px-[24px]', 'md:px-0');
  const containerClasses = classNames('flex', 'flex-col', 'items-center');
  const sectionClasses = classNames('flex', 'flex-col', 'max-w-section', 'w-full', 'lg:gap-8');
  const innerContainerClasses = classNames(
    'px-4',
    'lg:px-0',
    'gap-8',
    'h-full',
    'box-content',
    'f-col',
    'xl:f-row',
    'justify-center',
    'lg:justify-between',
  );

  const profileCardWrapperClasses = classNames(
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'w-full',
    'rounded-[30px]',
    'px-[24px]',
    'f-col',
    'gap-[24px]',
    'pb-[24px]',
    'max-w-[1016px]',
  );

  const alertClasses = classNames('mt-[28px]', 'mx-[12px]', 'lg:mx-0');
  const tabsClasses = classNames('mt-[28px]');
  $: isSelfProfile = false;
  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile = isAddressEqual(urlAddress, getConnectedAddress());
    await profileService.getProfile(urlAddress, $activeSeason);
  });
</script>

<div class={containerClasses}>
  <div class={sectionClasses}>
    <div class={innerContainerClasses}>
      <div class={profileCardWrapperClasses}>
        <SeasonDetails />
        <div class="f-col lg:f-row justify-between gap-[24px]">
          <ProfileCard loading={$profileLoading} {isSelfProfile} />
          <MultiplierCard />
        </div>
        <!-- {#if isSelfProfile}
        <ProfileSeasonBonusCard />
      {/if} -->
      </div>
      <NewsCard />
    </div>
    <div class={alertClasses}>
      <Alert type="info">
        <b>Note:</b>
        Final Season 2 stats will be calculated and accessible shortly!
      </Alert>
    </div>

    <div class={tabsClasses}>
      <ProfileTabs {isSelfProfile} />

      <div class={disclaimerWrapperClasses}>
        <LeaderboardDisclaimer />
      </div>
    </div>
  </div>
</div>

<ProfileModals />
