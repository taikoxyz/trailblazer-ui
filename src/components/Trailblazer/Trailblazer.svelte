<script lang="ts">
  import { signMessage } from '@wagmi/core';

  import ButtonWithArrow from '$components/Button/ButtonWithArrow.svelte';
  import { FAQDropdown } from '$components/Dropdown';
  import { FactionsGallery } from '$components/Gallery';
  import { Icon, PlusIcon } from '$components/Icon';
  import TwitterLogin from '$components/Twitter/TwitterLogin.svelte';
  import TrailblazerDude from '$images/trailblazer-dude.png';
  import TrailblazerNFTText from '$images/trailblazer-NFT-text.svg';
  import { web3modal } from '$libs/connect';
  import { getSession } from '$libs/supabase';
  import { config } from '$libs/wagmi';
  import { MOCK_FAQS } from '$mocks';
  import { account } from '$stores/account';
  import { twitterAvatarId, twitterAvatarUrl, twitterId } from '$stores/supabase';
  import { CTABanner } from '$components/Banner';

  import Connector from '$components/SVG/Connector.svelte';
  import FullWidthVideo from '$components/Video/FullWidthVideo.svelte';
  import ResponsiveVideo from '$components/Video/ResponsiveVideo.svelte';
  import { TaikoTrailblazersLogo } from '$components/Logo';
  import TrailblazerGuide from './TrailblazerGuide.svelte';
  import TrailblazerPinkifyYourProfile from './TrailblazerPinkifyYourProfile.svelte';
  import TrailblazerFactionsInfo from './TrailblazerFactionsInfo.svelte';
  import TrailblazerGallery from './TrailblazerGallery.svelte';

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
        <div class="font-clash-grotesk text-[45px]/[45px] tracking-[22.5px] pb-[114px] max-w-[596px]">
          <div class="f-center flex-col gap-5">
            <TaikoTrailblazersLogo width={655} />
            <span class="w-fit">call of taiko</span>
          </div>
        </div>
        <!-- Description -->
        <PlusIcon class="pb-[40px]" />
        <div class="body-bold max-w-[343px] pb-[50px]">
          In the vibrant world of Neo Nakuzaa revolutionary cast of characters is emerging: Taiko Factions.
        </div>
        <!-- CTA -->
        <ButtonWithArrow />
      </div>
      <!-- Image -->
      <div class="w-full">
        <img class="absolute -z-10 right-[-107px] top-[-173px] w-[782px]" src={TrailblazerDude} alt={TrailblazerDude} />
      </div>
    </div>
    <!-- Steps -->
    <TrailblazerGuide />
    <!-- Pinkify Your Profile -->
    <TrailblazerPinkifyYourProfile />
  </div>

  <div class="flex flex-col w-full py-[86px] gap-[132px]">
    <ResponsiveVideo />
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
