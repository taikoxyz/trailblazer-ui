<script>
  import { ProfileTabs } from '$components/Tabs';
  import { Profile } from '$libs/profile';
  import { onMount } from 'svelte';
  import ProfileCard from './ProfileCard.svelte';
  import ProfileSubCard from './ProfileSubCard.svelte';

  import TKOIcon from '$images/tokens/TKO.png';
  import ETHIcon from '$images/tokens/ETH.png';
  import { Icon } from '$components/Icon';
  import ProfileMultipliers from './ProfileMultipliers.svelte';
  import { Skeleton } from '$components/Mock';

  onMount(async () => {
    await Profile.getUserTransactions();
    await Profile.getProfile();
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full gap-8">
    <div class="flex max-w-section w-full gap-8 box-content h-[264px]">
      <ProfileCard />

      <ProfileSubCard>
        <div class="flex flex-col gap-8 items-center w-full">
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
        </div>
      </ProfileSubCard>

      <ProfileSubCard props={{ color: 'bg-purple-600' }}>
        <div class="flex flex-col gap-6 items-center justify-center w-full">
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
        </div>
      </ProfileSubCard>
    </div>

    <ProfileTabs />
  </div>
</div>
