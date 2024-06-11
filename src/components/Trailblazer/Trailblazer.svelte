<script lang="ts">
  import { FactionsGallery } from '$components/Gallery';

  import TrailblazerGuide from './TrailblazerGuide.svelte';
  import TrailblazerMain from './TrailblazerMain.svelte';
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[100px]">
  <TrailblazerMain />
  <TrailblazerGuide />
  <!-- <TrailblazerOngoingTrails /> -->
  <FactionsGallery />
</div>
