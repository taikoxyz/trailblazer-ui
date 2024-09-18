<script lang="ts">
  import { t } from 'svelte-i18n';

  import { classNames } from '$libs/util/classNames';

  import TrailblazerGuideStep from './TrailblazerGuideStep.svelte';

  const wrapperClasses = classNames(
    'justify-center',
    'items-center',
    'px-[48px]',
    'justify-between',
    'flex',
    'flex-col',
    'lg:flex-row',
    'lg:h-[379px]',
    'xl:h-[279px]',
    'md:h-[465px]',
    'relative',
    'w-full',
    'md:gap-0',
    'gap-[100px]',
  );
</script>

<div class={wrapperClasses}>
  <TrailblazerGuideStep
    icon="semi-circle-reversed"
    title={$t('trailblazer_guide.step_1.title')}
    description={$t('trailblazer_guide.step_1.description')} />

  <TrailblazerGuideStep
    icon="quad-circles"
    title={$t('trailblazer_guide.step_2.title')}
    description={$t('trailblazer_guide.step_2.description')} />

  <TrailblazerGuideStep
    icon="diamond"
    title={$t('trailblazer_guide.step_3.title')}
    description={$t('trailblazer_guide.step_3.description')} />
</div>
