<script lang="ts">
  import DomainBanner from '$components/Banner/Trailbanner/DomainBanner.svelte';
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

<div class="f-center container flex-col w-full overflow-visible gap-[100px] mb-[130px]">
  <TrailblazerMain />
  <TrailblazerGuide />
  <DomainBanner />
  <ENSPartners />
  <Factions />
  <DividerElement />
  <DefiPartners />
  <GamingPartners />
  <RankUp />
  <ExploreEcosystem />
</div>
