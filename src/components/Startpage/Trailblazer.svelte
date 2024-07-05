<script lang="ts">
  import DefiBanner from '$components/Banner/Trailbanner/DefiBanner.svelte';
  import DefiPartners from '$components/Partner/DefiPartners.svelte/DefiPartners.svelte';
  import { GamingPartners } from '$components/Partner/GamingPartners';

  import DividerElement from './DividerElement/DividerElement.svelte';
  import ExploreEcosystem from './ExploreEcosystem.svelte';
  import Factions from './Factions/Factions.svelte';
  import { TrailblazerGuide } from './Guide';
  import { RankUp } from './RankUp';
  import TrailblazerMain from './TrailblazerMain.svelte';
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[100px] mb-[130px]">
  <TrailblazerMain />
  <TrailblazerGuide />
  <DefiBanner />
  <DefiPartners />
  <GamingPartners />
  <Factions />
  <DividerElement />
  <RankUp />
  <ExploreEcosystem />
</div>
