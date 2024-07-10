<script lang="ts">
  import { MovementNames, type Movements } from '$libs/badges/const';
  import type { Faction } from '$libs/profile';

  export let type: Faction;
  export let unlocked: boolean = false;
  export let movement: Movements = 0;

  let videoSrc = '';
  $: movement, (videoSrc = setVideoSrc());
  $: type, (videoSrc = setVideoSrc());

  $: videoPoster = '';

  function setVideoSrc() {
    if (movement < 0) return '';
    videoPoster = getVideoPoster();
    return `/factions/${type.toLowerCase()}/${MovementNames[movement].toLowerCase()}.mp4`;
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
