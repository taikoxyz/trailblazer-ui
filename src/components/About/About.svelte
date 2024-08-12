<script lang="ts">
  import { json } from 'svelte-i18n';

  import { FaqBlock } from '$components/FaqBlock';
  import { type IFaqEntry } from '$components/FaqBlock/FaqBlock.svelte';
  import { TrailblazerGuide } from '$components/Startpage/Guide';
  import { classNames } from '$libs/util/classNames';

  import AboutFactionsGallery from './AboutFactionsGallery.svelte';
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

  const faqWrapperClasses = classNames('w-full', 'flex', 'flex-col', 'justify-center', 'items-center');
</script>

<div class={wrapperClasses}>
  <AboutHero />
  <div class={classNames('w-full')}>
    <img class={imageClasses} src="/about-illustration.png" alt="gallery" />
    <TrailblazerGuide />
  </div>

  <AboutInfoPanels />
  <AboutFactionsGallery {arrowClasses} />
  <AboutFactionsInfo />
  <RewardsAndUtility />
  <div class={faqWrapperClasses}>
    <FaqBlock entries={faqMini} />
  </div>
</div>
