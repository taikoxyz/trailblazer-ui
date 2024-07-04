<script lang="ts">
  import { FactionsGallery } from '$components/FactionsGallery';
  import { FAQ } from '$components/FAQ';
  import { TrailblazerGuide } from '$components/Startpage/Guide';

  import AboutFactionsInfo from './AboutFactionsInfo.svelte';
  import AboutGallery from './AboutGallery.svelte';
  import AboutHero from './AboutHero.svelte';
  import { classNames } from '$libs/util/classNames';
  import AboutInfoPanels from './AboutInfoPanels.svelte';

  const imageClasses = classNames(
    'rounded-[30px]',
    'w-full',
    'hover:scale-105',
    'transition-transform',
    'object-cover',
  );
</script>

<div class="f-cl w-full flex flex-col gap-12">
  <!-- Hero -->
  <AboutHero />

  <img class={imageClasses} src="/about-illustration.png" alt="gallery" />
  <!-- Steps -->
  <TrailblazerGuide />

  <AboutInfoPanels />

  <!-- About Gallery -->
  <AboutGallery />
  <!-- Factions Gallery -->
  <FactionsGallery />
  <!-- About Factions -->
  <AboutFactionsInfo />
  <!-- Video -->
  <!-- <ResponsiveVideo /> -->
  <!-- FAQ -->
  <FAQ />
</div>
