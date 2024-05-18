<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  import { ActionButton, CloseButton } from '$components/Button';

  import { uid } from '$libs/util/uid';
  import { generateTwitterCardSVG } from '$libs/pinkify';
  import { twitterAvatarId } from '$stores/supabase';
  import { get } from 'svelte/store';
  import { savePngToSupabase } from '$libs/supabase/functions';

  const dialogId = `dialog-${uid()}`;

  export let modalOpen: boolean;

  let svg: string;

  const closeModal = () => {
    modalOpen = false;
  };

  let imageLoaded = false;
  export let pinkifiedAvatar: string;

  function handleImageLoad() {
    imageLoaded = true;
  }

  $: if (modalOpen) {
    // placeholder
  }

  async function generateAndSaveTwitterCard() {
    // Save to supabase

    const response = await fetch(`https://pbs.twimg.com/profile_images/${get(twitterAvatarId)}/X926izfy_400x400.jpg`);

    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    const blob = await response.blob();
    svg = await generateTwitterCardSVG(blob);

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      // Set canvas size to match SVG dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw SVG onto canvas
      (ctx as CanvasRenderingContext2D).drawImage(img, 0, 0);

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Create a link element
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'fileName';
      savePngToSupabase(get(twitterAvatarId), dataUrl).then(() => {
        console.log('png saved');
      });
    };

    // Set the Image source to the SVG content
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  }

  onMount(async () => {
    await generateAndSaveTwitterCard();
  });
</script>

<dialog id={dialogId} class="modal modal-bottom md:modal-middle" class:modal-open={modalOpen}>
  <div class="modal-box relative p-0 md:rounded-[20px] bg-neutral-background overflow-hidden">
    <CloseButton onClick={closeModal} />
    <div class="f-center f-col w-full space-y-[30px] pt-[35px]">
      <div class="hidden">
        {@html svg}
      </div>
      <img class="size-[328px]" src={pinkifiedAvatar} alt="avatar" />
      <div class="f-center f-col gap-[10px] w-[370px]">
        <div class="display-small-medium">Pinkified - Now Amplify!</div>
        <div class="body-small-regular text-center">
          Join the Revolution: Share your support with #CallofTaiko and become part of the movement.
        </div>
      </div>
      <div class="divider" />
      <button on:click={() => {}} class="self-center btn btn-block btn-primary body-bold">Share on X</button>
    </div>
  </div>
</dialog>
