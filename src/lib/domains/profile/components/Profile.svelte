<script lang="ts">
  import { onMount } from 'svelte';
  import { type Address,getAddress } from 'viem';

  import { page } from '$app/stores';
  import BoosterCard from '$lib/domains/profile/components/BoosterCard.svelte';
  import ProfileCard from '$lib/domains/profile/components/ProfileCard.svelte';
  import ProfilePictureModal from '$lib/domains/profile/components/ProfilePicture/ProfilePictureModal.svelte';
  import ProfileTabs from '$lib/domains/profile/components/ProfileTabs.svelte';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { profileLoading } from '$lib/domains/profile/stores/profileStore';
  import { MintDisclaimerModal } from '$lib/shared/components';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  // import { Alert } from '$shared/components/Alert';
  import LeaderboardDisclaimer from '$shared/components/Disclaimer/LeaderboardDisclaimer.svelte';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import ProfileSeasonBonusCard from './ProfileSeasonBonusCard/ProfileSeasonBonusCard.svelte';

  const disclaimerWrapperClasses = classNames('mt-[100px]', 'px-[24px]', 'md:px-0');
  const containerClasses = classNames('flex', 'flex-col', 'items-center');
  const sectionClasses = classNames('flex', 'flex-col', 'max-w-section', 'w-full', 'lg:gap-8');
  const innerContainerClasses = classNames(
    'flex',
    'px-4',
    'lg:px-0',
    'gap-8',
    'h-full',
    'box-content',
    'flex-col',
    'lg:flex-row',
    'justify-center',
  );
  // const alertClasses = classNames('mt-[28px]');
  const tabsClasses = classNames('mt-[28px]');
  $: isSelfProfile = false;
  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    await profileService.getProfile(urlAddress, $activeSeason);
    isSelfProfile = getAddress(urlAddress) === getAddress(getConnectedAddress());
  });
</script>

<div class={containerClasses}>
  <div class={sectionClasses}>
    <div class={innerContainerClasses}>
      <ProfileCard loading={$profileLoading} />
      <BoosterCard />
      {#if isSelfProfile}
        <ProfileSeasonBonusCard />
      {/if}
    </div>

    <!-- <div class={alertClasses}>
      <Alert type="info">
        <b>Note:</b>
        Season 1 rewards can be claimed now! Check the claim tab!
      </Alert>
    </div> -->

    <div class={tabsClasses}>
      <ProfileTabs />

      <div class={disclaimerWrapperClasses}>
        <LeaderboardDisclaimer />
      </div>
    </div>
  </div>
</div>

<ProfilePictureModal />
<MintDisclaimerModal />
