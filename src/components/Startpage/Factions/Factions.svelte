<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import { FactionsGallery } from '$components/FactionsGallery';
  import Icon from '$components/Icon/Icon.svelte';
  import Title from '$components/Title/Title.svelte';
  import { classNames } from '$libs/util/classNames';

  import { DividerElement } from '../DividerElement';

  let carouselRef: InstanceType<typeof FactionsGallery>;

  const handleFactionsButton = () => {
    goto('/about');
  };

  function scrollLeft() {
    carouselRef.scrollLeft();
  }

  function scrollRight() {
    carouselRef.scrollRight();
  }

  const containerClasses = classNames(
    'flex',
    'flex-col',
    'w-screen',
    'bg-base-200',
    'rounded-t-[30px]',
    'rounded-b-none',
  );

  const sectionClasses = classNames('flex', 'flex-col', 'w-screen', 'lg:h-[413px]', 'justify-center');

  const contentClasses = classNames('f-center', 'flex-col', 'lg:flex-row', 'gap-[100px]', 'px-8');

  const titleContainerClasses = classNames(
    'lg:w-[562px]',
    'md:w-[402px]',
    'md:pt-10',
    'flex',
    'flex-col',
    'justify-between',
  );

  const subtitleClasses = classNames(
    'w-full',
    'xl:text-left',
    'mb-[40px]',
    'md:pt-10',
    'md:w-[189px]',
    'pt-8',
    'w-[100px]',
  );

  const buttonContainerClasses = classNames(
    'md:m-auto',
    'lg:m-0',
    'flex',
    'gap-4',
    'md:w-[402px]',
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

  const scrollButtonClasses = classNames('f-center', 'btn-circle', 'border', 'border-primary-brand');

  const scrollRightButtonClasses = classNames(
    scrollButtonClasses,
    'bg-primary-brand',
    'hover:bg-primary-interactive-hover',
  );
</script>

<div class={containerClasses}>
  <div class={sectionClasses}>
    <div class={contentClasses}>
      <div class={titleContainerClasses}>
        <div class={subtitleClasses}>
          <span class="text-primary-base-content font-clash-grotesk text-[20px]">{$t('factions.subtitle')}</span>
          <div class="w-[60px] h-[3px] bg-primary-brand mt-[10px]"></div>
        </div>

        <Title class="text-primary !text-[57px]" center="left" width="full">
          Taiko <span class="text-primary-base-content">Factions</span>
        </Title>

        <div class="w-full f-col mt-12">
          <div class="body-regular text-primary-base-content text-left text-[16px]">
            {$t('factions.gallery.description')}
          </div>
        </div>
      </div>

      <div class={buttonContainerClasses}>
        <button class={scrollButtonClasses} on:click={scrollLeft}>
          <Icon class="-translate-x-[2px]" type="chevron-left" />
        </button>
        <button class={scrollRightButtonClasses} on:click={scrollRight}>
          <Icon class="translate-x-[2px]" type="chevron-right" />
        </button>
      </div>
    </div>
  </div>

  <FactionsGallery bind:this={carouselRef} />

  <div class={sectionClasses}>
    <div class={contentClasses}>
      <div class={titleContainerClasses}>
        <Title class="my-[40px] !max-w-full !w-full !mb-[16px]" center="left">
          <span class="text-primary-base-content !text-[45px] !leading-4 md:!text-[57px]">
            {$t('factions.earn.title')}
          </span>
        </Title>
        <div class="xl:text-left text-secondary-content max-w-[482px] mb-[40px] text-[16px]">
          {$t('factions.earn.description')}
        </div>
        <ActionButton priority="primary" class="!w-[210px] w-full" on:click={handleFactionsButton}>
          {$t('buttons.factions.learn_about')}
        </ActionButton>
      </div>
      <div class={buttonContainerClasses}></div>
    </div>
  </div>

  <div class="w-full">
    <DividerElement />
  </div>
</div>
