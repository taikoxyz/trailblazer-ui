<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { classNames } from '$libs/util/classNames';

  const handleUserLeaderboard = () => {
    goto('./leaderboard/user');
  };

  const handleDappsLeaderboard = () => {
    goto('./leaderboard/dapp');
  };

  const containerClasses = classNames('md:px-[56px]', 'w-full', 'flex', 'flex-col', 'lg:flex-row');

  const leaderboardImageClasses = classNames(
    'lg:w-full',
    'lg:h-[640px]',
    'flex',
    'mx-9',
    'rounded-[30px]',
    'border-2',
    'border-[#444A55]',
    'bg-gradient-to-br',
    'from-[rgba(93,99,111,0.1)]',
    'to-[rgba(25,30,40,0.2)]',
    'backdrop-blur-[10px]',
  );

  const contentContainerClasses = classNames('w-full', 'p-9', 'lg:p-0', 'lg:w-fit', 'lg:z-10');

  const contentClasses = classNames(
    'lg:w-[432px]',
    'lg:h-[640px]',
    'inline-flex',
    'p-9',
    'flex-col',
    'justify-center',
    'items-start',
    'gap-[89px]',
    'rounded-[30px]',
    'bg-[#F8F8F8]',
    'w-full',
  );

  const titleContainerClasses = classNames('flex', 'flex-col', 'w-[270px]', 'md:w-[506px]', 'lg:w-[368px]');

  const subtitleClasses = classNames(
    'w-full',
    'xl:text-left',
    'mb-[40px]',
    'md:pt-2',
    'md:w-[189px]',
    'pt-8',
    'w-[100px]',
  );

  const titleClasses = classNames(
    'max-w-[434px]',
    'font-clash-grotesk',
    'text-primary-base-content',
    'tracking-[-1.5px]',
    'text-[45px]',
    'lg:text-[57px]',
    'text-left',
    'leading-[64px]',
  );

  const descriptionClasses = classNames('mt-[16px]', 'mb-[89px]', 'md:mb-[65px]', 'text-secondary-content');

  const buttonContainerClasses = classNames(
    'm-auto',
    'flex',
    'flex-col',
    'md:flex-row',
    'lg:flex-col',
    'gap-[15px]',
    'w-full',
  );

  const buttonClasses = classNames('w-[190px]', 'lg:w-full');
</script>

<div class={containerClasses}>
  <div class={leaderboardImageClasses}>
    <img class="mx-4 my-6" src="/leaderboard.svg" alt="leaderboard" />
  </div>
  <div class={contentContainerClasses}>
    <div class={contentClasses}>
      <div class="flex flex-col xl:flex-row w-full">
        <div class={titleContainerClasses}>
          <div class={subtitleClasses}>
            <span class="text-primary-base-content font-clash-grotesk text-[20px]">{$t('factions.subtitle')}</span>
            <div class="w-[60px] h-[3px] bg-primary-brand mt-[10px]"></div>
          </div>
          <div class={titleClasses}>
            Rank up <br class="hidden lg:block" />on the leaderboard!
          </div>
          <div class={descriptionClasses}>
            Earn Experience Points (XP) and climb from beginner to legend. Every action moves you to closer exclusive
            rewards and elite status.
          </div>

          <div class={buttonContainerClasses}>
            <div class={buttonClasses}>
              <ActionButton priority="primary" on:click={handleUserLeaderboard}>User leaderboard</ActionButton>
            </div>
            <div class={buttonClasses}>
              <ActionButton priority="secondary" on:click={handleDappsLeaderboard}>
                <span class="text-primary-base-content">Dapps leaderboard</span>
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
