<script lang="ts">
  import { json } from 'svelte-i18n';

  import Factions from '$lib/domains/pages/components/Factions/Factions.svelte';
  import { FaqBlock } from '$lib/domains/pages/components/FaqBlock';
  import { type IFaqEntry } from '$lib/domains/pages/components/FaqBlock/FaqBlock.svelte';
  import { TrailblazerGuide } from '$lib/domains/pages/components/Guide';
  import TrailblazerRankUp from '$lib/domains/pages/components/RankUp/TrailblazerRankUp.svelte';
  import { classNames } from '$shared/utils/classNames';

  import AboutHero from './AboutHero.svelte';
  import AboutInfoPanels from './AboutInfoPanels.svelte';
  import RewardsAndUtility from './RewardsAndUtility.svelte';

  $: faqEntries = $json('faq') as { items: IFaqEntry[] }[];
  $: faqMini = faqEntries[0].items as IFaqEntry[];

  const wrapperClasses = classNames(
    'h-full',
    'md:px-[48px]',
    'px-[24px]',
    'justify-center',
    'items-center',
    'flex',
    'flex-col',
    'w-full',
  );

  const imageClasses = classNames(
    'rounded-[30px]',
    'md:w-full',
    'relative',
    'md:hover:scale-105',
    'transition-transform',
    'w-full',
    'h-[600px]',
    'max-w-[100vw]',
    'xl:max-w-[1440px]',
    'bg-cover',
    'bg-center',
    'xl:bg-[url(/about/xl/about-illustration-s2.png)]',
    'lg:bg-[url(/about/lg/about-illustration-s2.png)]',
    'md:bg-[url(/about/md/about-illustration-s2.png)]',
    'bg-[url(/about/sm/about-illustration-s2.png)]',
  );

  const fullWidthClasses = classNames('w-full', 'flex', 'justify-center', 'items-center');
  const separator50pxClasses = classNames(fullWidthClasses, 'h-[50px]');
  const separator100pxClasses = classNames(fullWidthClasses, 'h-[100px]');
  const separator150pxClasses = classNames(fullWidthClasses, 'h-[150px]');
</script>

<div class={wrapperClasses}>
  <AboutHero />
  <div class={fullWidthClasses}>
    <div class={imageClasses} role="img" aria-label="Gallery image"></div>
  </div>
  <div class={separator50pxClasses} />
  <TrailblazerGuide />
  <div class={separator150pxClasses} />

  <AboutInfoPanels />

  <div class={separator150pxClasses} />

  <TrailblazerRankUp />
  <div class={separator100pxClasses} />

  <Factions />
  <div class={separator100pxClasses} />

  <RewardsAndUtility />

  <div class={separator100pxClasses} />

  <FaqBlock entries={faqMini} />
</div>
