<script lang="ts">
  import DividerElement from './DividerElement/DividerElement.svelte';
  import ExploreEcosystem from './ExploreEcosystem.svelte';
  import Factions from './Factions/Factions.svelte';
  import { GamingPartners } from './GamingPartners';
  import { TrailblazerGuide } from './Guide';
  import { RankUp } from './RankUp';
  import TrailblazerMain from './TrailblazerMain.svelte';
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[100px] mb-[130px]">
  <TrailblazerMain />
  <TrailblazerGuide />
  <GamingPartners />
  <Factions />
  <DividerElement />
  <RankUp />
  <ExploreEcosystem />
</div>
