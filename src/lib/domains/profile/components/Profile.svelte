<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';
  import { getAddress } from 'viem';

  import { page } from '$app/stores';
  import { MintDisclaimerModal } from '$lib/shared/components';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  import getConnectedAddress from '$lib/shared/utils/getConnectedAddress';

  import profileService from '../services/ProfileServiceInstance';
  import { profileLoading } from '../stores/profileStore';
  import BoosterCard from './BoosterCard.svelte';
  import ProfileCard from './ProfileCard.svelte';
  import ProfilePictureModal from './ProfilePicture/ProfilePictureModal.svelte';
  import ProfileSeasonBonusCard from './ProfileSeasonBonusCard/ProfileSeasonBonusCard.svelte';
  import ProfileTabs from './ProfileTabs.svelte';

  $: isSelfProfile = false;
  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    await profileService.getProfile(urlAddress, $activeSeason);
    isSelfProfile = getAddress(urlAddress) === getAddress(getConnectedAddress());
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full lg:gap-8">
    <div class="flex px-4 flex-wrap lg:px-0 gap-8 h-full box-content flex-col lg:flex-row justify-center">
      <ProfileCard loading={$profileLoading} />
      <BoosterCard />
      {#if isSelfProfile}
        <ProfileSeasonBonusCard />
      {/if}
    </div>

    <div class="mt-[60px]">
      <ProfileTabs />
    </div>
  </div>
</div>

<ProfilePictureModal />
<MintDisclaimerModal />
