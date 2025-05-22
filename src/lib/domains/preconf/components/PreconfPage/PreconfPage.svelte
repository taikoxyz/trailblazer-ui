<script lang="ts">
  import { json, t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import ContentBox from '$shared/components/ContentBox/ContentBox.svelte';
  import Note from '$shared/components/Note/Note.svelte';
  import { classNames } from '$shared/utils/classNames';

  import BasedLiners from '../BasedLiners/BasedLiners.svelte';
  import Carousel from './Carousel.svelte';

  const wrapperClasses =
    'f-col items-center gap-[100px] px-[48px] container justify-center self-center mx-auto mt-[70px] mb-[150px]';
  const startTimeClasses = classNames(
    'mb-[20px]',
    'text-primary-link',
    'text-center',
    'lg:text-left',
    'font-clash-grotesk',
    'font-medium',
    'leading-normal',
  );

  const headerImageClasses = classNames(
    'w-[100%]',
    'max-w-[401px]',
    'xl:max-w-[500px]',
    'lg:order-last',
    'mb-[80px]',
    'lg:mb-0',
  );
  const ctaClasses = 'min-w-[220px] max-w-[220px] lg:self-start';

  const containerClasses = classNames('flex', 'items-center', 'justify-center', 'w-full');
  const lineClassesLeft = classNames(
    'flex-grow',
    'h-[2px]',
    'bg-gradient-to-l',
    'from-pink-500',
    'to-transparent',
    'hidden',
    'md:block',
    'mr-4',
  );
  const lineClassesRight = classNames(
    'flex-grow',
    'h-[2px]',
    'bg-gradient-to-r',
    'from-pink-500',
    'to-transparent',
    'hidden',
    'md:block',
    'ml-4',
  );

  const entryRowClasses = classNames(
    'text-[#ADB1B8]',
    'w-full',
    'grid',
    'grid-cols-1',
    'lg:grid-cols-2',
    'items-start',
    'justify-center',
  );

  const entryTitleClass = classNames(
    'text-[35px]',
    'lg:text-[45px]',
    'font-medium',
    'leading-[42px]',
    'w-full',
    'font-clash-grotesk',
    'lg:leading-[52px]',
    'lg:min-w-[293px]',
    // 'lg:max-w-[293px]',
    'text-[#F3F3F3]',
  );

  $: carouselItems = $json('pages.preconfs.sections.carousel') as { label: string; image: string }[];
</script>

<div class={wrapperClasses}>
  <div class="lg:f-between-center w-full f-col items-center lg:f-row">
    <img src="/preconfs/speed.png" alt="Preconfs" class={headerImageClasses} />
    <div class="f-col">
      <span class={startTimeClasses}> {$t('pages.preconfs.sections.hero.subtitle')} </span>
      <ContentBox
        title={$t('pages.preconfs.sections.hero.title')}
        alwaysColumn
        titleOverrideClasses={'lg:max-w-[502px]'}
        contentOverrideClasses={'lg:max-w-[452px]'}>
        <p>
          {$t('pages.preconfs.sections.hero.content')}
        </p>
        <Note>
          {$t('pages.preconfs.sections.hero.note')}
        </Note>
        <ActionButton
          priority="primary"
          type="button"
          on:click={(event) => {
            event.preventDefault();
            const el = document.getElementById('basedliners-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}>
          {$t('pages.preconfs.sections.hero.cta.text')}
        </ActionButton>
      </ContentBox>
    </div>
  </div>

  <div class="h-sep" />

  <div class={entryRowClasses}>
    <div class={entryTitleClass}>{$t('pages.preconfs.sections.preconfirmations.title')}</div>
    <div class="flex flex-col gap-[16px]">
      <p>{$t('pages.preconfs.sections.preconfirmations.content')}</p>
      <div></div>
      <ActionButton priority="primary" href={$t('pages.preconfs.sections.preconfirmations.cta.href')}
        >{$t('pages.preconfs.sections.preconfirmations.cta.text')}</ActionButton>
    </div>
  </div>

  <Carousel items={carouselItems} />

  <div class={entryRowClasses}>
    <div class="flex flex-col gap-[46px]">
      <div class={entryTitleClass}>{$t('pages.preconfs.sections.become.title')}</div>
      <p>{$t('pages.preconfs.sections.become.content')}</p>
    </div>
    <div class="flex flex-col gap-[16px]">
      <div></div>
    </div>
  </div>

  <BasedLiners />

  <div class={entryRowClasses}>
    <div class="w-full flex flex-col gap-[46px]">
      <div class={entryTitleClass}>{$t('pages.preconfs.sections.earn.title')}</div>
      <p>{$t('pages.preconfs.sections.earn.content')}</p>
    </div>
  </div>

  <!-- <FeaturedPartners title="Featured Partners" /> -->

  <!-- CTA -->
  <div class={containerClasses}>
    <div class={lineClassesLeft}></div>
    <ActionButton
      class={ctaClasses + ' min-w-[300px]'}
      priority="primary"
      on:click={() => goto('/ecosystem')}
      withArrow>
      Explore the ecosystem now
    </ActionButton>
    <div class={lineClassesRight}></div>
  </div>
</div>
