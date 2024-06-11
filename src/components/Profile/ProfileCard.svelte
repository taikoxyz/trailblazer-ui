<script lang="ts">
  import { Icon } from '$components/Icon';
  import CountUp from '$components/Numbers/CountUp.svelte';
  import type { UserProfile } from '$libs/profile';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { currentProfile } from '$stores/profile';

  import RankDisplay from './RankDisplay.svelte';

  let profile: UserProfile;
  $: profile = $currentProfile;
</script>

<div
  class="flex bg-elevated-background p-5 pt-[84px] lg:pt-5 rounded-3xl w-full flex-col lg:flex-row items-center xl:w-1/2 xl:max-w-[630px]">
  <!-- <div class="flex flex-col gap-5 lg:w-1/2 w-full items-center lg:items-start lg:max-h-[300px] lg:max-w-[300px]"> -->
  <div class="avatar lg:size-[258px] size-[250px] items-center lg:mr-8">
    <div class="h-full bg-orange-400 rounded-3xl">
      <img src={profile?.avatar} alt="avatar" />
    </div>
  </div>
  <!-- <ProfileMultipliers /> -->

  <div class="flex lg:items-start items-center flex-col gap-2 self-center lg:min-w-[300px] w-full">
    <div class="flex align-start justify-between items-center gap-2 mt-5 lg:mt-0">
      <div class="flex items-center gap-1">
        <Icon type="user-circle"></Icon>
        <a
          href={`https://taikoscan.io/address/${profile?.address}`}
          target="_blank"
          class="body-bold hover:cursor-pointer underline text-primary-link">
          {shortenAddress(profile?.address)}
        </a>
      </div>

      <!-- <div>{shortenAddress(profile?.address)} / {profile?.ens}</div> -->
    </div>

    <!-- Points -->
    <div class="flex items-center gap-2 lg:mb-4">
      <CountUp class="font-clash-grotesk font-semibold text-[45px] leading-none" value={$currentProfile?.score} />
      <div>Points</div>
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
    <div class="flex lg:items-start items-center flex-col gap-[10px] w-full">
      <!-- <div class="flex justify-between body-bold"> -->
      <div class="flex gap-[10px] border border-divider-border rounded-full w-fit p-1">
        <div class="body-bold pl-[15px] py-1">Level {profile?.level}</div>
        <div class="f-center rounded-full body-bold bg-pink-400 w-fit px-[10px]">{profile?.title}</div>
      </div>
      <RankDisplay rank={Number(profile.rank)} total={Number(profile.total)} percentile={profile.rankPercentile} />
    </div>
  </div>

  <!-- Battle and Explore Buttons -->
  <!-- <div class="flex gap-4">
      <button class="btn btn-primary min-w-[156px] body-bold"> Battle </button>
      <button class="btn btn-primary min-w-[156px] body-bold bg-transparent"> Explore </button>
    </div> -->
</div>
