<script lang="ts">
  import { Icon } from '$shared/components/Icon';

  export let lastUpdated: Date;
  $: lastUpdatedFormatted = formatLastUpdated(lastUpdated);

  function formatLastUpdated(date: Date) {
    if (!date || isNaN(date.getTime())) {
      return;
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) {
      return 'just now';
    } else if (diffMins < 60) {
      return `${diffMins} minute(s) ago`;
    } else {
      return `${diffHours} hour(s) ago`;
    }
  }
</script>

<div
  class="{$$props.class} flex justify-center items-center gap-[6px] rounded-full bg-elevated-background p-[10px] max-h-[40px]">
  <Icon type="clock"></Icon>
  <span>Last updated {lastUpdatedFormatted || 'N/A'} </span>
</div>
