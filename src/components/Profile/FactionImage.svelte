<script lang="ts">
  import type { Faction } from '$libs/profile';

  import RaverImage from '$images/factions/faction-1.png';
  import RobotsImage from '$images/factions/faction-2.png';
  // import AndroidsImage from '$images/factions/androids.svg';
  // import BouncerImage from '$images/factions/bouncers.svg';
  // import DrummerImage from '$images/factions/drummers.svg';
  // import MasterImage from '$images/factions/masters.svg';
  // import MonkImage from '$images/factions/monks.svg';
  // import ShintoImage from '$images/factions/shinto.svg';

  export let type: Faction;
</script>

<!-- {#if type === 'Ravers'}
  <img src={RaverImage} alt={RaverImage} />
{:else if type === 'Robots'}
  <img src={RobotsImage} alt={RobotsImage} />
{:else if type === 'Bouncers'}
  <img src={BouncerImage} alt={BouncerImage} />
{:else if type === 'Masters'}
  <img src={MasterImage} alt={MasterImage} />
{:else if type === 'Monks'}
  <img src={MonkImage} alt={MonkImage} />
{:else if type === 'Drummers'}
  <img src={DrummerImage} alt={DrummerImage} />
{:else if type === 'Androids'}
  <img src={AndroidsImage} alt={AndroidsImage} />
{:else if type === 'Shinto'}
  <img src={ShintoImage} alt={ShintoImage} />
{:else}
  💩💩💩
{/if} -->

{#if type === 'Ravers'}
  <img src={RaverImage} alt={RaverImage} />
{:else if type === 'Robots'}
  <img src={RobotsImage} alt={RobotsImage} />
{:else if type === 'Bouncers'}
  bouncers
{:else if type === 'Masters'}
  masters
{:else if type === 'Monks'}
  monks
{:else if type === 'Drummers'}
  drummers
{:else if type === 'Androids'}
  androids
{:else if type === 'Shinto'}
  shinto
{:else}
  💩💩💩
{/if}
