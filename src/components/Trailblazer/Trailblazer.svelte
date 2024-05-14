<script lang="ts">
  import { FAQDropdown } from '$components/Dropdown';
  import { Icon, PlusIcon } from '$components/Icon';

  import TraiblazerDJ from '$images/trailblazer-dj.png';
  import TraiblazerDJFlare from '$images/trailblazer-dj-flare.png';

  import { MOCK_FAQS } from '$mocks';

  import FullWidthVideo from '$components/Video/FullWidthVideo.svelte';
  import { TaikoTrailblazersLogo } from '$components/Logo';

  let faqs = MOCK_FAQS;
</script>

<div class="f-center container flex-col w-full overflow-visible">
  <!-- section 1 -->
  <div class="f-center flex-col w-full pt-[20px] xl:pt-[150px] xl:pb-[165px] gap-[132px]">
    <div class="f-center flex-col xl:flex-row w-full">
      <div class="f-center flex-col w-full">
        <!-- Title -->
        <div class="xl:self-start font-clash-grotesk text-[23px]/[28px] tracking-[10px] xl:text-[45px]/[45px] xl:tracking-[22.5px] pb-[30px] xl:pb-[114px]">
          <div class="f-center w-full flex-col gap-5">
            <TaikoTrailblazersLogo class="w-[335px] xl:w-[655px]"/>
            <span class="w-fit text-center xl:text-left">call of taiko</span>
          </div>
        </div>
        <!-- Description -->
        <div class="xl:self-start f-center flex-col xl:pb-0">
          <PlusIcon class="  xl:self-start  pb-[40px] hidden xl:block" />
          <div class="body-bold max-w-[343px] text-center xl:text-left">
            In the vibrant world of Neo Nakuzaa revolutionary cast of characters is emerging: Taiko Factions.
          </div>
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
    </div>
  </div>

  <FullWidthVideo />

  <!-- faq section -->
  <div class=" w-full px-[0px] py-[100px] xl:px-[75px] xl:py-[86px]">
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
