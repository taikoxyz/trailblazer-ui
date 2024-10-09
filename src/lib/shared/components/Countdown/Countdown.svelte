<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames('flex', 'flex-col', 'w-full', 'items-center', 'justify-center', 'gap-[30px]');

  const timerWrapperClasses = classNames(
    'grid',
    'relative',
    'h-min',
    'auto-cols-max',
    'grid-flow-col',
    'gap-[24px]',
    'md:gap-[36px]',
    'lg:gap-[48px]',
    'text-center',
  );

  const colClasses = classNames('flex flex-col', 'md:gap-[16px]', 'gap-[8px]');
  const counterClasses = classNames(
    'countdown',
    'md:text-[100px]/[85px]',
    'text-[45px]/[52px]',
    'font-clash-grotesk',
    'text-primary-content',
  );

  const labelClasses = classNames('text-secondary-content', 'md:text-[22px]/[26px]', 'text-[14px]/[20px]');

  const dividerClasses = classNames('md:h-[75px]', 'h-[35px]', 'w-[1px]', 'bg-divider-border');
  export let countdown: Date;

  let now = Date.now();
  let end = countdown.getTime();

  $: count = Math.round((end - now) / 1000);
  $: d = Math.floor(count / 86400);
  $: h = Math.floor((count - d * 86400) / 3600);
  $: m = Math.floor((count - d * 86400 - h * 3600) / 60);
  $: s = count - d * 86400 - h * 3600 - m * 60;

  function updateTimer() {
    now = Date.now();
  }

  let interval = setInterval(updateTimer, 1000);
  $: if (count === 0) clearInterval(interval);

  function handleStart() {
    now = Date.now();
    end = now + count * 1000;
    interval = setInterval(updateTimer, 1000);
  }
  onMount(() => {
    handleStart();
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  const titleClasses = classNames(
    'md:text-[57px]/[64px]',
    'text-[45px]/[52px]',
    'font-clash-grotesk',
    'text-primary-content',
    'font-[500]',
  );
</script>

<div class={wrapperClasses}>
  <div class={titleClasses}>Season 1 ends in</div>

  <div class={timerWrapperClasses}>
    <div class={colClasses}>
      <span class={counterClasses}>
        <span style="--value:{d};"></span>
      </span>
      <div class={labelClasses}>Days</div>
    </div>

    <div class={dividerClasses} />
    <div class={colClasses}>
      <span class={counterClasses}>
        <span style="--value:{h};"></span>
      </span>
      <div class={labelClasses}>Hours</div>
    </div>
    <div class={dividerClasses} />

    <div class={colClasses}>
      <span class={counterClasses}>
        <span style="--value:{m};"></span>
      </span>
      <div class={labelClasses}>Minutes</div>
    </div>
    <div class={dividerClasses} />

    <div class={colClasses}>
      <span class={counterClasses}>
        <span style="--value:{s};"></span>
      </span>
      <div class={labelClasses}>Seconds</div>
    </div>
  </div>
</div>
