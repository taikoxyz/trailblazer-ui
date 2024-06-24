<script lang="ts">
  import { t } from 'svelte-i18n';

  import { Connector } from '$components/SVG';

  import TrailblazerGuideStep from './TrailblazerGuideStep.svelte';
</script>

<div class="container f-center f-col xl:flex-row h-auto px-[20px] xl:px-[57px]">
  <TrailblazerGuideStep
    icon="semi-circle-reversed"
    title={$t('trailblazer_guide.step_1.title')}
    description={$t('trailblazer_guide.step_1.description')}></TrailblazerGuideStep>
  <div class="rotate-90 xl:rotate-0">
    <Connector class="fill-purple min-w-[32px]" />
  </div>
  <TrailblazerGuideStep
    icon="quad-circles"
    title={$t('trailblazer_guide.step_2.title')}
    description={$t('trailblazer_guide.step_2.description')}></TrailblazerGuideStep>
  <div class="rotate-90 xl:rotate-0">
    <Connector class="fill-purple min-w-[32px]" />
  </div>
  <TrailblazerGuideStep
    icon="diamond"
    title={$t('trailblazer_guide.step_3.title')}
    description={$t('trailblazer_guide.step_3.description')}></TrailblazerGuideStep>
</div>
