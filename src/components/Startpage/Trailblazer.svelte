<script lang="ts">
  import GamingBanner from '$components/Banner/Trailbanner/GamingBanner.svelte';
  import DefiPartners from '$components/Partner/DefiPartners/DefiPartners.svelte';
  import { ENSPartners } from '$components/Partner/ENSPartners';
  import { GamingPartners } from '$components/Partner/GamingPartners';

  import DividerElement from './DividerElement/DividerElement.svelte';
  import ExploreEcosystem from './ExploreEcosystem.svelte';
  import Factions from './Factions/Factions.svelte';
  import { TrailblazerGuide } from './Guide';
  import { RankUp } from './RankUp';
  import TrailblazerMain from './TrailblazerMain.svelte';
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[100px] md:mb-[130px]">
  <TrailblazerMain />
  <TrailblazerGuide />
  <GamingBanner />
  <GamingPartners />
  <Factions />
  <DividerElement />
  <DefiPartners />
  <GamingPartners />
  <ENSPartners />
  <RankUp />
  <ExploreEcosystem />
</div>
