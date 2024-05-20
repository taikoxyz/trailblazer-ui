<script lang="ts">
  import { Icon } from '$components/Icon';
  import { Connector } from '$components/SVG';
  import TrailblazerGuideStep from './TrailblazerGuideStep.svelte';
</script>

<!-- Will you answer the call -->
<div class="f-center xl:items-start gap-[30px] flex-col">
  <div>STEP-BY-STEP PARTICIPATION GUIDE</div>
  <div class="f-center w-full flex-col xl:flex-row xl:justify-between gap-8 text-center xl:text-left">
    <!-- Title text: Will you answer the call -->
    <div class="font-clash-grotesk tracking-[-1.5px] text-[75px]/[70px]">
      How to participate in the<br /><span class="text-secondary-brand">Call of Taiko</span>
    </div>

    <!-- Sub text: Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign. -->
    <div class="title-body-regular text-secondary-content xl:self-end max-w-[343px]">
      Follow these simple steps to dive into the world of Neo Nakuza and make your mark.
    </div>
  </div>
</div>

<div class="f-center flex-col xl:flex-row h-auto">
  <TrailblazerGuideStep
    icon="semi-circle-reversed"
    title="Connect"
    description="Begin by registering your wallet address. This initial step is crucial as it links your identity to your
    participation.">
  </TrailblazerGuideStep>
  <div class="rotate-90 xl:rotate-0">
    <Connector class="fill-purple min-w-[32px]" />
  </div>
  <TrailblazerGuideStep
    icon="quad-circles"
    title="Pinkify & Amplify"
    description="Begin by registering your wallet address. This initial step is crucial as it links your identity to your
    participation.">
  </TrailblazerGuideStep>
  <div class="rotate-90 xl:rotate-0">
    <Connector class="fill-purple min-w-[32px]" />
  </div>
  <TrailblazerGuideStep
    icon="diamond"
    title="Amplify The Call"
    description="Begin by registering your wallet address. This initial step is crucial as it links your identity to your
  participation.">
  </TrailblazerGuideStep>
</div>
