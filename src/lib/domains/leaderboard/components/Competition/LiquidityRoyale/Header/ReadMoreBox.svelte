<script lang="ts">
  import { getContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { classNames } from '$shared/utils/classNames';

  const innerWrapperClasses = classNames('f-col', 'md:f-row', 'gap-[30px]', 'items-center', 'justify-center');
  const textClasses = classNames(
    'font-clash-grotesk',
    'font-medium',
    'leading-[24px]',
    'md:min-w-[289px]',

    'xl:justify-self-start',
  );
  const boxClasses = classNames(
    'f-col',
    'md:f-row',
    'border',
    'border-[2px]',
    'rounded-[30px]',
    'border-primary-border-accent',
    'px-[40px]',
    'py-[24px]',
    'space-y-[30px]',
    'md:space-y-0',
    'md:space-x-[30px]',
    'md:pr-[50px]',
    'items-center',
    'justify-center',
    'xl:justify-between',
  );

  const buttonClasses = classNames('min-w-[140px]', 'max-w-[140px]');

  const iconClasses = classNames('w-[56px]', 'h-[56px]');
  const edition = getContext<number>('liquidityEdition');

  $: url = $t(`leaderboard.liquidityRoyale.blogpost.url.edition${edition}`);
</script>

<div class={boxClasses}>
  <div class={innerWrapperClasses}>
    <img src="/questionmark-glow.svg" alt="questionmark icon" class={iconClasses} />

    <span class={textClasses}>{$t(`leaderboard.liquidityRoyale.readmore.edition${edition}.text`)}</span>
  </div>
  <ActionButton priority="primary" class={buttonClasses} href={url}>{$t('common.learn_more')}</ActionButton>
</div>
