<script lang="ts">
  import { t } from 'svelte-i18n';

  import { browser } from '$app/environment';
  import { DividerElement } from '$lib/domains/splashpage/components/DividerElement';
  import { ActionButton } from '$shared/components/Button';
  import { FactionsGallery } from '$shared/components/FactionsGallery';
  import Icon from '$shared/components/Icon/Icon.svelte';
  import Title from '$shared/components/Title/Title.svelte';
  import { classNames } from '$shared/utils/classNames';

  let carouselRef: InstanceType<typeof FactionsGallery>;

  $: isLandingPage = browser && window.location.pathname === '/';

  $: noDivider = !isLandingPage;
  const scrollLeft = () => carouselRef.scrollLeft();
  const scrollRight = () => carouselRef.scrollRight();

  const containerClasses = classNames(
    'flex',
    'justify-center',
    'items-center',
    'flex-col',
    'w-screen',
    'bg-base-200',
    'rounded-[30px]',
    'relative',
    'xl:pb-[176px]',
    'pb-[100px]',
    'md:px-[48px]',
    'px-[24px]',
  );

  const sectionClasses = classNames('w-full', 'xl:max-w-[1440px]', 'relative', 'flex', 'mb-8');
  const earnSectionClasses = classNames(sectionClasses, 'mb-20');
  const contentClasses = classNames(
    'flex',
    'flex-col',
    'justify-between',
    'md:flex-row',
    'relative',
    'w-full',
    'items-center',
  );

  const titleContainerClasses = classNames(
    'xl:w-[562px]',
    'md:w-[402px]',
    'md:pt-10',
    'flex',
    'flex-col',
    'justify-between',
  );

  const subtitleClasses = classNames('w-full', 'xl:text-left', 'mb-8', 'md:pt-10', 'md:w-[189px]', 'pt-8', 'w-[100px]');
  const buttonContainerClasses = classNames(
    'lg:m-0',
    'flex',
    'gap-4',
    'md:mb-2',
    'justify-center',
    'md:justify-end',
    'h-full',
    'bottom-0',
    'items-end',
    'self-start',
    'pt-[100px]',
    'lg:pt-0',
  );
  const scrollButtonClasses = classNames('f-center', 'btn-circle', 'border', 'border-secondary');
  const scrollRightButtonClasses = classNames(
    scrollButtonClasses,
    'bg-secondary-brand',
    'hover:bg-primary-interactive-hover',
  );
  const subtitleHeaderClasses = classNames('text-primary-base-content', 'font-clash-grotesk', 'text-xl');
  const subtitleLineClasses = classNames('w-[60px]', 'h-[3px]', 'bg-primary-brand', 'mt-4');
  const titleClasses = classNames('text-primary', '!text-[57px]/[64px]');
  const descriptionWrapperClasses = classNames('w-full', 'f-col', 'mt-12');
  const descriptionClasses = classNames('body-regular', 'text-primary-base-content', 'text-left', 'text-base');
  $: earnTitleContainerClasses = classNames(
    isLandingPage ? 'xl:w-[562px]' : null,
    isLandingPage ? 'lg:w-[504px]' : null,
    isLandingPage ? 'md:w-[440px]' : null,
    'md:pt-10',
    'flex',
    !isLandingPage ? 'w-full' : null,
    'flex-col',
    !isLandingPage ? 'xl:flex-row' : null,
    'justify-start',
    'items-start',
  );
  const earnTitleClasses = classNames('!w-full', '!mb-4');
  const earnTitleSpanClasses = classNames('text-primary-base-content', '!text-5xl', '!leading-4', 'md:!text-6xl');
  const earnDescriptionClasses = classNames(
    'xl:text-left',
    'text-grey-600',
    'text-base',
    'gap-[40px]',
    'w-full',
    'justify-end',
    'items-end',
  );

  const dividerWrapperClasses = classNames('absolute', 'w-full', 'h-auto', 'bottom-0');
  const actionButtonClasses = classNames('!w-[210px]', 'max-w-[210px]', 'w-full', 'h-max', 'z-[32]');

  const bottomRowClasses = classNames(
    'flex',
    'flex-row',
    'justify-start',
    'md:justify-end',
    'w-full',
    'md:w-min',
    'items-end',
    'h-full',
    'pt-[40px]',
    'md:pt-0',
  );

  const factionsWrapperClasses = classNames('w-[100vw]');
</script>

<div class={containerClasses}>
  <div class={sectionClasses}>
    <div class={contentClasses}>
      <div class={titleContainerClasses}>
        <div class={subtitleClasses}>
          <span class={subtitleHeaderClasses}>{$t('factions.subtitle')}</span>
          <div class={subtitleLineClasses}></div>
        </div>

        <Title class={titleClasses} center="left" width="full">
          Taiko <span class="text-primary-base-content">Factions</span>
        </Title>

        <div class={descriptionWrapperClasses}>
          <div class={descriptionClasses}>
            {$t('factions.gallery.description')}
          </div>
        </div>
      </div>

      <div class={buttonContainerClasses}>
        <button class={scrollButtonClasses} on:click={scrollLeft}>
          <Icon class="-translate-x-[2px]" fillClass="fill-secondary-brand" type="chevron-left" />
        </button>
        <button class={scrollRightButtonClasses} on:click={scrollRight}>
          <Icon class="translate-x-[2px]" fillClass="fill-white" type="chevron-right" />
        </button>
      </div>
    </div>
  </div>

  <div class={factionsWrapperClasses}>
    <FactionsGallery bind:this={carouselRef} />
  </div>

  {#if !noDivider}
    <div class={dividerWrapperClasses}>
      <DividerElement />
    </div>
  {/if}
  <div class={earnSectionClasses}>
    <div class={contentClasses}>
      <div class={earnTitleContainerClasses}>
        <Title class={earnTitleClasses} center="left">
          <span class={earnTitleSpanClasses}>
            {#if isLandingPage}
              {$t('factions.landing.title')}
            {:else}
              {$t('factions.about.title')}
            {/if}
          </span>
        </Title>

        <div class={earnDescriptionClasses}>
          {#if isLandingPage}
            {$t('factions.landing.description')}
          {:else}
            {$t('factions.about.description')}
          {/if}
        </div>
      </div>
      <div class={bottomRowClasses}>
        {#if isLandingPage}
          <ActionButton priority="primary" class={actionButtonClasses} href="/about">
            {$t('buttons.factions.learn_about')}
          </ActionButton>
        {:else}
          <ActionButton
            href="https://www.okx.com/web3/marketplace/nft/collection/taiko/trailblazers-badges"
            priority="primary"
            class={actionButtonClasses}>
            {$t('buttons.factions.get_yours')}
          </ActionButton>
        {/if}
      </div>
    </div>
  </div>
</div>
