<script lang="ts">
  import { Bar } from '$components/Bar';
  import { Icon } from '$components/Icon';
  import CountUp from '$components/Numbers/CountUp.svelte';
  import type { UserProfile } from '$libs/profile';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { currentProfile } from '$stores/profile';

  import ProfileMultipliers from './ProfileMultipliers.svelte';

  let profile: UserProfile;
  $: profile = $currentProfile;
  let loading = true;
</script>

<div
  class="flex lg:bg-elevated-background p-5 rounded-3xl w-full flex-col lg:flex-row items-center lg:w-1/2 lg:max-w-[630px]">
  <!-- <div class="flex flex-col gap-5 lg:w-1/2 w-full items-center lg:items-start lg:max-h-[300px] lg:max-w-[300px]"> -->
  <div class="avatar w-1/2 items-center lg:mr-4">
    <div class="h-full bg-orange-400 rounded-3xl">
      <img src={profile?.avatar} alt="avatar" />
    </div>
  </div>
  <!-- <ProfileMultipliers /> -->

  <!-- </div> -->

  <div class="flex flex-col gap-2 self-center lg:min-w-[300px]">
    <div class="flex align-start justify-between items-center gap-2 mt-5 lg:mt-0">
      <div class="flex items-center gap-1">
        <Icon type="user-circle"></Icon>
        <a
          href={`https://taikoscan.io/address/${profile?.address}`}
          target="_blank"
          class="body-bold hover:cursor-pointer underline">
          {shortenAddress(profile?.address)}
        </a>
      </div>

      <!-- <div>{shortenAddress(profile?.address)} / {profile?.ens}</div> -->
    </div>

    <!-- Points -->
    <div class="flex items-center gap-2">
      <CountUp class="font-clash-grotesk font-semibold text-[45px] leading-none" value={$currentProfile?.score} />
      <div>xp</div>
    </div>
    <!-- Faction -->
    <!-- <div class="flex gap-2 items-center">
      <div class="flex rounded-full border border-divider-border p-0.5 pl-[15px] gap-2 items-center w-fit">
        <div class="flex text-secondary-content">Faction</div>
        <div class="flex rounded-full px-[10px] py-[6px] bg-primary-brand items-center body-bold">Ravers</div>
      </div>

      <div class="flex rounded-full px-[10px] py-[6px] bg-purple-600 items-center body-bold">Boosted</div>
    </div> -->
    <!-- Rank & Experience -->
    <div class="flex flex-col gap-[10px]">
      <!-- <div class="flex justify-between body-bold"> -->
      <div class="flex justify-between">
        <div>Level</div>
        <div class="body-bold">{profile?.level}</div>
      </div>
      <div class="flex justify-between">
        <div>Title</div>
        <div class="body-bold">{profile?.title}</div>
      </div>
      <div class="flex justify-between">
        <div>Rank</div>
        <div class="body-bold">{profile.rank} <span class="text-tertiary-content">out of {profile?.total}</span></div>
      </div>
      <div class="flex justify-end">
        <div class="body-regular">Top {profile?.rankPercentile}</div>
      </div>
    </div>
  </div>

  <!-- Battle and Explore Buttons -->
  <!-- <div class="flex gap-4">
      <button class="btn btn-primary min-w-[156px] body-bold"> Battle </button>
      <button class="btn btn-primary min-w-[156px] body-bold bg-transparent"> Explore </button>
    </div> -->
</div>
