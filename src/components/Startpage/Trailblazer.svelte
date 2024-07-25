<script lang="ts">
  import { DomainBanner, DefiBanner } from '$components/Banner';
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
  <DomainBanner />
  <DefiBanner />
  <ENSPartners />
  <Factions />
  <DividerElement />
  <DefiPartners />
  <GamingPartners />
  <RankUp />
  <ExploreEcosystem />
</div>
