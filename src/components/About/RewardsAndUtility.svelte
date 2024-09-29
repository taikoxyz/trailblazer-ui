<script lang="ts">
  import { classNames } from '$libs/util/classNames';
  import { isMobile, isTablet } from '$libs/util/responsiveCheck';

  const wrapperClasses = classNames(
    'flex',
    'xl:max-w-[1440px]',
    'flex-col',
    'justify-center',
    'md:justify-start',
    'items-center',
    'md:items-start',
    'md:flex-row',
    'gap-4',
    'w-full',
  );

  const itemClasses = classNames(
    'lg:w-1/4',
    'md:-1/3',
    'flex',
    'flex-col',
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
    'mb-[30px]',
  );
  const textClasses = classNames(
    'text-secondary-content',
    'text-[16px]/[24px]',
    'lg:text-[18px]/[24px]',
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

  const windowSizesToFrames: Record<string, number> = {
    sm: 1,
    md: 3,
    lg: 4,
  };

  $: frameCount = windowSizesToFrames[windowSize];

  $: windowSize = $isMobile ? 'sm' : $isTablet ? 'md' : 'lg';
</script>

<div class={wrapperClasses}>
  <div class={classNames(itemClasses, 'md:mr-6', 'md:max-w-[30%]', 'mb-[50px]', 'md:mb-0')}>
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
