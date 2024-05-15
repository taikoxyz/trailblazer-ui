<script lang="ts">
  import { FactionsGallery } from '$components/Gallery';
  import { ResponsiveVideo } from '$components/Video';
  import AboutGallery from './AboutGallery.svelte';
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[120px]">
  <!-- About Gallery -->
  <AboutGallery />

  <FactionsGallery />

  <div class="flex flex-col w-full py-[86px] gap-[132px]">
    <ResponsiveVideo />
  </div>

  <!-- faq section -->
</div>
