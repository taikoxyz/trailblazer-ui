<script lang="ts">
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames('flex', 'flex-col', 'items-center', 'justify-center', 'gap-24');

  const rowClasses = classNames(
    'flex',
    'lg:px-12',
    'flex-col',
    'lg:flex-row',
    'gap-12',
    'justify-between',
    'items-center',
    'lg:w-[calc(100%*6/8)]',
    'lg:mx-0',
    'text-center',
    'lg:text-left',
    'md:w-2/3',
  );

  const boxedRowClasses = classNames(
    'flex',
    'lg:px-12',
    'flex-col',
    'lg:flex-row',
    'gap-12',
    'justify-between',
    'items-center',
    'lg:w-[calc(100%*6/8)]',
    'lg:mx-0',
    'text-center',
    'lg:text-left',
    'border',
    'border-[#444A55]',
    'bg-gradient-to-b',
    'to-[rgba(25,30,40,0.2)]',
    'from-[rgba(93,99,111,0.1)]',
    'rounded-[30px]',
    'pt-[38px]',
    'pb-[21px]',
    'md:py-16',
    'md:w-full',
    'md:px-[calc(100%/6)]',
    'px-[21px]',
  );

  const panelClasses = classNames(
    'w-full',
    'lg:w-1/2',
    'h-full',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'gap-8',
  );

  const pinkSpanClasses = classNames('text-secondary');

  const titleClasses = classNames(
    'font-clash-grotesk',
    'text-[40px]/[40px]',
    'lg:text-[75px]/[75px]',
    'md:text-[60px]/[60px]',
    'tracking-[-2%]',
    'font-[500]',
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

  const buttonsWrapperClasses = classNames(
    'flex',
    'flex-col',
    'md:flex-row',
    'md:px-0',
    'gap-4',
    'justify-center',
    'items-center',
    'w-full',
  );

  const buttonLinkWrapperClasses = classNames('w-full', 'md:w-[210px]', 'h-[48px]', 'min-w-max');

  const textClasses = classNames('lg:text-left', 'text-center');
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

  <div class={classNames(rowClasses, 'lg:flex-row', 'flex-col-reverse')}>
    <div class={panelClasses}>
      <div class={classNames(titleClasses, 'w-1/2', 'md:w-full')}>
        Level up and <span class={pinkSpanClasses}>compete</span>
      </div>

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
        <span class={pinkSpanClasses}>Rank up</span> on the leaderboard
      </div>

      <div class={contentClasses}>
        <p class={textClasses}>
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
        <p class={textClasses}>
          Taiko Factions are unique groups within the Taiko Trailblazers campaign, each representing a specific set of
          skills, achievements, and contributions to the Taiko network. These factions are integral to the storyline set
          in the futuristic city of Neo Nakuza, where a new music technology called BOOSTED has created an underground
          dance music scene known as ‘BASED’.
        </p>
        <p class={textClasses}>
          The factions embody different aspects of the Taiko community, from trading and staking to gaming and digital
          identity, and are represented by various characters and roles within the campaign. There are 8 Taiko factions
          in total:
        </p>
      </div>
    </div>
  </div>
</div>
