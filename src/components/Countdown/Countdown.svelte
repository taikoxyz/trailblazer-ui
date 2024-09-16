<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import { ActionButton } from '$components/Button';
  import { classNames } from '$libs/util/classNames';

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
    'text-[#F3F3F3]',
  );

  const labelClasses = classNames('text-[#ADB1B8]', 'md:text-[22px]/[26px]', 'text-[14px]/[20px]');

  const dividerClasses = classNames('md:h-[75px]', 'h-[35px]', 'w-[1px]', 'bg-[#444A55]');
  export let countdown: Date;

  let now = Date.now();
  let end = countdown.getTime();
  $: enabled = end > now;

  $: count = Math.round((end - now) / 1000);
  $: d = Math.floor(count / 86400);
  $: h = Math.floor((count - d * 86400) / 3600);
  $: m = Math.floor((count - d * 86400 - h * 3600) / 60);
  $: s = count - d * 86400 - h * 3600 - m * 60;

  function updateTimer() {
    now = Date.now();
    if (now >= end) {
      clearInterval(interval);
      return;
    }
  }

  let interval = setInterval(updateTimer, 1000);
  $: if (count === 0) clearInterval(interval);

  function handleStart() {
    if (!enabled) return;
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
    'text-[#f3f3f3]',
    'font-[500]',
  );

  const contentTextClasses = classNames(
    'title-body-regular',
    'text-secondary-content',
    'text-center',
    'xl:self-end',
    'max-w-[505px]',
    'md:text-left',
  );
</script>

<div class={wrapperClasses}>
  {#if enabled}
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
  {:else}
    <div class={titleClasses}>{$t('season1_end.title')}</div>

    <div class={contentTextClasses}>
      {$t('season1_end.content')}
    </div>

    <ActionButton class="w-[350px]" priority="primary" href="google.com">
      {$t('common.learn_more')}</ActionButton>
  {/if}
</div>
