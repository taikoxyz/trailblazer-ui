<script>
  import { onMount } from 'svelte';

  import { page } from '$app/stores';
  import { Icon } from '$components/Icon';
  import { ProfileTabs } from '$components/Tabs';
  import { Profile } from '$libs/profile';
  import { account } from '$stores/account';

  import ProfileCard from './ProfileCard.svelte';
  import ProfileSubCard from './ProfileSubCard.svelte';

  $: if ($account) {
    let address = $account.address;
    console.info('🚀 | address:', address);
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
    <div class="flex px-4 lg:px-0 gap-8 h-full box-content flex-col lg:flex-row justify-center">
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
      <ProfileSubCard>
        <div class="flex flex-col gap-6 items-center justify-center w-full">
          <div class="f-center gap-2">
            <div class="title-subsection-bold">Booster</div>
            <Icon type={'question-circle'}></Icon>
          </div>
          <div class="f-center flex-col w-full">
            <div class="display-small-medium text-tertiary-content">Coming Soon</div>
          </div>
        </div>
      </ProfileSubCard>
    </div>

    <ProfileTabs />
  </div>
</div>
