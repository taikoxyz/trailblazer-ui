<script lang="ts">
  import { FAQ } from '$components/FAQ';
  import { FactionsGallery } from '$components/Gallery';
  import { ResponsiveVideo } from '$components/Video';
  import AboutFactionsInfo from './AboutFactionsInfo.svelte';
  import AboutGallery from './AboutGallery.svelte';
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[120px]">
  <!-- About Gallery -->
  <AboutGallery />
  <!-- Factions Gallery -->
  <FactionsGallery />
  <!-- About Factions -->
  <AboutFactionsInfo />
  <!-- Video -->
  <ResponsiveVideo />
  <!-- FAQ -->
  <FAQ />
</div>
