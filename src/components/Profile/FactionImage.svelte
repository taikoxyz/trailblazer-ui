<script lang="ts">
  import { FactionNames } from '$configs/badges';
  import RaverImage from '$images/factions/faction-1.png';
  import RobotsImage from '$images/factions/faction-2.png';
  import type { Faction } from '$libs/profile';
  // import AndroidsImage from '$images/factions/androids.svg';
  // import BouncerImage from '$images/factions/bouncers.svg';
  // import DrummerImage from '$images/factions/drummers.svg';
  // import MasterImage from '$images/factions/masters.svg';
  // import MonkImage from '$images/factions/monks.svg';
  // import ShintoImage from '$images/factions/shinto.svg';

  export let type: Faction;

  export let unlocked: boolean = false;
  const sources = {
    [FactionNames.Ravers]: [
      // neutral
      // based
      // boosted
    ],
    [FactionNames.Robots]: [
      // neutral
      // based
      // boosted
    ],
  };
</script>

<video loop autoplay={unlocked}>
  <source src="/test-badge.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

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
