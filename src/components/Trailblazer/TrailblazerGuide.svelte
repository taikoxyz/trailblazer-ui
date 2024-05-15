<script lang="ts">
  import { Icon } from '$components/Icon';
  import { Connector } from '$components/SVG';
  import TrailblazerGuideStep from './TrailblazerGuideStep.svelte';
</script>

<!-- Will you answer the call -->
<div class="flex gap-[30px] flex-col">
  <div>STEP-BY-STEP GUIDE</div>
  <div class="flex justify-between">
    <!-- Title text: Will you answer the call -->
    <div class="font-clash-grotesk tracking-[-1.5px] text-[75px]/[70px]">
      How to participate in the<br /><span class="text-secondary-brand">Call of Taiko</span>
    </div>

    <!-- Sub text: Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign. -->
    <div class="title-body-regular text-secondary-content self-end max-w-[343px]">
      Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign.
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
