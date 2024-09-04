<script lang="ts">
  import { onMount } from 'svelte';
  import { type Address, getAddress } from 'viem';

  import { page } from '$app/stores';
  import { MintDisclaimerModal } from '$components/MintDisclaimerModal';
  import { ProfileTabs } from '$components/Tabs';
  import { Galxe } from '$libs/galxe';
  import getConnectedAddress from '$libs/util/getConnectedAddress';
  import { profileLoading } from '$stores/load';

  import { BoosterCard, GalxeCard, ProfileCard } from './UserInfo';
  import UserPfp from './UserPFP/UserPFP.modal.svelte';

  $: isSelfProfile = false;
  onMount(async () => {
    await Galxe.refreshData();

    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile = getAddress(urlAddress) === getAddress(getConnectedAddress());
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full lg:gap-8">
    <div class="flex px-4 lg:px-0 gap-8 h-full box-content flex-col lg:flex-row justify-center">
      <!-- Profile Card -->
      <ProfileCard {isSelfProfile} loading={$profileLoading} />
      <!-- Bridged Card -->
      <!-- <BridgedCard /> -->
      <!-- Booster Card -->
      <BoosterCard />
      <!-- Galxe Card -->
      <GalxeCard />
    </div>

    <ProfileTabs />
  </div>
</div>

<UserPfp />
<MintDisclaimerModal />
