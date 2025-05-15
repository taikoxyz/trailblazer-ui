<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  import AfterPreconf from './AfterPreconf.svelte';
  import BeforePreconf from './BeforePreconf.svelte';

  const wrapperClasses = classNames(
    'w-full',
    'flex',
    'flex-col',
    'gap-4',
    'items-center',
    'justify-center',
    'px-[24px]',
    'md:px-[48px]',
  );

  let isDesktopOrLarger = true;
  $: dynamicAttrs = isDesktopOrLarger ? { 'data-glow-border': true } : {};

  const cardClasses = classNames(
    'f-row',
    'w-full',
    'card',
    'rounded-[30px]',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'h-full',
    $$props.class,
  );

  const bodyClasses = classNames(
    'card-body',
    'body-regular',
    'p-[20px]',
    'flex',
    'flex-row',
    'justify-between',
    'h-full',
  );
</script>

<div class={wrapperClasses}>
  <div class={cardClasses}>
    <div {...dynamicAttrs} class={bodyClasses}>
      <BeforePreconf />
      <AfterPreconf />
    </div>
  </div>
</div>
