<script lang="ts">
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames('flex', 'flex-col', 'items-center', 'justify-center', 'gap-24');

  const rowClasses = classNames(
    'flex',
    'px-12',
    'flex-row',
    'w-full',
    'gap-12',
    'justify-between',
    'items-center',
    'w-[80%]',
  );

  const boxedRowClasses = classNames(
    rowClasses,
    'border',
    'border-[#444A55]',
    'bg-gradient-to-b',
    //'from-[rgba(93, 99, 111, 0.1)]',
    'to-[rgba(25,30,40,0.2)]',
    'from-[rgba(93,99,111,0.1)]',
    'rounded-[30px]',
    'py-16',
  );

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

  const buttonsWrapperClasses = classNames('flex', 'flex-row', 'gap-4', 'justify-center', 'items-center', 'w-full');

  const buttonLinkWrapperClasses = classNames('w-1/2');
</script>

<div class={wrapperClasses}>
  <div class={rowClasses}>
    <div class={panelClasses}>
      <img src="/how-it-works.png" alt="How it works" />
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
      <img src="/level-up.png" alt="Level Up" />
    </div>
  </div>

  <div class={boxedRowClasses}>
    <div class={panelClasses}>
      <img src="/leaderboard.svg" alt="Leaderboard" />
    </div>
    <div class={panelClasses}>
      <div class={titleClasses}>
        <span class={pinkSpanClasses}>Rank up</span>on the leaderboard
      </div>

      <div class={contentClasses}>
        <p class="text-left">
          Earn Experience Points (XP) and climb from beginner to legend. Every action moves you to closer exclusive
          rewards and elite status.
        </p>
      </div>

      <div class={buttonsWrapperClasses}>
        <a class={buttonLinkWrapperClasses} href="/leaderboard/user">
          <ActionButton priority="primary">User leaderboard</ActionButton></a>
        <a class={buttonLinkWrapperClasses} href="/leaderboard/dapp">
          <ActionButton priority="secondary">Dapps leaderboard</ActionButton>
        </a>
      </div>
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
          If you're feeling competitive, there's even more to discover. Each season brings a fresh start with XP reset,
          but don't worry—previous season participants receive a bonus, a percentage of their last season's XP, giving
          you a head start. We also spice up your journey with special timed events offering significant one-time
          bonuses.
        </p>
        <p class="text-left">Are you ready to seize opportunities that will propel you up the leaderboard?</p>
      </div>
    </div>
  </div>
</div>
