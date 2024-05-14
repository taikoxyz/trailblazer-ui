<script lang="ts">
  import { signMessage } from '@wagmi/core';

  import ButtonWithArrow from '$components/Button/ButtonWithArrow.svelte';
  import { FAQDropdown } from '$components/Dropdown';
  import { Gallery } from '$components/Gallery';
  import { Icon, PlusIcon } from '$components/Icon';
  import TwitterLogin from '$components/Twitter/TwitterLogin.svelte';
  import TrailblazerDude from '$images/trailblazer-dude.png';
  import PinkifyYourProfile from '$images/pinkify-your-profile.svg';
  import TrailblazerNFTText from '$images/trailblazer-NFT-text.svg';
  import { web3modal } from '$libs/connect';
  import { getSession } from '$libs/supabase';
  import { config } from '$libs/wagmi';
  import { MOCK_FAQS } from '$mocks';
  import { account } from '$stores/account';
  import { twitterAvatarId, twitterAvatarUrl, twitterId } from '$stores/supabase';
  import { CTABanner } from '$components/Banner';

  import FactionStack from '$images/faction-stack.png';
  import Connector from '$components/SVG/Connector.svelte';
  import FullWidthVideo from '$components/Video/FullWidthVideo.svelte';
  import ResponsiveVideo from '$components/Video/ResponsiveVideo.svelte';
  import { TaikoTrailblazersLogo } from '$components/Logo';

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
    <!-- Banner CTA -->
    <!-- <CTABanner>
      <div class="relative w-full flex font-clash-grotesk text-[40px]/[32px] text-white gap-2">
        <div class="w-full break-keep whitespace-nowrap">Taiko needs you. Will you</div>
        <button
          class=" hover:text-pink-500 z-10 w-full break-keep whitespace-nowrap"
          on:click={() => {
            handleAnswerTheCall();
          }}>answer the call?</button>
      </div>
    </CTABanner> -->
    <!-- Title Gallery -->
    <div class="flex gap-3 w-full">
      <div class="rounded-[30px] bg-pink-400 min-w-[530px]"></div>
      <div class="flex flex-col gap-3 w-full">
        <div class="flex flex-col h-full w-full rounded-[30px] bg-elevated-background px-[33px] py-[36px]">
          <div class="body-bold text-secondary-content tracking-[0.175px] text-[14px]/[20px] pb-[33px]">
            STEP-BY-STEP GUIDE
          </div>
          <div class="font-clash-grotesk tracking-[-1.5px] text-[75px]/[70px] pb-[116px]">
            The Dawn of<br />the 'Based'<br /> Revolution.
          </div>
          <div class="text-[18px]/[24px] max-w-[535px] max-h-[120px]">
            Embark on a journey through the pre-mainnet challenges of Trailblazers: The Call of Taiko and earn your
            place among the elite. Each challenge you complete allows you to collect exclusive badges from the Taiko
            Factions, which are more than mere collectibles.
          </div>
        </div>
        <div class="h-fit w-full rounded-[30px] bg-pink-400 px-[33px] py-[36px]">
          <div class="font-clash-grotesk text-base-content tracking-[-1.5px] text-[75px]/[70px]">
            ring ring mf Taiko needs you.<br /><span class="">pick up the phone gdi</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Will you answer the call -->
    <div class="flex gap-[30px] flex-col">
      <div>STEP-BY-STEP GUIDE</div>
      <div class="flex justify-between">
        <!-- Title text: Will you answer the call -->
        <div class="font-clash-grotesk tracking-[-1.5px] text-[75px]/[70px]">
          Will you answer<br /><span class="text-secondary-brand">The Call?</span>
        </div>

        <!-- Sub text: Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign. -->
        <div class="title-body-regular text-secondary-content self-end max-w-[343px]">
          Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign.
        </div>
      </div>
    </div>
    <!-- Taiko Faction -->
    <div class="flex gap-[30px] flex-col">
      <div class="flex justify-between">
        <!-- Title text: Taiko Factions -->
        <div class="font-clash-grotesk text-secondary-brand tracking-[-1.5px] text-[75px]/[70px]">
          Taiko<br /><span class="text-base-content">Factions</span>
        </div>

        <!-- Sub text: In the vibrant world of Neo Nakuz, a groundbreaking cast of characters is emerging, centered around the electrifying ecosystem of Taiko Radio and its dynamic cast of characters: ravers, drummers, masters and more. -->
        <div class="title-body-regular text-secondary-content self-end max-w-[365px]">
          Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign.
        </div>
      </div>
    </div>

    <!-- Faction Explainer -->
    <div class="flex gap-3 w-full">
      <!-- Image -->
      <img src={FactionStack} alt="{FactionStack}/" />
      <!-- Details -->
      <div class="flex flex-col rounded-[30px] bg-purple w-full px-[40px] py-[32px]">
        <div class="text-secondary-content flex flex-col w-fit gap-3 pb-[55px]">
          <div class="body-bold tracking-[0.175px]">EXCLUSIVE REWARDS</div>
          <div class="border-b-2 border-primary-brand w-[40%]"></div>
        </div>
        <!-- Title text: Will you answer the call -->
        <div class="font-clash-grotesk tracking-[-1.5px] display-medium-medium pb-[30px]">
          Forge Your Legacy with<br />Taiko Factions
        </div>

        <!-- Sub text: Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign. -->
        <div class="title-body-regular text-secondary-content max-w-[658px]">
          These faction badges are vital to enhancing your influence within the Trailblazers points program. Secure
          these powerful multipliers to gain increased points, elevate your community status, and unlock access to
          special events and future opportunities.
        </div>
      </div>
    </div>
    <!-- Steps -->
    <div class="f-center">
      <div class="flex flex-col px-[35px] py-[38px] bg-purple rounded-[30px] gap-[20px]">
        <div class="flex items-center gap-2 display-small-medium">
          <Icon type="semi-circle-reversed" fillClass="fill-primary-brand" />Register
        </div>
        <div class="text-secondary-content">
          Begin by registering your wallet address. This initial step is crucial as it links your identity to your
          participation.
        </div>
      </div>
      <Connector class="fill-purple" />
      <div class="flex flex-col px-[35px] py-[38px] bg-purple rounded-[30px] gap-[20px]">
        <div class="flex items-center gap-2 display-small-medium">
          <Icon type="quad-circles" fillClass="fill-primary-brand" />Pinkify & Prove it
        </div>
        <div class="text-secondary-content">
          Begin by registering your wallet address. This initial step is crucial as it links your identity to your
          participation.
        </div>
      </div>
      <Connector class={'fill-purple'} />
      <div class="flex flex-col px-[35px] py-[38px] bg-purple rounded-[30px] gap-[20px]">
        <div class="flex items-center gap-2 display-small-medium">
          <Icon type="diamond" fillClass="fill-primary-brand" />Amplify The Call
        </div>
        <div class="text-secondary-content">
          Begin by registering your wallet address. This initial step is crucial as it links your identity to your
          participation.
        </div>
      </div>
    </div>

    <!-- Pinkify Your Profile -->
    <div class="relative flex p-[40px] rounded-[30px] border-2 border-primary-border-hover bg-[#310E2F] min-h-[502px]">
      <div class="flex flex-col">
        <div class="pb-[73px]">
          <div class="rounded-full bg-secondary-brand f-center py-[10px] px-[35px] body-small-bold w-fit">
            JOIN THE REVOLUTION
          </div>
        </div>
        <div class="font-clash-grotesk tracking-[-1.5px] text-[75px]/[70px] pb-[46px]">
          <span class="text-secondary-brand">Pinkify</span><br /> Your Profile!
        </div>
        <div class="max-w-[513px] body-regular">
          Show your support for the Taiko community by pinkifying your profile. Change your profile picture to pink, add
          a drum emoji, or use the Taiko hand gesture. Share your support with #CallofTaiko and become part of the
          movement!
        </div>
      </div>
      <div class="absolute top-0 right-[52px]">
        <img src={PinkifyYourProfile} />
      </div>
    </div>

    <!-- Twitter -->
    {#if !$twitterId}
      <TwitterLogin />
      <button on:click={getSession}>asd</button>
    {:else}
      <div class="flex gap-4">
        original
        <img class="size-64" src={$twitterAvatarUrl} alt="asd" />

        style 1
        <div class="relative">
          <img class="block size-[250px]" src={$twitterAvatarUrl} />
          <svg class="absolute top-0 size-[250px]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#ff69b4" fill-opacity="0.5" />
          </svg>
        </div>
        style 2
        <img class="size-64" src="/api/generate/{$twitterAvatarId}" alt="asd" />
      </div>
    {/if}
  </div>

  <FullWidthVideo />
  <ResponsiveVideo />

  <!-- Gallery Section  -->
  <Gallery />

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
