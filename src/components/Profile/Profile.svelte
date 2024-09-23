<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { type Address, getAddress } from 'viem';

  import { page } from '$app/stores';
  import { MintDisclaimerModal } from '$components/MintDisclaimerModal';
  import { ProfileTabs } from '$components/Tabs';
  import { Galxe } from '$libs/galxe';
  import getConnectedAddress from '$libs/util/getConnectedAddress';
  import { profileLoading } from '$stores/load';

  import { BoosterCard, ProfileCard } from './UserInfo';
  import UserPfp from './UserPFP/UserPFP.modal.svelte';

  $: isSelfProfile = false;
  setContext('isSelfProfile', isSelfProfile);

  onMount(async () => {
    // establish via context is it's the user's own profile
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile = getAddress(urlAddress) === getAddress(getConnectedAddress());

    await Galxe.refreshData();
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full lg:gap-8">
    <div class="flex px-4 lg:px-0 gap-8 h-full box-content flex-col lg:flex-row justify-center">
      <ProfileCard loading={$profileLoading} />

      <BoosterCard />
    </div>

    <ProfileTabs {isSelfProfile} />
  </div>
</div>

<UserPfp />
<MintDisclaimerModal />
