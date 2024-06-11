<script lang="ts">
  import { UserLeaderboard } from '$components/Table';
</script>

<div class="flex flex-col w-full h-full items-center gap-8">
  <!-- Leaderboard -->
  <!-- <div role="tablist" class="tabs tabs-lifted w-full md:py-[80px]"> -->
    <!-- {#each ranges as item, i (i)}
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab"
        checked={i === 0} /> -->
      <!-- <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6"> -->
        <UserLeaderboard />
      <!-- </div> -->
    <!-- {/each} -->
  <!-- </div> -->
</div>
