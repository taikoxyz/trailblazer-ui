<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';

  import { page } from '$app/stores';
  import BoosterCard from '$lib/domains/profile/components/BoosterCard.svelte';
  import ProfileCard from '$lib/domains/profile/components/ProfileCard.svelte';
  import ProfilePictureModal from '$lib/domains/profile/components/ProfilePicture/ProfilePictureModal.svelte';
  import ProfileTabs from '$lib/domains/profile/components/ProfileTabs.svelte';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { profileLoading } from '$lib/domains/profile/stores/profileStore';
  import { MintDisclaimerModal } from '$lib/shared/components';
  // import Alert from '$lib/shared/components/Alert/Alert.svelte';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  // import { s1ClaimDate } from '$shared/stores/s1Claim';

  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    await profileService.getProfile(urlAddress, $activeSeason);
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full lg:gap-8">
    <div class="flex px-4 lg:px-0 gap-8 h-full box-content flex-col lg:flex-row justify-center">
      <ProfileCard loading={$profileLoading} />
      <BoosterCard />
    </div>
    <!--

    <div class="mt-[28px]">
      <Alert type="info">
        <b>Note:</b>
        {#if new Date() > $s1ClaimDate}
          Season 1 claiming now live! Click on claim below to check your eligibility and claim your rewards.
        {:else}
          Season 1 rewards can be claimed soon! Check the claim tab!
        {/if}
      </Alert>
    </div>
      -->

    <div class="mt-[28px]">
      <ProfileTabs />
    </div>
  </div>
</div>

<ProfilePictureModal />
<MintDisclaimerModal />
