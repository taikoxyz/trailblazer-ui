<script lang="ts">
  import { onMount } from 'svelte';
  import { type Address, isAddressEqual } from 'viem';

  import { page } from '$app/stores';
  import ProfileCard from '$lib/domains/profile/components/ProfileCard.svelte';
  import ProfileModals from '$lib/domains/profile/components/ProfileModals.svelte';
  import ProfileTabs from '$lib/domains/profile/components/ProfileTabs.svelte';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { profileLoading, userProfile } from '$lib/domains/profile/stores/profileStore';
  import { ActivityType } from '$lib/domains/profile/types/ActivityHistory';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  // import { Alert } from '$shared/components/Alert';
  import LeaderboardDisclaimer from '$shared/components/Disclaimer/LeaderboardDisclaimer.svelte';
  import FeaturedCampaigns from '$shared/components/FeaturedCampaigns/FeaturedCampaigns.svelte';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import NewsCard from './NewsCard/NewsCard.svelte';
  import MultiplierCard from './ProfileMultiplierCard/MultiplierCard.svelte';
  import FloatingClaimButton from './ProfileSeasonBonusCard/FloatingClaimButton.svelte';
  import SeasonDetails from './SeasonDetails.svelte';
  import StatusDistributionModal from './StatusDistributionModal.svelte';
  // import ProfileSeasonBonusCard from './ProfileSeasonBonusCard/ProfileSeasonBonusCard.svelte';

  let isSelfProfile: boolean;
  let showStatusPointsModal = false;
  let statusPoints = 0;

  const disclaimerWrapperClasses = classNames('mt-[100px]', 'px-[24px]', 'md:px-0');
  const containerClasses = classNames('flex', 'flex-col', 'items-center');
  const sectionClasses = classNames('flex', 'flex-col', 'container', 'w-full', 'lg:gap-8', 'mt-[24px]');
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

  // const alertClasses = classNames('mt-[28px]', 'mx-[12px]', 'lg:mx-0');
  const tabsClasses = classNames('mt-[28px]');

  $: isSelfProfile = false;

  // Function to check for recent TaikoStatusReward events
  function checkForStatusPointsEvents() {
    const activityHistory = $userProfile?.activityHistory?.items;
    if (!activityHistory || !isSelfProfile) return;

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    // Find TaikoStatusReward events within the last 7 days
    const recentStatusEvents = activityHistory.filter(
      (event) => event.event === ActivityType.TAIKO_STATUS_REWARD && event.date * 1000 >= sevenDaysAgo, // Convert Unix timestamp to milliseconds
    );

    if (recentStatusEvents.length > 0) {
      // Calculate total points from recent events
      statusPoints = recentStatusEvents.reduce((total, event) => total + event.points, 0);
      showStatusPointsModal = true;
    }
  }

  // Watch for changes in userProfile to trigger the check
  $: if ($userProfile && !$profileLoading) {
    checkForStatusPointsEvents();
  }

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
      </div>
      <NewsCard />
    </div>

    <!-- <div class={alertClasses}>
      <Alert type="info">
        <b>Note:</b>
        Final Season 2 stats will be accessible shortly!
      </Alert>
    </div> -->

    <div class="m-[24px] lg:m-0">
      <FeaturedCampaigns title="Featured campaigns" />
    </div>
    <div class={tabsClasses}>
      <ProfileTabs {isSelfProfile} />

      <div class={disclaimerWrapperClasses}>
        <LeaderboardDisclaimer />
      </div>
    </div>
  </div>
</div>

<FloatingClaimButton />

<ProfileModals />
<StatusDistributionModal points={statusPoints} show={showStatusPointsModal} />
