<script lang="ts">
  import { type Faction, MovementNames, Movements } from '$lib/domains/profile/types/types';

  export let type: Faction;
  export let movement: Movements = 0;

  $: baseUrl = `/factions/${type.toLowerCase()}/${MovementNames[movement].toLowerCase()}`;
</script>

<div class="relative w-full h-full z-0 aspect-square">
  <video
    poster="{baseUrl}.png"
    loop
    muted
    autoplay
    playsinline
    class="pointer-events-none rounded-[20px] absolute left-0 top-0 z-20 w-full h-full">
    <track kind="captions" />
    <source src="{baseUrl}.mp4" type="video/mp4" />
    <source src="{baseUrl}.webm" type="video/webm" />
    Your browser does not support the video tag.
  </video>
</div>
