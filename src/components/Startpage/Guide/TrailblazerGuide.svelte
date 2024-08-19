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
    'md:flex-row',
    'md:py-12',
    'py-[30px]',
    'lg:h-[475px]',
    'xl:h-[375px]',
    'md:h-[525px]',
    'relative',
    'w-full',
    'px-[20px]',
    'lg:px-[57px]',
    'md:px-[47px]',
  );
  const unionClasses = classNames('rotate-90', 'w-[30px]', 'flex', 'items-center', 'justify-center', 'md:rotate-0');
</script>

<div class={wrapperClasses}>
  <TrailblazerGuideStep
    icon="semi-circle-reversed"
    title={$t('trailblazer_guide.step_1.title')}
    description={$t('trailblazer_guide.step_1.description')} />

  <div class={unionClasses}>
    <Connector class="fill-purple-1000 min-w-[32px]" />
  </div>

  <TrailblazerGuideStep
    icon="quad-circles"
    title={$t('trailblazer_guide.step_2.title')}
    description={$t('trailblazer_guide.step_2.description')} />
  <div class={unionClasses}>
    <Connector class="fill-purple-1000 min-w-[32px]" />
  </div>

  <TrailblazerGuideStep
    icon="diamond"
    title={$t('trailblazer_guide.step_3.title')}
    description={$t('trailblazer_guide.step_3.description')} />
</div>
