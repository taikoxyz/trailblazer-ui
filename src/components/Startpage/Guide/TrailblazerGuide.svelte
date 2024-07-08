<script lang="ts">
  import { t } from 'svelte-i18n';

  import { Connector } from '$components/SVG';
  import { classNames } from '$libs/util/classNames';

  import TrailblazerGuideStep from './TrailblazerGuideStep.svelte';

  const wrapperClasses = classNames(
    'justify-center',
    'items-center',
    'flex',
    'flex-col',
    'lg:flex-row',
    'px-[20px]',
    'lg:px-[57px]',
  );
  const unionClasses = classNames('rotate-90', 'lg:rotate-0');
</script>

<div class={wrapperClasses}>
  <TrailblazerGuideStep
    icon="semi-circle-reversed"
    title={$t('trailblazer_guide.step_1.title')}
    description={$t('trailblazer_guide.step_1.description')} />
  <div class={unionClasses}>
    <Connector class="fill-purple min-w-[32px]" />
  </div>
  <TrailblazerGuideStep
    icon="quad-circles"
    title={$t('trailblazer_guide.step_2.title')}
    description={$t('trailblazer_guide.step_2.description')} />
  <div class={unionClasses}>
    <Connector class="fill-purple min-w-[32px]" />
  </div>
  <TrailblazerGuideStep
    icon="diamond"
    title={$t('trailblazer_guide.step_3.title')}
    description={$t('trailblazer_guide.step_3.description')} />
</div>
