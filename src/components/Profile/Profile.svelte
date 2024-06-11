<script>
  import { onMount } from 'svelte';

  import ShinyCard from '$components/Card/ShinyCard.svelte';
  import { Icon } from '$components/Icon';
  import { Skeleton } from '$components/Mock';
  import { ProfileTabs } from '$components/Tabs';
  import ETHIcon from '$images/tokens/ETH.png';
  import TKOIcon from '$images/tokens/TKO.png';
  import { Profile } from '$libs/profile';

  import ProfileCard from './ProfileCard.svelte';
  import ProfileSubCard from './ProfileSubCard.svelte';
  import { page } from '$app/stores';
  import { account } from '$stores/account';

  $: if ($account) {
    let address = $account.address;
    console.log('🚀 | address:', address);
  }

  onMount(async () => {
    // get slug
    let address = $page.params.address;

    await Profile.getProfile(address);
    await Profile.getUserPointsHistory(address);
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full lg:gap-8">
    <div class="flex px-4 lg:px-0 gap-8 lg:w-1/2 lg:max-w-[630px] box-content">
      <!-- Profile Card -->
      <ProfileCard />

      <!-- Bridged Card -->
      <!-- <ProfileSubCard> -->
      <!-- <div class="flex flex-col gap-8 items-center w-full">
          <div class="f-center gap-2">
            <div class="title-subsection-bold">Bridged</div>
            <Icon type={'question-circle'}></Icon>
          </div>
          <div class="flex flex-col w-full">
            <div class="flex w-full justify-between items-center">
              <div class="display-small-medium">0.00</div>
              <img src={ETHIcon} alt={ETHIcon} class="size-6" />
            </div>
            <div class="flex w-full justify-between items-center">
              <div class="display-small-medium">0.00</div>
              <img src={TKOIcon} alt={TKOIcon} class="size-6" />
            </div>
          </div>
        </div> -->
      <!-- </ProfileSubCard> -->

      <!-- Booster Card -->
      <!-- <ProfileSubCard> -->
      <!-- <div class="flex flex-col gap-6 items-center justify-center w-full">
          <div class="f-center gap-2">
            <div class="title-subsection-bold">Booster</div>
            <Icon type={'question-circle'}></Icon>
          </div>
          <div class="f-center flex-col w-full">
            <div class="display-small-medium">1x</div>
          </div>
          <div class="f-center ml-1">
            <Skeleton width="w-6" height="h-6" bgColor="bg-blue-200" shineColor="bg-blue-100" class="-ml-1" />
            <Skeleton width="w-6" height="h-6" bgColor="bg-red-200" shineColor="bg-red-100" class="-ml-1" />
            <Skeleton width="w-6" height="h-6" bgColor="bg-yellow-200" shineColor="bg-yellow-100" class="-ml-1" />
            <Skeleton width="w-6" height="h-6" bgColor="bg-blue-200" shineColor="bg-blue-100" class="-ml-1" />
            <Skeleton width="w-6" height="h-6" bgColor="bg-red-200" shineColor="bg-red-100" class="-ml-1" />
            <Skeleton width="w-6" height="h-6" bgColor="bg-yellow-200" shineColor="bg-yellow-100" class="-ml-1" />
          </div>
        </div> -->
      <!-- </ProfileSubCard> -->
    </div>

    <ProfileTabs />
  </div>
</div>
