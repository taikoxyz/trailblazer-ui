<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames('f-col', 'w-full', 'items-center', 'justify-center', 'gap-24', 'px-[24px]');

  const rowClasses = classNames(
    'f-col',
    'lg:px-12',
    'flex-col',
    'xl:flex-row',
    'gap-[50px]',
    'justify-center',
    'items-center',
    'lg:w-[calc(100%*6/8)]',
    'lg:mx-0',
    'text-center',
    'lg:text-left',
    'md:w-2/3',
  );

  const panelClasses = classNames(
    'w-full',
    'h-full',
    'f-col',
    'xl:max-w-[450px]',
    'items-center',
    'justify-center',
    'gap-8',
  );

  const titleClasses = classNames(
    'font-clash-grotesk',
    'text-[40px]/[40px]',
    'lg:text-[75px]/[75px]',
    'md:text-[60px]/[60px]',
    'tracking-[-2%]',
    'font-[500]',
    'text-center',
  );

  const contentClasses = classNames(
    'font-[400]',
    'font-public-sans',
    'text-secondary-content',
    'text-center',
    'lg:text-[18px]/[24px]',
    'text-[16px]/[24px]',
    'text-left',
    'flex',
    'flex-col',

    'gap-4',
  );

  const textClasses = classNames('xl:text-left', 'text-center');
</script>

<div class={wrapperClasses}>
  <div class={rowClasses}>
    <div class={panelClasses}>
      <img src="/how-it-works.png" alt="How it works" />
    </div>
    <div class={panelClasses}>
      <div class={titleClasses}>Transform your actions into rewards</div>

      <div class={contentClasses}>
        <p class={textClasses}>
          As you navigate through our vibrant world, your efforts aren’t just transactions—they become valuable
          Experience Points (XP).
        </p>
        <p class={textClasses}>
          The more you interact with our Mainnet, the more XP you gather, allowing you to level up and unlock greater
          rewards. Each step you take not only advances your journey but also enhances your rewards, creating a
          fulfilling cycle of engagement and achievement.
        </p>
      </div>
    </div>
  </div>

  <div class={classNames(rowClasses, 'xl:flex-row')}>
    <div class={classNames(panelClasses, 'order-first', 'xl:order-last')}>
      <img src="/level-up.png" alt="Level Up" />
    </div>

    <div class={panelClasses}>
      <div class={classNames(titleClasses, 'w-1/2', 'md:w-full')}>Level up and compete</div>

      <div class={contentClasses}>
        <p class={textClasses}>
          If you're feeling competitive, there's even more to discover. Each season brings a fresh start with XP reset,
          but don't worry—previous season participants receive a bonus, a percentage of their last season's XP, giving
          you a head start. We also spice up your journey with special timed events offering significant one-time
          bonuses.
        </p>
        <p class={textClasses}>Are you ready to seize opportunities that will propel you up the leaderboard?</p>
      </div>
    </div>
  </div>
</div>
