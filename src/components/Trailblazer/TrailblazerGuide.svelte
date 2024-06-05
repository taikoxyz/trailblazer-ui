<script lang="ts">
  import { ButtonWithArrow } from '$components/Button';
  import { Icon } from '$components/Icon';
  import { Connector } from '$components/SVG';
  import TrailblazerGuideStep from './TrailblazerGuideStep.svelte';
</script>

<!-- Will you answer the call -->
<div class="f-center xl:items-start gap-[30px] flex-col">
  <div>STEP-BY-STEP PARTICIPATION GUIDE</div>
  <div class="f-center w-full flex-col xl:flex-row xl:justify-between gap-8 text-center xl:text-left">
    <!-- Title text: Will you answer the call -->
    <div class="font-clash-grotesk tracking-[-1.5px] text-[45px]/[52px] xl:text-[75px]/[70px]">
      How to participate in the<br /><span class="text-secondary-brand">Call of Taiko</span>
    </div>

    <!-- Sub text: Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign. -->
    <div class="flex flex-col gap-8">
      <div class="title-body-regular text-secondary-content xl:self-end max-w-[343px]">
        Follow these simple steps to dive into the world of Neo Nakuza and make your mark.
      </div>
      <a class="self-center xl:self-start" href="/about">
        <ButtonWithArrow class="min-w-[183px]" text="Learn more" />
      </a>
    </div>
  </div>
</div>

<div class="f-center flex-col xl:flex-row h-auto">
  <TrailblazerGuideStep
    icon="semi-circle-reversed"
    title="Connect"
    description="Kickstart your journey by connecting your X account. This quick setup is your gateway to the vibrant Taiko community.">
  </TrailblazerGuideStep>
  <div class="rotate-90 xl:rotate-0">
    <Connector class="fill-purple min-w-[32px]" />
  </div>
  <TrailblazerGuideStep
    icon="quad-circles"
    title="Pinkify & Amplify"
    description="Update your profile picture with a generated Taiko pink design. Show your colors by sharing your new look on X and prove your participation.">
  </TrailblazerGuideStep>
  <div class="rotate-90 xl:rotate-0">
    <Connector class="fill-purple min-w-[32px]" />
  </div>
  <TrailblazerGuideStep
    icon="diamond"
    title="Begin your trail"
    description="Lastly, register your wallet address. This step not only links your identity and prepares you to claim your exclusive faction badge, but also lets you be part of something bigger.">
  </TrailblazerGuideStep>
</div>
