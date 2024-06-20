<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  import { FactionNames } from '$configs/badges';
  import { MovementNames, type Movements } from '$libs/badges/const';
  import { classNames } from '$libs/util/classNames';

  const dispatch = createEventDispatcher();

  export let movement: Movements;
  export let active: boolean;

  $: images = Object.keys(FactionNames).map((faction) => {
    return `/factions/${faction.toLowerCase()}/${MovementNames[movement].toLowerCase()}.png`;
  });

  $: wrapperClasses = classNames(
    'active:border-none',
    'active:outline-none',
    'focus:border-none',
    'focus:outline-none',

    'relative',
    'bg-white',
    'p-2',
    'rounded-[30px]',
    'flex',
    'flex-col',
    'gap-2',
    active ? 'shadow shadow-[0_0px_50px_0px_#5D08C8]' : null,
  );

  const imageClasses = classNames('w-[250px]', 'h-[250px]', 'rounded-[30px]');
  const movementClasses = classNames(
    'text-[#191E28]',
    'font-clash-grotesk',
    'text-[26px]/[32px]',
    'font-[500]',
    'w-full',
    'text-center',
    'my-2',
  );

  $: activeOverlay = classNames(
    'w-full',
    'h-full',
    'absolute',
    //'opacity-50',
    'top-0',
    'left-0',
    'border-[3px]',
    active ? 'bg-transparent' : 'bg-[rgba(0,0,0,.4)]',
    active ? 'border-[#5D08C8]' : 'border-[#8c8a93]',
    'rounded-[30px]',
  );

  let imageIntervalId: string | number | NodeJS.Timeout | undefined;
  $: imageId = 0;
  onMount(() => {
    imageIntervalId = setInterval(() => {
      let nextImageIndex = imageId + 1;
      if (nextImageIndex >= images.length) {
        nextImageIndex = 0;
      }
      imageId = nextImageIndex;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(imageIntervalId);
  });
</script>

<button
  on:click={() => {
    dispatch('click');
  }}
  class={wrapperClasses}>
  <img
    alt={MovementNames[movement]}
    src={`/factions/ravers/${MovementNames[movement].toLowerCase()}.png`}
    class={imageClasses} />
  <div class={movementClasses}>
    {MovementNames[movement]}
  </div>

  <div class={activeOverlay}></div>
</button>
