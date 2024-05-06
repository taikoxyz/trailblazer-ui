<script lang="ts">
  import { PlusIcon } from '$components/Icon';
  import TrailblazerDude from '$images/trailblazer-dude.png';
  import {FAQDropdown} from '$components/Dropdown';
  import {MOCK_FAQS} from '$mocks';

  let time: number = 0;
  let duration: number | undefined;
  let paused: boolean = true;

  let faqs = MOCK_FAQS;

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

  function format(seconds: number | undefined): string {
    if (seconds === undefined || isNaN(seconds)) return '...';

    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    if (remainingSeconds < 10) remainingSeconds = 0 + remainingSeconds;

    return `${minutes}:${remainingSeconds}`;
  }
</script>

<div class="f-center container flex-col w-full overflow-visible">
  <!-- section 1 -->
  <div class="flex w-full px-[75px] py-[86px] relative h-screen max-h-[850px]">
    <div>
      <div class="font-clash-grotesk text-[160px]/[120px] tracking-[-2px] pb-[114px]">call of taiko NFT</div>
      <PlusIcon class="pb-[40px]" />
      <div class="body-bold max-w-[343px]">
        In the vibrant world of Neo Nakuzaa revolutionary cast of charactersis emerging: Taiko Factions.
      </div>
    </div>
    <div class="w-full">
      <img class="absolute right-[-27px] top-[-63px]" src={TrailblazerDude} alt={TrailblazerDude} />
    </div>
  </div>
  <!-- video section -->
  <div class="relative justify-self-center overflow-visible w-screen">
    <video
      class="w-full"
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
  <!-- faq section -->
  <div class=" w-full px-[75px] py-[86px]">
    
  <div class="pb-[30px]">
    <div class="display-large-medium">FAQs</div>
  </div>
  <div class="flex flex-col w-full gap-4">
      {#each faqs as { question, answer }}
        <FAQDropdown {question} {answer}></FAQDropdown>
      {/each}
  </div>
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
