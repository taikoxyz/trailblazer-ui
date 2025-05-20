<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  export let diffBefore: number = 0;
  export let diffAfter: number = 0;

  const wrapperClasses = classNames(
    'f-col',
    'w-full',
    'gap-[30px]',
    'justify-start',
    'mt-[90px]',
    'md:px-[48px]',
    'relative',
  );

  const detailsRowClasses = classNames('f-row', 'justify-between', 'font-bold');

  const statsWrapperClasses = classNames('f-col', 'gap-1');

  // speed increase in "times", e.g. 2x faster
  $: speedIncreaseTimes = diffBefore && diffAfter ? (diffBefore / diffAfter).toFixed(2) : 0;

  $: speedMessage =
    diffBefore && diffAfter
      ? diffAfter < diffBefore
        ? `A ${speedIncreaseTimes}x increase in transactions speed`
        : `No improvement: your transactions are slower or unchanged`
      : '';
</script>

<div class={wrapperClasses}>
  <div class="f-row gap-[30px] justify-start w-full space-x-[30px]">
    <div class="min-h-[80px] font-clash-grotesk text-white f-col w-[330px]">
      <h1 class="text-left mb-3">Statistics</h1>
      <!-- {#if speedMessage} -->
      <div class={statsWrapperClasses}>
        <div class={detailsRowClasses}>
          <span class="text-secondary-content">Before preconf avg.</span>
          <span>~42s</span>
        </div>

        <div class={detailsRowClasses}>
          <span class="text-secondary-content">After preconf avg.</span>
          <span>~2s</span>
        </div>

        <div class={detailsRowClasses}>
          <span class="text-secondary-content">Avg. speed increase</span>
          <span>21x faster</span>
        </div>
      </div>
      <!-- {/if} -->
    </div>

    <div class="min-h-[80px] font-clash-grotesk text-white f-col w-[330px]">
      <h1 class="text-left mb-3">Your results</h1>
      <div class="justify-center f-col h-full">
        {#if speedMessage}
          <div class={detailsRowClasses}>
            <span class="text-secondary-content">Your speed increase</span>
            <span class="text-positive-sentiment">{speedMessage}</span>
          </div>
        {:else}
          Not measured yet.
        {/if}
      </div>
    </div>
  </div>
</div>
