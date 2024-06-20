<script lang="ts">
  import DividerElement from './DividerElement/DividerElement.svelte';
  import ExploreEcosystem from './ExploreEcosystem.svelte';
  import Factions from './Factions/Factions.svelte';
  import { TrailblazerGuide } from './Guide';
  import TrailblazerOngoingTrails from './OngoingTrails/TrailblazerOngoingTrails.svelte';
  import { RankUp } from './RankUp';
  import TrailblazerMain from './TrailblazerMain.svelte';
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[100px] mb-[130px]">
  <TrailblazerMain />
  <TrailblazerGuide />
  <Factions />
  <DividerElement />
  <TrailblazerOngoingTrails />
  <RankUp />
  <ExploreEcosystem />
</div>
