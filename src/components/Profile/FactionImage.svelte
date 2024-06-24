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
      'QmR16KhiFMBaK7oL4B15ADDiKsVdpE73biQec4814Nk9q6',
      // based
      'QmWMmnLnVhXFw32zdY3thpkp1YHioHaj2hT9LDqjYZ7dKA',
      // boosted
      'QmZR8eVG8htKacdgiMiwTQR9hVRoxfVQ92t6m6UHgfPaVe',
    ],
    [FactionNames.Robots]: [
      // neutral
      'QmTXxmsjCrE5rpnvX2c8TB8rJ3zFWFkD7KDpbnGrdMTb5S',
      // based
      'QmYjwqtz2JqPoEgxM8UBCG3adTfVTA9PgEdUPQFCBxMSp2',
      // boosted
      'QmbZDdauwFP9fUbji7vb2xsxzdCB4cCBPyq1bpTkc1AJYL',
    ],
    [FactionNames.Bouncers]: [
      // neutral
      'QmcHDMMuSbYKXUdbLAfttcm5mMamtYKRUfXSVzp1SqsFGK',
      // based
      'QmQHHbqZGLnqxigHLRAdUP4FA5LoxyY3i2mjr8ojrXPRwj',
      // boosted
      'QmeorHG4XnnCZSxQgn7rSc5YkHf96xkn4oe6v4bCEJ4UGC',
    ],
  };

  let videoSrc = '';
  $: movement, (videoSrc = setVideoSrc());
  $: type, (videoSrc = setVideoSrc());

  $: videoPoster = '';

  function setVideoSrc() {
    if (movement < 0) return '';
    videoPoster = getVideoPoster();
    return `https://gateway.pinata.cloud/ipfs/${sources[type][movement]}`;
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
