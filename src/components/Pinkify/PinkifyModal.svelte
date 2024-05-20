<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  import { ActionButton, CloseButton } from '$components/Button';

  import { uid } from '$libs/util/uid';
  import { generateTwitterCardSVG } from '$libs/pinkify';
  import { twitterAvatarId, twitterId } from '$stores/supabase';
  import { get } from 'svelte/store';
  import { savePngToSupabase } from '$libs/supabase/functions';
  import { draftMessage } from '$libs/twitter';
  import { page } from '$app/stores';

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
  let svgDataUrl = '';
  $: svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  async function generateAndSaveTwitterCard() {
    // Save to supabase

    const response = await fetch(`https://pbs.twimg.com/profile_images/${get(twitterAvatarId)}_400x400.jpg`);

    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    const blob = await response.blob();
    svg = await generateTwitterCardSVG(blob);

    // Create a new canvas element
    const svgElement = svg;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // Serialize the SVG to a string
    const img = new Image(1200, 600);

    // Create an image element
    img.onload = () => {
      // Set canvas size to match SVG dimensions
      canvas.width = 1200;
      canvas.height = 600;

      // Draw SVG onto canvas
      (ctx as CanvasRenderingContext2D).drawImage(img, 0, 0);

      // Convert canvas to PNG
      const pngDataUrl = canvas.toDataURL('image/png');
      console.log('🚀 | generateAndSaveTwitterCard | pngDataUrl:', pngDataUrl);

      // Display the PNG image
      const outputImage = document.getElementById('outputImage') as HTMLImageElement;

      if (!outputImage) {
        return;
      }
      outputImage.src = pngDataUrl;

      savePngToSupabase(get(twitterAvatarId), pngDataUrl).then(() => {
        console.log('png saved');
      });
    };

    // Set the Image source to the SVG content
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));

    console.log('🚀 | generateAndSaveTwitterCard | svgDataUrl:', svgDataUrl);
  }

  onMount(async () => {
    await generateAndSaveTwitterCard();
  });
</script>

<dialog id={dialogId} class="modal modal-bottom md:modal-middle" class:modal-open={modalOpen}>
  <div class="modal-box relative p-0 md:rounded-[20px] bg-neutral-background overflow-hidden">
    <CloseButton onClick={closeModal} />
    <div class="f-center f-col w-full space-y-[30px] pt-[35px]">
      <canvas id="canvas" style="display:none;"></canvas>
      <!-- <img src={svgDataUrl} alt="gallery" /> -->
      <img id="outputImage" class="hidden" />

      <img class="size-[328px]" src={pinkifiedAvatar} alt="avatar" />
      <div class="f-center f-col gap-[10px] w-[370px]">
        <div class="display-small-medium">Pinkified - Now Amplify!</div>
        <div class="body-small-regular text-center">
          Join the Revolution: Share your support with #CallofTaiko and become part of the movement.
        </div>
      </div>
      <div class="divider" />
      <a
        class="self-center btn btn-block btn-primary body-bold"
        href={draftMessage($page.url.toString() + '/' + $twitterAvatarId.split('/')[0])}
        target="_blank">
        Share on X
      </a>
    </div>
  </div>
</dialog>
