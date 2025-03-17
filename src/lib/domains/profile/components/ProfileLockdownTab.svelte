<script lang="ts">
  import { t } from 'svelte-i18n';

  import EcosystemItem from '$lib/domains/ecosystem/components/EcosystemItem.svelte';
  import { classNames } from '$shared/utils/classNames';
  import { isMobile, isTablet } from '$shared/utils/responsiveCheck';
  const wrapperClasses = classNames(
    'container',
    'w-full',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'rounded-[30px]',
    'relative',
    'pt-[60px]',
    'md:pb-[38px]',
    'pb-[45px]',
    'flex',
    'flex-col',
    'gap-[50px]',
    'justify-center',
    'items-center',
  );

  const headerImageClasses = classNames('w-full');

  const textWrapperClasses = classNames(
    'w-full',
    'px-[24px]',
    'md:px-[0]',
    'md:w-3/5',
    'flex',
    'flex-col',
    'gap-[16px]',
  );

  const titleClasses = classNames(
    'text-primary-link',
    'text-[18px]/[24px]',
    'font-[700]',
    'uppercase',
    'w-full',
    'text-center',
  );

  const contentClasses = classNames('text-[16px]/[24px]', 'text-secondary-content', 'w-full', 'text-center');

  const partnersWrapperClasses = classNames(
    'w-full',
    'grid',
    'px-[10px]',
    'md:px-[24px]',
    'md:gap-[20px]',
    'gap-[24px]',
    'xl:grid-cols-4',
    'lg:grid-cols-3',
    'md:grid-cols-2',
    'grid-cols-1',
  );
</script>

<div class={wrapperClasses}>
  {#if $isMobile}
    <img class={headerImageClasses} alt="header" src="/lockdown/header-sm.svg" />
  {:else if $isTablet}
    <img class={headerImageClasses} alt="header" src="/lockdown/header-md.svg" />
  {:else}
    <img class={headerImageClasses} alt="header" src="/lockdown/header-lg.svg" />
  {/if}

  <div class={textWrapperClasses}>
    <div class={titleClasses}>{$t('lockdown.title')}</div>
    <div class={contentClasses}>
      {$t('lockdown.content')}
    </div>
  </div>
  <div class={partnersWrapperClasses}>
    <EcosystemItem
      data={{
        name: 'Taiko Drips',
        description:
          'Introducing Taiko Drips 💧, the lock-to-earn platform for loyal $TAIKO holders to earn rewards from the based @taikoxyz ecosystem.',
        logo: '/lockdown/taiko-drips.png',
        url: 'https://taikodrips.xyz/',
        category: 'DeFi',
        button: 'Lock Now',
      }} />
  </div>
</div>
