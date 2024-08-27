<script lang="ts">
  import { LastUpdated } from '../';

  export let lastUpdated: Date;
</script>

<div class="flex justify-between w-full p-8 lg:p-12 rounded-[21.6px] lg:rounded-[30px] overflow-hidden">
  <div
    class="font-clash-grotesk text-[45px]/[45px] lg:text-[60px]/[60px] leading-none text-primary-content z-10 relative">
    <span class="text-secondary">User<br /></span> Leaderboard
  </div>
  <div class="flex flex-col gap-[20px] max-w-[286px]">
    <div class="text-base-content">Complete weekly trails, bridge, and explore our ecosystem to rank up.</div>
    <LastUpdated class="w-fit" {lastUpdated} />
  </div>
</div>
