<script lang="ts">
  import { onMount } from 'svelte';
  import { json, t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { FaqBlock } from '$lib/domains/splashpage/components/FaqBlock';
  import type { IFaqEntry } from '$lib/domains/splashpage/components/FaqBlock/FaqBlock.svelte';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import ContentBox from '$shared/components/ContentBox/ContentBox.svelte';
  import Note from '$shared/components/Note/Note.svelte';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import BasedLiners from '../BasedLiners/BasedLiners.svelte';
  import Carousel from './Carousel.svelte';


  let faqElement: HTMLElement;

  function scrollToHash() {
    const hash = window.location.hash;
    if (hash === '#faq' && faqElement) {
      faqElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    scrollToHash();

    const handleHashChange = () => scrollToHash();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });

  const wrapperClasses =
    'f-col items-center gap-[100px] px-[48px] container justify-center self-center mx-auto mt-[70px] mb-[150px]';
  const headlineClasses = 'lg:text-left text-white font-bold leading-[28px]';
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

  const ctaLink = `/profile/${getConnectedAddress()}#badge-recruitment`;

  const faqEntries = $json('badge_recruitment.faq.entries') as IFaqEntry[];

  const entryRowClasses = classNames(
    'text-[#ADB1B8]',
    'w-full',
    'grid','grid-cols-1','lg:grid-cols-2',
    'items-start', 'justify-center',
  )


  const entryTitleClass = classNames(
    'text-[35px]',
    'lg:text-[45px]',
    'font-medium',
    'leading-[42px]',
    'font-clash-grotesk',
    'lg:leading-[52px]',
    'lg:min-w-[293px]',
    'lg:max-w-[293px]',
    'text-[#F3F3F3]'
  );

  $: carouselItems = $json('pages.preconfs.sections.carousel') as {label: string, image:string}[]
</script>

<div class={wrapperClasses}>
  <div class="lg:f-between-center w-full f-col items-center lg:f-row">
    <img src="/preconfs/speed.png" alt="Preconfs" class={headerImageClasses} />
    <div class="f-col">
      <span class={startTimeClasses}> {$t('pages.preconfs.sections.hero.subtitle')} </span>
      <ContentBox
        title={$t('pages.preconfs.sections.hero.title')}
        alwaysColumn
        titleOverrideClasses={'lg:max-w-[452px]'}
        contentOverrideClasses={'lg:max-w-[452px]'}>
        <p>
          {$t('pages.preconfs.sections.hero.content')}
        </p>
        <Note>
          {$t('pages.preconfs.sections.hero.note')}
        </Note>
        <ActionButton
        priority="primary"
        href={$t('pages.preconfs.sections.hero.cta.href')}
        >{$t('pages.preconfs.sections.hero.cta.text')}</ActionButton>
      </ContentBox>
    </div>
  </div>

  <div class="h-sep" />

  <div class={entryRowClasses}>
<div class={entryTitleClass}>{$t('pages.preconfs.sections.preconfirmations.title')}</div>
<div class="flex flex-col gap-[16px]">
<p>{$t('pages.preconfs.sections.preconfirmations.content')}</p>
<div></div>
<ActionButton
        priority="primary"
        href={$t('pages.preconfs.sections.preconfirmations.cta.href')}
        >{$t('pages.preconfs.sections.preconfirmations.cta.text')}</ActionButton>
</div>
  </div>

  <Carousel
  items={carouselItems}
  />

  <div class={entryRowClasses}>
    <div>
    <div class={entryTitleClass}>{$t('pages.preconfs.sections.become.title')}</div>
    <p>{$t('pages.preconfs.sections.become.content')}</p>

  </div>
    <div class="flex flex-col gap-[16px]">
    <div></div>
    some taikoons as prizes?
    </div>
      </div>
    
  <BasedLiners />

  <div class="h-sep" />


  <!-- Hero box -->
  <ContentBox title="Season 2 Badge overview">
    <p>
      {$t('pages.badge_recruitment.content.overview.p1')}
    </p>
    <p>
      {$t('pages.badge_recruitment.content.overview.p2')}
    </p>
    <p>
      {$t('pages.badge_recruitment.content.overview.p3')}
    </p>
  </ContentBox>

  <!-- Recruitment -->
  <ContentBox title="Recruit new members">
    <p>
      {$t('pages.badge_recruitment.content.recruit.p1')}
    </p>
    <p>
      {$t('pages.badge_recruitment.content.recruit.p2')}
    </p>
  </ContentBox>

  <!-- Teams description -->
  <ContentBox title={$t('pages.badge_recruitment.teams.title')}>
    <div>
      <div class={headlineClasses}>{$t('pages.badge_recruitment.teams.devs.title')}</div>
      {$t('pages.badge_recruitment.teams.devs.description')}
    </div>

    <div>
      <div class={headlineClasses}>{$t('pages.badge_recruitment.teams.whales.title')}</div>
      {$t('pages.badge_recruitment.teams.whales.description')}
    </div>

    <div>
      <div class={headlineClasses}>{$t('pages.badge_recruitment.teams.minnows.title')}</div>
      {$t('pages.badge_recruitment.teams.minnows.description')}
    </div>
    <div>
      {$t('pages.badge_recruitment.teams.forumla')}
    </div>

    <Note>
      {$t('pages.badge_recruitment.teams.note')}
    </Note>
  </ContentBox>

  <!-- Get more badges -->
  <ContentBox title={$t('pages.badge_recruitment.ways_to_get.title')}>
    <div class={headlineClasses}>{$t('pages.badge_recruitment.ways_to_get.taikoon.title')}</div>
    {$t('pages.badge_recruitment.ways_to_get.taikoon.description')}

    <div class={headlineClasses}>{$t('pages.badge_recruitment.ways_to_get.liquidity_royale.title')}</div>
    {$t('pages.badge_recruitment.ways_to_get.liquidity_royale.description')}
  </ContentBox>

  <!-- CTA -->
  <div class={containerClasses}>
    <div class={lineClassesLeft}></div>
    <ActionButton class={ctaClasses} priority="primary" on:click={() => goto(ctaLink)}>
      {$t('pages.badge_recruitment.buttons.start')}
    </ActionButton>
    <div class={lineClassesRight}></div>
  </div>

  <!-- FAQ -->
  <div bind:this={faqElement}>
    <FaqBlock title="FAQs" titleSize="lg" entries={faqEntries} />
  </div>
</div>
