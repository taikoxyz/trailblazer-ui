<script lang="ts">
  import { FactionsGallery } from '$components/FactionsGallery';
  import { FAQ } from '$components/FAQ';

  import AboutFactionsInfo from './AboutFactionsInfo.svelte';
  import AboutGallery from './AboutGallery.svelte';
</script>

<div class="f-cl w-full container">
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
