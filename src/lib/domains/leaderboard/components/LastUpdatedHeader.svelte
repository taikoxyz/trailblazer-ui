<script>
  import { t } from 'svelte-i18n';

  import LastUpdated from './LastUpdated.svelte';
  export let lastUpdated;
</script>

<div
  class="f-col lg:f-row lg:f-between-center items-center content-center mt-[60px] lg:mt-[77px] mb-[30px] space-y-[30px] lg:space-y-0">
  <div class="text-xl font-bold">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html $t('leaderboard.whitelist.cta')}
  </div>
  {#if lastUpdated}
    <LastUpdated class="w-fit" {lastUpdated} />
  {/if}
</div>
