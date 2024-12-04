<script lang="ts">
  import { t } from 'svelte-i18n';

  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { classNames } from '$shared/utils/classNames';

  const containerClasses = classNames(
    'w-full',
    'xl:max-w-[1440px]',
    'mt-0',
    'md:mt-20',
    'lg:mt-0',
    'gap-8',
    'flex',
    'flex-col',
    'lg:flex-row',
  );

  const leaderboardImageClasses = classNames(
    'lg:w-full',
    'flex',
    'rounded-[30px]',
    'h-[300px]',
    'lg:h-auto',
    'border-2',
    'border-grey-600',
  );

  const leaderboardImageContentClasses = classNames('object-contain', 'm-auto');

  const smImageClasses = classNames(leaderboardImageContentClasses, 'sm:hidden');
  const mdImageClasses = classNames(leaderboardImageContentClasses, 'hidden', 'sm:block', 'md:hidden');
  const lgImageClasses = classNames(leaderboardImageContentClasses, 'hidden', 'md:block', 'lg:hidden');
  const xlImageClasses = classNames(leaderboardImageContentClasses, 'hidden', 'lg:block');

  const contentContainerClasses = classNames('w-full', 'lg:w-fit', 'lg:z-10');

  const contentClasses = classNames(
    'lg:w-[432px]',
    'lg:h-full',
    'justify-center',
    'items-start',
    'rounded-[30px]',
    'bg-base-200',
    'w-full',
    'grid',
    'grid-cols-6',
  );

  const contentInnerClasses = classNames(
    'flex',
    'flex-col',
    'w-full',
    'lg:w-auto',
    'md:col-span-4',
    'md:col-start-2',
    'lg:col-span-6',
    'lg:col-start-1',
    'col-span-6',
    'p-[36px]',
  );

  const titleContainerClasses = classNames('flex', 'flex-col');

  const subtitleClasses = classNames('w-full', 'xl:text-left', 'mb-[40px]', 'md:pt-2', 'pt-8');

  const subtitleTextClasses = classNames('text-primary-base-content', 'font-clash-grotesk', 'text-[20px]');

  const subtitleLineClasses = classNames('w-[60px]', 'h-[3px]', 'bg-primary-brand', 'mt-[10px]');

  const titleClasses = classNames(
    'max-w-[434px]',
    'font-clash-grotesk',
    'text-primary-base-content',
    'tracking-[-1.5px]',
    'text-[45px]',
    'leading-[52px]',
    'md:text-[57px]',
    'text-left',
    'md:leading-[64px]',
  );

  const titleBreakClasses = classNames('hidden', 'md:block');

  const descriptionClasses = classNames('mt-[16px]', 'mb-[89px]', 'md:mb-[65px]', 'text-grey-600');

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

  const secondaryButtonTextClasses = classNames('text-primary-base-content');
</script>

<div class={containerClasses}>
  <div class={leaderboardImageClasses}>
    <img class={smImageClasses} src="/leaderboard/sm/rank.png" alt="leaderboard small" />
    <img class={mdImageClasses} src="/leaderboard/md/rank.png" alt="leaderboard medium" />
    <img class={lgImageClasses} src="/leaderboard/lg/rank.png" alt="leaderboard large" />
    <img class={xlImageClasses} src="/leaderboard/xl/rank.png" alt="leaderboard xlarge" />
  </div>
  <div class={contentContainerClasses}>
    <div class={contentClasses}>
      <div class={contentInnerClasses}>
        <div class={titleContainerClasses}>
          <div class={subtitleClasses}>
            <span class={subtitleTextClasses}>{$t('factions.subtitle')}</span>
            <div class={subtitleLineClasses}></div>
          </div>
          <div class={titleClasses}>
            Rank up <br class={titleBreakClasses} />on the leaderboard!
          </div>
          <div class={descriptionClasses}>
            Earn Experience Points (XP) and climb from beginner to legend. Every action moves you to closer exclusive
            rewards and elite status.
          </div>

          <div class={buttonContainerClasses}>
            <div class={buttonClasses}>
              <ActionButton priority="primary" href="/leaderboard/s2/user">User leaderboard</ActionButton>
            </div>
            <div class={buttonClasses}>
              <ActionButton priority="secondary" href="/leaderboard/s2/dapp">
                <span class={secondaryButtonTextClasses}>Dapps leaderboard</span>
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
