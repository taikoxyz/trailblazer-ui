<script lang="ts">
  import { json } from 'svelte-i18n';

  import { FactionsGallery } from '$components/FactionsGallery';
  import { FAQ } from '$components/FAQ';
  import { default as FaqBlock, type IFaqEntry } from '$components/FAQ/FaqBlock.svelte';
  import { TrailblazerGuide } from '$components/Startpage/Guide';
  import { classNames } from '$libs/util/classNames';

  import AboutFactionsInfo from './AboutFactionsInfo.svelte';
  import AboutHero from './AboutHero.svelte';
  import AboutInfoPanels from './AboutInfoPanels.svelte';
  import RewardsAndUtility from './RewardsAndUtility.svelte';

  $: faqEntries = $json('faq') as { items: IFaqEntry[] }[];
  $: faqMini = faqEntries[0].items as IFaqEntry[];

  const wrapperClasses = classNames(
    'lg:px-[75px]',
    'md:px-[65px]',
    'px-[20px]',
    'w-full',
    'flex',
    'flex-col',
    'md:gap-24',
    'gap-[80px]',
  );
  const imageClasses = classNames(
    'rounded-[30px]',
    'md:w-full',
    'relative',
    'md:hover:scale-105',
    'transition-transform',
    'object-cover',
    'w-full',
    'h-[350px]',
  );

  const arrowClasses = classNames(
    'lg:w-[calc(50%*6/8)]',
    'ml-6',
    'flex',
    'flex-row',
    'lg:justify-start',
    'lg:items-start',
    'justify-center',
    'items-center',
    'relative',
    'lg:left-[50%]',
  );
</script>

<div class={wrapperClasses}>
  <AboutHero />
  <div class={classNames('w-full')}>
    <img class={imageClasses} src="/about-illustration.png" alt="gallery" />
    <TrailblazerGuide />
  </div>

  <AboutInfoPanels />
  <FactionsGallery {arrowClasses} />
  <AboutFactionsInfo />
  <RewardsAndUtility />
  <FaqBlock entries={faqMini} />
  <FAQ />
</div>
