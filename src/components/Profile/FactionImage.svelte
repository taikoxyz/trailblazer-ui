<script lang="ts">
  import { FactionNames } from '$configs/badges';
  import { MovementNames, type Movements } from '$libs/badges/const';
  import type { Faction } from '$libs/profile';

  export let type: Faction;
  export let unlocked: boolean = false;
  export let movement: Movements = 0;

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
    [FactionNames.Bouncers]: [
      // neutral
      'https://gateway.pinata.cloud/ipfs/QmcHDMMuSbYKXUdbLAfttcm5mMamtYKRUfXSVzp1SqsFGK',
      // based
      'https://gateway.pinata.cloud/ipfs/QmQHHbqZGLnqxigHLRAdUP4FA5LoxyY3i2mjr8ojrXPRwj',
      // boosted
      'https://gateway.pinata.cloud/ipfs/QmeorHG4XnnCZSxQgn7rSc5YkHf96xkn4oe6v4bCEJ4UGC',
    ],
  };

  let videoSrc = '';
  $: movement, (videoSrc = setVideoSrc());
  $: type, (videoSrc = setVideoSrc());

  $: videoPoster = '';

  function setVideoSrc() {
    if (movement < 0) return '';
    videoPoster = getVideoPoster();
    return `https://nftstorage.link/ipfs/${sources[type][movement]}`;
  }

  function getVideoPoster() {
    return `/factions/${type.toLowerCase()}/${MovementNames[movement].toLowerCase()}.png`;
  }
</script>

<div class="relative w-full h-full z-0">
  {#if videoSrc}
    <video poster={videoPoster} loop autoplay={unlocked} class="rounded-[20px] absolute left-0 top-0 z-20">
      <track kind="captions" />
      {#if videoSrc}
        <source src={videoSrc} type="video/mp4" />
      {/if}
      Your browser does not support the video tag.
    </video>
  {:else}
    <img alt={`${MovementNames[movement]} Badge`} src={videoPoster} />
  {/if}
</div>
