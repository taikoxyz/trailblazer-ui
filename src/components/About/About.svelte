<script lang="ts">
  import { json } from 'svelte-i18n';

  import { FaqBlock } from '$components/FaqBlock';
  import { type IFaqEntry } from '$components/FaqBlock/FaqBlock.svelte';
  import Factions from '$components/Startpage/Factions/Factions.svelte';
  import { TrailblazerGuide } from '$components/Startpage/Guide';
  import { classNames } from '$libs/util/classNames';

  import AboutHero from './AboutHero.svelte';
  import AboutInfoPanels from './AboutInfoPanels.svelte';

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
    'bg-cover',
    'bg-center',
    'xl:bg-[url(/about/xl/about-illustration-s2.png)]',
    'lg:bg-[url(/about/lg/about-illustration-s2.png)]',
    'md:bg-[url(/about/md/about-illustration-s2.png)]',
    'bg-[url(/about/sm/about-illustration-s2.png)]',
  );

  const faqWrapperClasses = classNames(
    'w-full',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'max-w-[100vw]',
    'mt-[80px]',
  );

  const fullWidthClasses = classNames('w-full');
  const separator50pxClasses = classNames(fullWidthClasses, 'h-[50px]');
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

  <Factions />
  <!-- <RewardsAndUtility /> -->
  <div class={faqWrapperClasses}>
    <FaqBlock entries={faqMini} />
  </div>
</div>
