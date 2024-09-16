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

  const handleFactionsButton = () => goto('/about');
  const scrollLeft = () => carouselRef.scrollLeft();
  const scrollRight = () => carouselRef.scrollRight();

  const containerClasses = classNames('flex flex-col w-screen bg-base-200 rounded-t-[30px] rounded-b-none');

  const sectionClasses = classNames('flex flex-col w-screen lg:h-[413px] justify-center');
  const earnSectionClasses = classNames(sectionClasses, 'lg:mb-28');

  const contentClasses = classNames('f-center flex-col lg:flex-row gap-24 px-8');

  const titleContainerClasses = classNames('flex flex-col justify-between md:pt-10 md:w-[402px] xl:w-[562px]');

  const subtitleClasses = classNames('w-full xl:text-left mb-8 pt-8 md:pt-10 w-[100px] md:w-[189px]');

  const buttonContainerClasses = classNames(
    'flex gap-4 justify-center items-end self-start h-full bottom-0',
    'md:m-auto md:w-[402px] md:justify-start md:mb-2',
    'lg:m-0 lg:w-[116px] lg:justify-center',
    'xl:justify-end',
  );

  const scrollButtonBaseClasses = classNames('f-center btn-circle border border-secondary');
  const scrollButtonClasses = scrollButtonBaseClasses;
  const scrollRightButtonClasses = classNames(
    scrollButtonBaseClasses,
    'bg-secondary-brand hover:bg-primary-interactive-hover',
  );

  const subtitleHeaderClasses = classNames('text-primary-base-content font-clash-grotesk text-xl');
  const subtitleLineClasses = classNames('w-[60px] h-[3px] bg-primary-brand mt-4');

  const titleClasses = classNames('text-primary !text-6xl');
  const descriptionClasses = classNames('body-regular text-primary-base-content text-left text-base');

  const earnTitleContainerClasses = classNames(
    'flex flex-col justify-between md:pt-10',
    'md:w-[440px] lg:w-[504px] xl:w-[562px]',
  );

  const earnTitleClasses = classNames('my-8 !w-full !mb-4 lg:w-[504px]');
  const earnTitleSpanClasses = classNames('text-primary-base-content !text-5xl !leading-4 md:!text-6xl');
  const earnDescriptionClasses = classNames('xl:text-left text-secondary-content max-w-[482px] mb-8 text-base');
  const actionButtonClasses = classNames('!w-[210px] w-full');
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

        <div class="w-full f-col mt-12">
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

  <div class={earnSectionClasses}>
    <div class={contentClasses}>
      <div class={earnTitleContainerClasses}>
        <Title class={earnTitleClasses} center="left">
          <span class={earnTitleSpanClasses}>
            {$t('factions.earn.title')}
          </span>
        </Title>
        <div class={earnDescriptionClasses}>
          {$t('factions.earn.description')}
        </div>
        <ActionButton priority="primary" class={actionButtonClasses} on:click={handleFactionsButton}>
          {$t('buttons.factions.learn_about')}
        </ActionButton>
      </div>
      <div class={buttonContainerClasses}></div>
    </div>
  </div>

  <DividerElement />
</div>
