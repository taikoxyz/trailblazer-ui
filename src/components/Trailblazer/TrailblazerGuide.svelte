<script lang="ts">
  import { Connector } from '$components/SVG';

  import TrailblazerGuideStep from './TrailblazerGuideStep.svelte';
</script>

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
