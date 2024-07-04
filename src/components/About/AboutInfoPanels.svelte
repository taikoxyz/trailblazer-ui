<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames('flex', 'flex-col', 'items-center', 'justify-center', 'gap-24');

  const rowClasses = classNames('flex', 'flex-row', 'w-full', 'gap-12', 'justify-between', 'items-center', 'w-[80%]');

  const panelClasses = classNames('w-1/2', 'h-full', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-8');

  const pinkSpanClasses = classNames('text-secondary');

  const titleClasses = classNames('font-clash-grotesk', 'text-[75px]/[75px]', 'font-[500]');

  const contentClasses = classNames(
    'font-[400]',
    'text-secondary-content',
    'text-center',
    'text-[18px]/[24px]',
    'text-left',
    'flex',
    'flex-col',
    'gap-4',
  );
</script>

<div class={wrapperClasses}>
  <div class={rowClasses}>
    <div class={panelClasses}>
      <img src="/how-it-works.png" />
    </div>
    <div class={panelClasses}>
      <div class={titleClasses}>
        Transform your actions into rewards: <span class={pinkSpanClasses}>How it works</span>
      </div>

      <div class={contentClasses}>
        <p class="text-left">
          As you navigate through our vibrant world, your efforts aren’t just transactions—they become valuable
          Experience Points (XP).
        </p>
        <p class="text-left">
          The more you interact with our Mainnet, the more XP you gather, allowing you to level up and unlock greater
          rewards. Each step you take not only advances your journey but also enhances your rewards, creating a
          fulfilling cycle of engagement and achievement.
        </p>
      </div>
    </div>
  </div>

  <div class={rowClasses}>
    <div class={panelClasses}>
      <div class={titleClasses}>
        Level up and <span class={pinkSpanClasses}>compete</span>
      </div>

      <div class={contentClasses}>
        <p class="text-left">
          If you're feeling competitive, there's even more to discover. Each season brings a fresh start with XP reset,
          but don't worry—previous season participants receive a bonus, a percentage of their last season's XP, giving
          you a head start. We also spice up your journey with special timed events offering significant one-time
          bonuses.
        </p>
        <p class="text-left">Are you ready to seize opportunities that will propel you up the leaderboard?</p>
      </div>
    </div>

    <div class={panelClasses}>
      <img src="/level-up.png" />
    </div>
  </div>

  <div class={rowClasses}>
    <div class={panelClasses}>
      <div class={titleClasses}>
        What are <span class={pinkSpanClasses}>Taiko Factions?</span>
      </div>
    </div>
    <div class={panelClasses}>
    <div class={contentClasses}>
        <p class="text-left">
        If you're feeling competitive, there's even more to discover. Each season brings a fresh start with XP
        reset, but don't worry—previous season participants receive a bonus, a percentage of their last season's XP,
        giving you a head start. We also spice up your journey with special timed events offering significant
        one-time bonuses.
        </p>
        <p class="text-left">Are you ready to seize opportunities that will propel you up the leaderboard?</p>
    </div>
    </div>
</div>
</div>
