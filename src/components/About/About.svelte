<script lang="ts">
  import { FactionsGallery } from '$components/FactionsGallery';
  import { FAQ } from '$components/FAQ';
  import { TrailblazerGuide } from '$components/Startpage/Guide';
  import { classNames } from '$libs/util/classNames';

  import AboutFactionsInfo from './AboutFactionsInfo.svelte';
  import AboutHero from './AboutHero.svelte';
  import AboutInfoPanels from './AboutInfoPanels.svelte';


  const wrapperClasses = classNames(
    'f-cl',
    'w-full',
    'flex',
    'flex-col',
    'gap-12',
  )
  const imageClasses = classNames(
    'rounded-[30px]',
    'w-full',
    'hover:scale-105',
    'transition-transform',
    'object-cover',
  );


</script>

<div class={wrapperClasses}>
  <AboutHero />
  <img class={imageClasses} src="/about-illustration.png" alt="gallery" />
  <TrailblazerGuide />
  <AboutInfoPanels />
  <FactionsGallery hideArrows/>
  <AboutFactionsInfo />
  <FAQ />
</div>
