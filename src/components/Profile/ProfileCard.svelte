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

<div class="flex bg-elevated-background p-5 gap-10 rounded-3xl w-fit">
  <div class="flex flex-col gap-5">
    <div class="avatar">
      <div class=" bg-orange-400 rounded-3xl max-w-[224px]">
        <img src={profile?.avatar} alt="avatar" />
      </div>
    </div>
    <!-- <ProfileMultipliers /> -->
  </div>

  <div class="flex flex-col w-full gap-5 self-center">
    <div class="flex w-full justify-between items-center gap-2">
      <div class="flex items-center gap-1">
        <Icon type="user-circle"></Icon>Welcome, <span class="body-bold">{shortenAddress(profile?.address)}</span>
      </div>

      <!-- <div>{shortenAddress(profile?.address)} / {profile?.ens}</div> -->
    </div>

    <!-- Points -->
    <div class="flex items-center gap-2">
      <CountUp class="font-clash-grotesk font-semibold text-[45px] leading-none" value={$currentProfile?.score} />
      <div>points</div>
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
    <div class="flex flex-col gap-4">
      <div class="flex justify-between body-bold">
        <!-- <div>{profile?.rank}</div> -->
        <div class="flex">
          <CountUp value={+profile?.rank} /> /
          <span class="text-tertiary-content">{profile?.total}</span>
        </div>
      </div>
      <!-- Experience Bar -->

      <Bar
        class="progress progress-secondary w-full h-3"
        value={+profile?.rank}
        maxValue={profile.total ? +profile?.total : 0} />
      <!-- Profile Percentile & Position -->
      <!-- <div class="flex justify-between body-bold">
        <div class="text-tertiary-content">Top {profile?.rankPercentile} %</div>
        <div>{profile?.position}</div>
      </div> -->
    </div>

    <!-- Battle and Explore Buttons -->
    <!-- <div class="flex gap-4">
      <button class="btn btn-primary min-w-[156px] body-bold"> Battle </button>
      <button class="btn btn-primary min-w-[156px] body-bold bg-transparent"> Explore </button>
    </div> -->
  </div>
</div>
