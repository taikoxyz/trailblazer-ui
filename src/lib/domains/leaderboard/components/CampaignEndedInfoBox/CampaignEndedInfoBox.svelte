<script lang="ts">
  export let title = 'Finished.';
  export let description = '';

  let iconSize = 53;
  let iconOffset = iconSize / 2;
</script>

<div class="relative">
  <img
    alt="notification-bell"
    src="/infobox/bell.svg"
    class="absolute z-10"
    style="width: {iconSize}px; height: {iconSize}px; top: -{iconOffset}px; left: calc(50% - {iconOffset}px);" />
  <div class="outer-border">
    <div class="gradient-border f-between-center text-center f-col rounded-[30px] pt-[42px] px-[32px] pb-[27px]">
      <div class="space-y-[10px]">
        <h1 class="font-font-clash-grotesk !text-[30px]">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  </div>
</div>

<style>
  .outer-border {
    position: relative;
    border-radius: 30px;
    padding: 4px;
    background: linear-gradient(90deg, #ea36a4 0%, #f997d0 100%);
  }

  .gradient-border {
    position: relative;
    background: var(--primary-background);
    border-radius: 26px;
    z-index: 1;
  }
</style>
