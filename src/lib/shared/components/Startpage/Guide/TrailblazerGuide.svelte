<script lang="ts">
  import { t } from 'svelte-i18n';

  import { classNames } from '$shared/utils/classNames';

  import TrailblazerGuideStep from './TrailblazerGuideStep.svelte';

  const wrapperClasses = classNames(
    'xl:max-w-[1440px]',
    'items-start',
    'lg:mt-[12px]',
    'mt-[80px]',
    'justify-between',
    'flex',
    'flex-col',
    'lg:flex-row',
    'relative',
    'w-full',
    'lg:gap-[68px]',
    'gap-[100px]',
    'md:px-[116px]',
    'lg:px-0',
    $$props.class,
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
