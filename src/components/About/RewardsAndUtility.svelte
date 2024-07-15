<script lang="ts">
  import ResponsiveController from '$components/ResponsiveController/ResponsiveController.svelte';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames(
    'flex',
    'flex-col-reverse',
    'justify-center',
    'md:justify-start',
    'items-center',
    'md:items-start',
    'md:flex-row',
    'gap-4',
    'w-[100vw]',
  );

  const itemClasses = classNames(
    'lg:w-1/4',
    'md:-1/3',
    'flex',
    'flex-col',
    // 'md:flex-row',
    'gap-4',
    'md:gap-0',
    'justify-center',
    'items-center',
    'w-[90vw]',
  );

  const titleClasses = classNames(
    'font-clash-grotesk',
    'text-[60px]/[60px]',
    'md:text-left',
    'text-center',
    'w-full',
    'font-[500]',
  );
  const textClasses = classNames(
    'text-secondary-content',
    'text-[16px]/[24px]',
    'md:text-[18px]/[24px]',
    'md:text-left',
    'text-center',
  );

  const rowClasses = classNames(
    'gap-4',
    'w-full',
    'h-max',

    'flex',
    'flex-row',
  );

  const windowSizesToFrames = {
    sm: 1,
    md: 2,
    lg: 4,
  };
  $: frameCount = windowSizesToFrames[windowSize];

  let windowSize: 'sm' | 'md' | 'lg';
</script>

<div class={wrapperClasses}>
  <div class={classNames(itemClasses, 'md:mr-6', 'md:max-w-[30%]')}>
    <div class={titleClasses}>
      Rewards<br />
      & Utility
    </div>
    <div class={textClasses}>
      Harness specific XP multipliers that elevate your performance across various activities
    </div>
  </div>
  <div class={rowClasses}>
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(frameCount) as _, i}
      {@const src = i === 0 ? '/reward-unlocked.png' : '/reward-locked.png'}
      <a class={itemClasses} href="/profile">
        <img alt="Item" {src} />
      </a>
    {/each}
  </div>
</div>

<ResponsiveController bind:windowSize />
