<script lang="ts">
  import { t } from 'svelte-i18n';

  import { browser } from '$app/environment';
  import { ActionButton } from '$components/Button';
  import { FactionsGallery } from '$components/FactionsGallery';
  import Icon from '$components/Icon/Icon.svelte';
  import Title from '$components/Title/Title.svelte';
  import { classNames } from '$libs/util/classNames';

  import { DividerElement } from '../DividerElement';

  let carouselRef: InstanceType<typeof FactionsGallery>;

  $: isLandingPage = browser && window.location.pathname === '/';

  $: noDivider = !isLandingPage;
  const scrollLeft = () => carouselRef.scrollLeft();
  const scrollRight = () => carouselRef.scrollRight();

  const containerClasses = classNames(
    'flex',
    'flex-col',
    'w-screen',
    'xl:max-w-[1440px]',
    'lg:max-w-[1024px]',
    'md:max-w-[768px]',
    'sm:max-w-[640px]',
    'bg-base-200',
    'rounded-[30px]',
    'relative',
  );

  const sectionClasses = classNames('w-full', 'px-[48px]', 'relative', 'grid', 'md:grid-cols-6', 'grid-cols-4', 'mb-8');
  const earnSectionClasses = classNames(sectionClasses, 'mb-20');
  const contentClasses = classNames(
    'lg:col-span-4',
    'lg:col-start-2',
    'md:col-start-2',
    'col-span-4',
    'flex',
    'flex-col',
    'justify-between',
    'md:flex-row',
    'relative',
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
    'md:m-auto',
    'lg:m-0',
    'mt-20',
    'flex',
    'gap-4',
    'md:justify-start',
    'lg:justify-center',
    'md:mb-2',
    'justify-center',
    'xl:justify-end',
    'h-full',
    'bottom-0',
    'items-end',
    'self-start',
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
    'max-w-[482px]',
    'mb-8',
    'text-base',
    'flex',
    'flex-col',
    'gap-[40px]',
  );
  const actionButtonClasses = classNames('relative', 'z-40', '!w-[210px]', 'w-full');

  const dividerWrapperClasses = classNames('bg-[green]', 'absolute', 'w-full', 'h-auto', 'bottom-0');
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

  <FactionsGallery bind:this={carouselRef} />
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
</div>
