<script lang="ts">
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
    time = (duration * (clientX - left)) / (right - left);
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

<!-- video with frame -->
<div class="relative justify-self-center overflow-visible rounded-[30px] container">
  <video
    class="w-full rounded-[30px]"
    poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
    src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
    on:mousemove={handleMove}
    on:touchmove|preventDefault={handleMove}
    on:mousedown={handleMousedown}
    on:mouseup={handleMouseup}
    bind:currentTime={time}
    bind:duration
    bind:paused>
    <track kind="captions" />
  </video>
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
