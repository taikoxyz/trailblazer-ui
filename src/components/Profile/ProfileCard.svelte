<script lang="ts">
  import { Icon } from '$components/Icon';
  import LoadingText from '$components/LoadingText/LoadingText.svelte';
  import Skeleton from '$components/Mock/Skeleton.svelte';
  import type { UserProfile } from '$libs/profile';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { currentProfile } from '$stores/profile';
  import { MOCK_PROFILE } from 'src/tests/mocks/profile';
  import { onMount } from 'svelte';

  let profile: UserProfile;
  $: profile = $currentProfile;
  let loading = true;
</script>

<div class="w-full flex bg-elevated-background p-5 gap-10 rounded-3xl min-w-[900px]">
  <div class="flex flex-col gap-5">
    <div class="avatar">
      <div class="w-[364px] bg-orange-400 rounded-3xl">
        <img src={profile?.avatar} alt="avatar" />
      </div>
    </div>
    <div class="flex items-center gap-4 bg-neutral rounded-full px-5 py-3 max-w-[364px]">
      Multipliers
      <div class="bg-elevated-background rounded-full px-5 py-3 overflow-x-scroll">
        <div class="flex gap-1 w-fit">
          <Skeleton width="w-4" height="h-4" bgColor="bg-blue-200" shineColor="bg-blue-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-red-200" shineColor="bg-red-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-yellow-200" shineColor="bg-yellow-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-green-200" shineColor="bg-green-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-blue-200" shineColor="bg-blue-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-red-200" shineColor="bg-red-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-yellow-200" shineColor="bg-yellow-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-green-200" shineColor="bg-green-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-blue-200" shineColor="bg-blue-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-red-200" shineColor="bg-red-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-yellow-200" shineColor="bg-yellow-100" />
          <Skeleton width="w-4" height="h-4" bgColor="bg-green-200" shineColor="bg-green-100" />
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col w-full gap-5 pt-8">
    <div class="flex w-full justify-between items-center gap-2">
      <div class="flex items-center gap-1">
        <Icon type="user-circle"></Icon>Welcome, <span class="body-bold">{profile?.name}</span>
      </div>

      <div>{shortenAddress(profile?.address)} / {profile?.ens}</div>
    </div>
    <div class="flex items-center gap-2">
      <div class="font-clash-grotesk font-semibold text-[64px] leading-none">{profile?.points}</div>
      <div>points</div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex justify-between body-bold">
        <div>{profile?.rank}</div>
        <div>{profile?.experience} / <span class="text-tertiary-content">{profile?.nextLevelExperience}</span></div>
      </div>
      <progress
        class="progress progress-secondary w-full h-9"
        value={profile?.experience}
        max={profile?.nextLevelExperience}>
      </progress>
      <div class="flex justify-between body-bold">
        <div class="text-tertiary-content">Top {profile?.rankPercentile} %</div>
        <div>{profile?.position}</div>
      </div>
    </div>
    <div class="flex gap-4">
      <button class="btn btn-primary min-w-[156px] body-bold"> Battle </button>
      <button class="btn btn-primary min-w-[156px] body-bold bg-transparent"> Explore </button>
    </div>
  </div>
</div>
