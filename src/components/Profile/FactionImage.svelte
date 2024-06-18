<script lang="ts">
  import { onMount } from 'svelte';

  import { FactionNames } from '$configs/badges';
  import type { Faction } from '$libs/profile';

  export let type: Faction;
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

  let videoSrc = '';

  onMount(() => {
    if (sources[type]) {
      videoSrc = `https://nftstorage.link/ipfs/${sources[type][0]}`;
    } else {
      console.warn('Unrecognized badge type', type);
      videoSrc = '';
    }
  });
</script>

<div class="relative w-full h-full">
  {#if videoSrc}
    <video loop autoplay={unlocked} class="rounded-[20px] absolute left-0 top-0 z-20">
      <track kind="captions" />
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  {/if}
</div>
