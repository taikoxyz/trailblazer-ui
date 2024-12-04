<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { classNames } from '$shared/utils/classNames';
  import { isMobile, isTablet, isTabletLg } from '$shared/utils/responsiveCheck';

  import { ActionButton } from '../Button';
  import type { CampaignCardType } from '../FeaturedCampaigns/types';

  export let content: CampaignCardType;

  const { title, text } = content;

  $: img = $isMobile
    ? content.images.sm
    : $isTablet
      ? content.images.md
      : $isTabletLg
        ? content.images.lg
        : content.images.xl;

  let isDesktopOrLarger = true;
  $: dynamicAttrs = isDesktopOrLarger ? { 'data-glow-border': true } : {};

  const cardClasses = classNames(
    'card',
    'rounded-[20px]',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'h-full',
    $$props.class,
  );

  const innerWrapper = classNames('flex', 'flex-col', 'h-full');

  const titleClasses = classNames('font-clash-grotesk', 'text-[20px]', 'font-medium', 'leading-normal');

  const imageClasses = classNames('w-full', 'h-[200px]', 'object-cover', 'rounded-[20px]', 'mb-[24px]');

  const buttonClasses = classNames('min-w-[140px]', 'max-w-[140px]');
  const textClasses = classNames('text-secondary-content', 'mb-[30px]', 'flex-grow');
  const bodyClasses = classNames(
    'card-body',
    'body-regular',
    'p-[20px]',
    'flex',
    'flex-col',
    'justify-between',
    'h-full',
  );
</script>

<div class={cardClasses}>
  <div {...dynamicAttrs} class={bodyClasses}>
    <div class={innerWrapper}>
      <img src={img} alt="card-header" class={imageClasses} />
      <h2 class={titleClasses}>{title}</h2>
      <p class={textClasses}>{text}</p>
    </div>
    <div class="mt-auto">
      {#if content.btn.external}
        <ActionButton priority="primary" class={buttonClasses} href={content.btn.destination}>
          {$t('common.learn_more')}
        </ActionButton>
      {:else}
        <ActionButton priority="primary" class={buttonClasses} on:click={() => goto(content.btn.destination)}>
          {content.btn.text}
        </ActionButton>
      {/if}
    </div>
  </div>
</div>
