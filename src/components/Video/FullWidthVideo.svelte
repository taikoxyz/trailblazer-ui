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

    const clientX = e.type === 'touchmove' ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const { left, right } = (e.target as HTMLElement).getBoundingClientRect();
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
</script>

<!-- video section -->
<div class="relative flex justify-self-center overflow-visible w-screen cursor-pointer">
  <video
    class="w-full"
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
      : 'opacity-50'} hover:opacity-100 absolute self-center justify-center left-[50%] z-10 {paused || 'hidden'}">
    <img src={PlayButton} alt={PlayButton} />
  </div>

  <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
    <progress value={time / duration || 0} />
  </div>
</div>

<style>
  .controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: opacity 1s;
  }

  progress {
    display: block;
    width: 100%;
    height: 10px;
    -webkit-appearance: none;
    appearance: none;
  }

  progress::-webkit-progress-bar {
    background-color: rgba(0, 0, 0, 0.2);
  }

  progress::-webkit-progress-value {
    background-color: rgba(255, 255, 255, 0.6);
  }
</style>
