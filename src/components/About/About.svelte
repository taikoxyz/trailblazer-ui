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

  const wrapperClasses = classNames('lg:px-[75px]', 'md:px-[65px]', 'px-[20px]', 'w-full', 'f-col');

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
    // style="background-image: url('/about-illustration-s2.png');"
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
</script>

<div class="f-col w-full">
  <div class={wrapperClasses}>
    <AboutHero />
    <div class={classNames('w-full')}>
      <div class={imageClasses} role="img" aria-label="Gallery image"></div>
    </div>
  </div>
  <div class=" f-col w-full items-center justify-center">
    <TrailblazerGuide />
  </div>
  <AboutInfoPanels />
  <div class="f-col f-center px-[24px] w-full">
    <Factions noDivider />
  </div>
  <!-- <RewardsAndUtility /> -->
  <div class={faqWrapperClasses}>
    <FaqBlock entries={faqMini} />
  </div>
</div>
