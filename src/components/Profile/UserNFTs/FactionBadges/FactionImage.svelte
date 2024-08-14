<script lang="ts">
  import { MovementNames, type Movements } from '$libs/badges/const';
  import type { Faction } from '$libs/profile';

  export let type: Faction;
  export let movement: Movements = 0;

  $: baseUrl = `/factions/${type.toLowerCase()}/${MovementNames[movement].toLowerCase()}`;
</script>

<div class="relative w-full h-full z-0">
  <video
    poster="{baseUrl}.png"
    loop
    muted
    autoplay
    playsinline
    class="pointer-events-none rounded-[20px] absolute left-0 top-0 z-20">
    <track kind="captions" />
    <source src="{baseUrl}.mp4" type="video/mp4" />
    <source src="{baseUrl}.webm" type="video/webm" />
    Your browser does not support the video tag.
  </video>
</div>
