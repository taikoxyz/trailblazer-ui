<script lang="ts">
  import { onMount } from 'svelte';

  import { FactionNames } from '$configs/badges';
  import type { Faction } from '$libs/profile';

  export let type: Faction;

  export let unlocked: boolean = false;

  let videoSupported = false;

  const sources: Record<string, string[]> = {
    [FactionNames.Ravers]: [
      // neutral
      'bafybeiadil4qdxhe4v72qp5x72wnqctqp4fzjcambcllmy3jj7giksvawe',
      // based
      'bafybeidyhv3nhtcrsqvk3qmpu565pvog3zy5mtqi5cje6p4uk7ztup2hcu',
      // boosted
      'bafybeif5a6a3f7clbiwobf45yv3mwaspmq33diwiges3spy5deoaj7fcsu',
    ],
    // [FactionNames.Robots]: [
    //   // neutral
    //   'bafybeibapxclpevtmdiy6loojskeplfhge54pqbtfl35amglwppqi2p5wm',
    //   // based
    //   'bafybeihfr65edgndtxtbvwuo6pfjrgouhwc5vd3yypeav4luu24zpduzie',
    //   // boosted
    //   'bafybeibquskpksahxffzfkuk5ivd45vgqhfyhynl225wlnuckn3nju5f5i',
    // ],
  };

  $: videoSrc = '';
  $: imageSrc = '/factions/ravers/badge/fallback.png';
  onMount(async () => {
    const video = document.createElement('video');
    videoSupported = !!video.canPlayType;
    if (!sources[type]) {
      console.warn('Unrecognized badge type', type);
      return;
    }
    videoSrc = `https://nftstorage.link/ipfs/${sources[type][0]}`;
  });
</script>

<div class="relative w-full h-full">
  <img src={imageSrc} alt="faction badge" class="rounded absolute left-0 top-0 rounded-[20px]" />
  {#if videoSupported}
    <video loop autoplay={unlocked} class="rounded-[20px] absolute left-0 top-0 rounded-[20px]">
      <track kind="captions" />
      <source src={videoSrc} type="video/mp4" />
    </video>
  {/if}
</div>
