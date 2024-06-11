<script lang="ts">
  import { PlusIcon } from '$components/Icon';
  import { TaikoTrailblazersLogo } from '$components/Logo';
  import { ButtonWithArrow } from '$components/Button';
</script>

<div
  class="f-center relative flex-col w-full pt-[50%] lg:pt-[20px] xl:py-[217px] xl:px-[57px] gap-[80px] xl:gap-[132px] rounded-[30px] overflow-hidden">
  <div class="f-center flex-col xl:flex-row w-full">
    <div class="f-center flex-col w-full">
      <!-- Title -->
      <div
        class="xl:self-start font-clash-grotesk text-[23px]/[28px] tracking-[10px] xl:text-[45px]/[45px] xl:tracking-[22.5px] pb-[30px] xl:pb-[114px]">
        <div class="f-center w-full flex-col gap-5">
          <TaikoTrailblazersLogo class="w-[335px] xl:w-[558px]" />
        </div>
      </div>
      <!-- Description -->
      <div class="xl:self-start f-center flex-col pb-10 xl:pb-10">
        <PlusIcon class="  xl:self-start  pb-[40px] hidden xl:block" />
        <div class="max-w-[262px] xl:max-w-[343px] text-center xl:text-left">
          Embark on your Taiko Trail, an open-access, performance-based program designed to reward both users and
          applications.
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
    <div class="gap-4 self-center items-center xl:self-start flex flex-col pb-16 xl:hidden">
      <a href="/pinkify">
        <ButtonWithArrow class="min-w-[183px]" text="Start now" />
      </a>
      <a
        class="btn bg-transparent border-2 border-secondary-brand min-w-[183px] hover:bg-[#E81899]/20 hover:border-2 hover:border-secondary-brand body-regular"
        href="/about">Learn more</a>
    </div>
  </div>
  <div class="absolute -z-10 bg-gradient-to-r w-[687px] h-full left-0" />
  <div class="absolute -z-20 bg-[url(/trailblazers-bg.jpeg)] w-full h-full left-[274px] bg-cover" />
</div>

<style>
  .bg-gradient-to-r {
    background: linear-gradient(90deg, #051434 50.04%, rgba(5, 20, 52, 0) 98.25%);
  }
</style>
