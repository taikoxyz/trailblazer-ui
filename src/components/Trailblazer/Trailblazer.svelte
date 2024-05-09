<script lang="ts">
  import { Icon, PlusIcon } from '$components/Icon';
  import TrailblazerDude from '$images/trailblazer-dude.png';
  import TrailblazerNFTText from '$images/trailblazer-NFT-text.svg';
  import { FAQDropdown } from '$components/Dropdown';
  import { MOCK_FAQS } from '$mocks';
  import ButtonWithArrow from '$components/Button/ButtonWithArrow.svelte';
  import { signMessage } from '@wagmi/core';
  import { config } from '$libs/wagmi';
  import { web3modal } from '$libs/connect';
  import { account } from '$stores/account';

  let time: number = 0;
  let duration: number | undefined;
  let paused: boolean = true;

  let faqs = MOCK_FAQS;

  let showControls: boolean = true;
  let showControlsTimeout: ReturnType<typeof setTimeout> | undefined;

  let lastMouseDown: Date | undefined;

  async function handleAnswerTheCall() {
    // connect wallet if not
    if ($account?.isConnected === false) {
      web3modal.open({ view: 'Connect' });
    }

    // sign off chain message
    await signMessage(config, { message: 'Answer the call' });

    // save address and signature to database
  }

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
  <div class="flex flex-col w-full py-[86px] gap-[132px]">
    <div class="flex w-full relative">
      <div class="w-full">
        <!-- Title -->
        <div class="font-clash-grotesk text-[160px]/[120px] tracking-[-2px] pb-[114px] max-w-[596px]">
          <div class="relative">
            <span class="w-fit">call of taiko</span>
            <img class="absolute bottom-0 left-[350px]" src={TrailblazerNFTText} alt={TrailblazerNFTText} />
          </div>
        </div>
        <!-- Description -->
        <PlusIcon class="pb-[40px]" />
        <div class="body-bold max-w-[343px] pb-[50px]">
          In the vibrant world of Neo Nakuzaa revolutionary cast of charactersis emerging: Taiko Factions.
        </div>
        <!-- CTA -->
        <ButtonWithArrow />
      </div>
      <!-- Image -->
      <div class="w-full">
        <img class="absolute -z-10 right-[-107px] top-[-173px] w-[782px]" src={TrailblazerDude} alt={TrailblazerDude} />
      </div>
    </div>
    <!-- Banner CTA -->
    <div class="border-gradient-pink">
      <div class="flex items-center justify-between gap-8">
        <div class="border-gradient-pink p-[5px] before:opacity-50 before:border-[1px] z-10">
          <div class="f-center p-4 rounded-[14px] bg-gradient-to-r from-[#EA36A4] to-[#F997D0]">
            <Icon type={'star'} fillClass="none" vWidth={24} vHeight={24} />
          </div>
        </div>
        <div class="relative w-full flex font-clash-grotesk text-[40px]/[32px] gap-2">
          <div class="w-full break-keep whitespace-nowrap">Taiko needs you. Will you</div>
          <button
            class=" hover:text-pink-500 z-10 w-full break-keep whitespace-nowrap"
            on:click={() => {
              handleAnswerTheCall();
            }}>answer the call?</button>
        </div>
        <div class="w-full flex justify-end z-10">
          <ButtonWithArrow />
        </div>
      </div>
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
