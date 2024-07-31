<script lang="ts">
  import { MovementNames, type Movements } from '$libs/badges/const';
  import type { Faction } from '$libs/profile';

  export let type: Faction;
  export let unlocked: boolean = false;
  export let movement: Movements = 0;

  $: dirName = `/factions/${type.toLowerCase()}`;
  $: fileName = MovementNames[movement].toLowerCase();
  $: posterUrl = `${dirName}/${fileName}.png`;
  $: mp4Url = `${dirName}/${fileName}.mp4`;
  $: webmUrl = `${dirName}/${fileName}.webm`;
</script>

<div class="relative w-full h-full z-0">
  <video
    poster={posterUrl}
    loop
    autoplay={unlocked}
    class="pointer-events-none rounded-[20px] absolute left-0 top-0 z-20">
    <track kind="captions" />

    <source src={webmUrl} type="video/webm" />

    <source src={mp4Url} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
