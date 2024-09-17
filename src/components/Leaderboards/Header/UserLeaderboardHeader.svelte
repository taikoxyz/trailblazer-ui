<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  import { LastUpdated } from '../';

  export let lastUpdated: Date;

  const wrapperClasses = classNames(
    'f-col',
    'md:f-row',
    'md:max-h-[100px]',
    'lg:max-h-[120px]',
    'gap-[20px]',
    'text-center',
    'md:text-left',
    'justify-between',
    'w-full',

    'overflow-hidden',
  );

  const headlineWrapperClasses = classNames(
    'font-clash-grotesk',
    'text-[45px]/[45px]',
    'lg:text-[60px]/[60px]',
    'leading-none',
    'text-primary-content',
    'z-10',
    'relative',
  );
  const lastUpdatedWrapperClasses = classNames(
    'flex',
    'flex-col',
    'md:max-w-[286px]',
    'text-center',
    'md:text-right',
    'gap-[40px]',
    'md:gap-[20px]',
    'mt-0',
  );
</script>

<div class={wrapperClasses}>
  <div class={headlineWrapperClasses}>
    <span class="text-secondary">User<br /></span> Leaderboard
  </div>

  <div class={lastUpdatedWrapperClasses}>
    <div class="text-sm lg:text-base text-secondary-content">
      Explore our ecosystem and stay tuned for competitions to rank up.
    </div>
    <LastUpdated {lastUpdated} />
  </div>
</div>
