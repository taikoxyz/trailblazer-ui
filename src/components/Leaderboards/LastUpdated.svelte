<script lang="ts">
  import { Icon } from '$components/Icon';

  export let lastUpdated;
  $: lastUpdatedFormatted = lastUpdated.toLocaleString();
</script>

<div class="{$$props.class} f-center gap-[6px] rounded-full bg-elevated-background p-[10px]">
  <Icon type="clock"></Icon>
  <span>Last updated {lastUpdatedFormatted}</span>
</div>
