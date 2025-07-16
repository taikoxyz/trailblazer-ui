<script lang="ts">
  import type { UserProfile } from '$lib/domains/profile/types/UserProfile';
  import { type TaikoStatusInfo } from '$lib/domains/taiko-status/service/TaikoStatusService';
  import { formatNumbers } from '$shared/utils';

  export let profile: UserProfile;

  $: rank = profile?.userStats?.rank || '0';
  $: total = profile?.userStats?.total || '0';
  $: percentile = profile?.userStats?.rankPercentile || '0%';
  export let currentStatus: TaikoStatusInfo | null = null;
</script>

<div class="f-col w-full gap-[8px] w-[280px]">
  <div class="f-between-center">
    <span class="text-secondary-content">Level</span>
    <span class="font-bold">
      {profile?.userStats?.level} | {profile?.userStats?.title || 'Beginner'}
    </span>
  </div>
  <div class="f-between-center">
    <span class="text-secondary-content">Rank</span>
    <span class="font-bold">{rank} <span class="text-secondary-content">/ {formatNumbers(total)}</span></span>
  </div>
  <div class="f-between-center">
    <span class="text-secondary-content">Percentile</span>
    <span class="font-bold">({parseFloat(percentile).toFixed(2)}%)</span>
  </div>
  <div class="f-between-center">
    <span class="text-secondary-content">Taiko Status</span>
    <span class="font-bold flex items-center gap-1"
      >{currentStatus?.name || 'Unknown'}<img
        src={currentStatus?.icon}
        class="w-[20px] h-[20px]"
        alt="Profile" /></span>
  </div>
</div>
