<script lang="ts">
  import { onMount } from 'svelte';
  import { json, t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import { FaqBlock } from '../../FaqBlock';
  import type { IFaqEntry } from '../../FaqBlock/FaqBlock.svelte';
  import ContentBox from './ContentBox.svelte';
  import Multipliers from './Multipliers.svelte';
  import Note from './Note.svelte';
  import Teams from './Teams.svelte';

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
    'custom-text',
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
</script>

<div class={wrapperClasses}>
  <div class="lg:f-between-center w-full f-col items-center lg:f-row">
    <img src="/header/migrations/migrations.svg" alt="Badge Recruitment" class={headerImageClasses} />
    <div class="f-col">
      <span class={startTimeClasses}> {$t('pages.badge_recruitment.journey.begin.timer')} </span>
      <ContentBox
        title={$t('pages.badge_recruitment.journey.begin.title')}
        alwaysColumn
        titleOverrideClasses={'lg:max-w-[452px]'}
        contentOverrideClasses={'lg:max-w-[452px]'}>
        <p>
          {$t('pages.badge_recruitment.journey.begin.description')}
        </p>
        <Note>
          {$t('pages.badge_recruitment.journey.begin.note')}
        </Note>
      </ContentBox>
    </div>
  </div>

  <ActionButton class={ctaClasses} priority="primary" href="/profile">
    {$t('pages.badge_recruitment.buttons.start')}
  </ActionButton>

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

  <!-- Teams Carousel -->
  <Teams />

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

  <!-- Multipliers -->
  <Multipliers />

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

<style>
  .custom-text {
    leading-trim: both;
    text-edge: cap;
  }
</style>
