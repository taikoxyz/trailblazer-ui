<script lang="ts">
  import { FactionNames } from '$configs/badges';
  import RaverImage from '$images/factions/faction-1.png';
  import RobotsImage from '$images/factions/faction-2.png';
  import getBadgeSrc from '$libs/badges/getBadgeSrc';
  import type { Faction } from '$libs/profile';
  import { onMount } from 'svelte';
  import type { Address } from 'viem';
  // import AndroidsImage from '$images/factions/androids.svg';
  // import BouncerImage from '$images/factions/bouncers.svg';
  // import DrummerImage from '$images/factions/drummers.svg';
  // import MasterImage from '$images/factions/masters.svg';
  // import MonkImage from '$images/factions/monks.svg';
  // import ShintoImage from '$images/factions/shinto.svg';

  export let type: Faction;
  export let address: Address

  export let unlocked: boolean = false;
  const sources: Record<string, string[]> = {
    [FactionNames.Ravers]: [
      // neutral
      'bafybeiadil4qdxhe4v72qp5x72wnqctqp4fzjcambcllmy3jj7giksvawe',
      // based
      'bafybeidyhv3nhtcrsqvk3qmpu565pvog3zy5mtqi5cje6p4uk7ztup2hcu',
      // boosted
      'bafybeif5a6a3f7clbiwobf45yv3mwaspmq33diwiges3spy5deoaj7fcsu',
    ],
    [FactionNames.Robots]: [
      // neutral
      'bafybeibapxclpevtmdiy6loojskeplfhge54pqbtfl35amglwppqi2p5wm',
      // based
      'bafybeihfr65edgndtxtbvwuo6pfjrgouhwc5vd3yypeav4luu24zpduzie',
      // boosted
      'bafybeibquskpksahxffzfkuk5ivd45vgqhfyhynl225wlnuckn3nju5f5i',
    ],
  };

  async function getVideoSrc() {
    const src = await getBadgeSrc(address, type as FactionNames)
    console.log({src})
  }

  $: src = '/test-badge.mp4'
  onMount(async() => {
    if (!sources[type]){
      console.error('Unrecognized badge type', type)
      return
    }
    src = `https://nftstorage.link/ipfs/${sources[type][0]}`
  })
</script>

<video loop autoplay={unlocked}>
  <source src={src} type="video/mp4" />
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
