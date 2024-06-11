<script lang="ts">
  import { FAQ } from '$components/FAQ';
  import { FactionsGallery } from '$components/Gallery';

  import AboutFactionsInfo from './AboutFactionsInfo.svelte';
  import AboutGallery from './AboutGallery.svelte';
</script>

<div class="f-center flex-col w-full gap-[80px] xl:gap-[120px] container">
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
