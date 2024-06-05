<script lang="ts">
  import { fade } from 'svelte/transition';
  import PlayButton from '$images/play-button.svg';
  import TeaserVideo from '$images/Taiko-tower-teaser.mp4';
  let time: number = 0;
  let duration: number | undefined;
  let paused: boolean = true;

  let showControls: boolean = true;
  let showControlsTimeout: ReturnType<typeof setTimeout> | undefined;

  let lastMouseDown: Date | undefined;

  function handleMove(e: MouseEvent | TouchEvent): void {
    clearTimeout(showControlsTimeout);
    showControlsTimeout = setTimeout(() => (showControls = false), 2500);
    showControls = true;

    if (!duration) return; // video not loaded yet
    if (e.type !== 'touchmove' && !(e instanceof MouseEvent && e.buttons & 1)) return; // mouse not down
  }

  function handleMousedown(e: MouseEvent): void {
    lastMouseDown = new Date();
  }

  function handleMouseup(e: MouseEvent): void {
    if (new Date().getTime() - (lastMouseDown?.getTime() ?? 0) < 300) {
      if (paused) (e.target as HTMLVideoElement).play();
      else (e.target as HTMLVideoElement).pause();
    }
  }

  function clickHandler() {
    const video = document.querySelector('video');
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
</script>

<!-- video with frame -->
<div class="relative flex justify-self-center overflow-visible rounded-[30px] container">
  <video
    class="w-full rounded-[30px]"
    src="https://gmku2ryolc4ua2nz.public.blob.vercel-storage.com/COT-Video-01-vAJDpE9AFumdT7YQxBJ5pwttVuoM12.mp4"
    on:mousemove={handleMove}
    on:touchmove|preventDefault={handleMove}
    on:mousedown={handleMousedown}
    on:mouseup={handleMouseup}
    on:mouseenter={() => (showControls = true)}
    on:mouseleave={() => (showControls = false)}
    bind:currentTime={time}
    bind:duration
    bind:paused>
    <track kind="captions" />
  </video>

  <div
    transition:fade={{ delay: 10, duration: 10 }}
    class="{showControls
      ? 'opacity-100 cursor-pointer'
      : 'opacity-50'} flex hover:opacity-100 absolute self-center justify-self-center w-full justify-center z-10 {paused ||
      'hidden'}">
    <button class="" on:click={clickHandler}>
      <img class="scale-50 self-center" src={PlayButton} alt={PlayButton} />
    </button>
  </div>
</div>

<style>
  .controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: opacity 1s;
  }
</style>
