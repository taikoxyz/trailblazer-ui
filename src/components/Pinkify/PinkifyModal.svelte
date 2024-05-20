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

    let avatarParams = get(twitterAvatarId).split('/');

    const response = await fetch(
      `https://pbs.twimg.com/profile_images/${avatarParams[0]}/${avatarParams[1]}_400x400.${avatarParams[2]}`,
    );

    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    const blob = await response.blob();
    svg = await generateTwitterCardSVG(blob);

    // Create a new canvas element
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
  }

  async function generateTwitterAvatar() {
    // Save to supabase

    // Create a new canvas element
    const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // Serialize the SVG to a string
    const img = new Image(400, 400);

    // Create an image element
    img.onload = () => {
      // Set canvas size to match SVG dimensions
      canvas.width = 400;
      canvas.height = 400;

      // Draw SVG onto canvas
      (ctx as CanvasRenderingContext2D).drawImage(img, 0, 0);

      // Convert canvas to PNG
      const pngDataUrl = canvas.toDataURL('image/png');

      // Display the PNG image
      const outputImage = document.getElementById('outputAvatar') as HTMLImageElement;

      if (!outputImage) {
        return;
      }
      outputImage.src = pngDataUrl;
    };
    // Set the Image source to the SVG content
    img.src = pinkifiedAvatar;
  }

  onMount(async () => {
    await generateAndSaveTwitterCard();
    await generateTwitterAvatar();
  });
</script>

<dialog id={dialogId} class="modal modal-bottom md:modal-middle" class:modal-open={modalOpen}>
  <div class="modal-box relative p-0 md:rounded-[20px] bg-neutral-background overflow-hidden">
    <CloseButton onClick={closeModal} />
    <div class="f-center f-col w-full space-y-[30px] pt-[35px]">
      <canvas id="canvas" style="display:none;"></canvas>
      <canvas id="canvas2" style="display:none;"></canvas>
      <!-- <img src={svgDataUrl} alt="gallery" /> -->
      <img id="outputImage" class="hidden" />
      <img id="outputAvatar" class="size-[328px]" />

      <!-- <img class="size-[328px]" src={pinkifiedAvatar} alt="avatar" /> -->
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
