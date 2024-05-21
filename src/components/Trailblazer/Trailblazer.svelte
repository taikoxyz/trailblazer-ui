<script lang="ts">
  import { Icon, PlusIcon } from '$components/Icon';

  import TraiblazerDJ from '$images/trailblazer-dj.png';
  import TraiblazerDJFlare from '$images/trailblazer-dj-flare.png';

  import FullWidthVideo from '$components/Video/FullWidthVideo.svelte';
  import { TaikoTrailblazersLogo } from '$components/Logo';

  import { ResponsiveVideo } from '$components/Video';
  import TrailblazerFactionsInfo from '../About/AboutFactionsInfo.svelte';
  import TrailblazerGallery from './TrailblazerGallery.svelte';
  import TrailblazerGuide from './TrailblazerGuide.svelte';
  import TrailblazerPinkifyYourProfile from './TrailblazerPinkifyYourProfile.svelte';
  import { FAQ } from '$components/FAQ';
  import { ButtonWithArrow } from '$components/Button';
</script>

<div class="f-center container flex-col w-full overflow-visible">
  <!-- section 1 -->
  <div class="f-center flex-col w-full pt-[20px] xl:pt-[150px] xl:pb-[165px] gap-[80px] xl:gap-[132px]">
    <div class="f-center flex-col xl:flex-row w-full">
      <div class="f-center flex-col w-full">
        <!-- Title -->
        <div
          class="xl:self-start font-clash-grotesk text-[23px]/[28px] tracking-[10px] xl:text-[45px]/[45px] xl:tracking-[22.5px] pb-[30px] xl:pb-[114px]">
          <div class="f-center w-full flex-col gap-5">
            <TaikoTrailblazersLogo class="w-[335px] xl:w-[655px]" />
            <span class="w-fit text-center xl:text-left">call of taiko</span>
          </div>
        </div>
        <!-- Description -->
        <div class="xl:self-start f-center flex-col pb-10 xl:pb-10">
          <PlusIcon class="  xl:self-start  pb-[40px] hidden xl:block" />
          <div class="xl:body-bold max-w-[262px] xl:max-w-[343px] text-center xl:text-left">
            In the vibrant world of Neo Nakuza, a revolutionary cast of characters is emerging: Taiko Trailblazers.
          </div>
        </div>
        <div class="gap-4 self-center xl:self-start hidden xl:flex">
          <a href="/pinkify">
            <ButtonWithArrow text="Start now" />
          </a>
          <a
            class="btn bg-transparent border-2 border-secondary-brand min-w-[183px] hover:bg-[#E81899]/20 hover:border-2 hover:border-secondary-brand body-regular"
            href="/about">Learn more</a>
        </div>
      </div>
      <!-- Image -->
      <div class="f-center w-full h-[427px] xl:h-full bottom-0">
        <div class="self-center w-full h-full relative f-center">
          <img
            class="absolute z-[-1] xl:left-[50px] xl:top-[-363px] w-[285px] xl:w-[500px]"
            src={TraiblazerDJ}
            alt={TraiblazerDJ} />
          <img
            class="absolute -z-[10] top-[-100px] xl:left-[50px] xl:top-[-530px] w-[448px] xl:w-[782px]"
            src={TraiblazerDJFlare}
            alt={TraiblazerDJFlare} />
        </div>
      </div>
      <div class="gap-4 self-center items-center xl:self-start flex flex-col pb-16 xl:hidden">
        <a href="/pinkify">
          <ButtonWithArrow class="min-w-[183px]" text="Start now" />
        </a>
        <a
          class="btn bg-transparent border-2 border-secondary-brand min-w-[183px] hover:bg-[#E81899]/20 hover:border-2 hover:border-secondary-brand body-regular"
          href="/about">Learn more</a>
      </div>
    </div>
  </div>

  <div class="flex flex-col w-full pb-[86px] gap-[80px] xl:gap-[132px]">
    <TrailblazerGuide />
    <TrailblazerPinkifyYourProfile />
    <ResponsiveVideo />
    <FAQ />
  </div>

  <!-- faq section -->
</div>
