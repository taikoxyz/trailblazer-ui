<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  import AfterPreconf from './AfterPreconf.svelte';
  import BeforePreconf from './BeforePreconf.svelte';
  import Score from './Score.svelte';

  $: error = null;

  const wrapperClasses = classNames(
    'w-full',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'px-[24px]',
    'md:px-0',
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
    'px-[24px]',
    'py-[54px]',
    'f-col',
    'lg:f-row',
    'items-center',
    'justify-between',
    'h-full',
  );

  $: diffBefore = 0;
  $: diffAfter = 0;
</script>

<div class={wrapperClasses}>
  <div class={cardClasses}>
    <div {...dynamicAttrs} class={bodyClasses}>
      <BeforePreconf bind:error bind:diffBefore />
      <div class="lg:v-sep h-sep" />
      <AfterPreconf bind:error bind:diffAfter />
      <div class="lg:v-sep h-sep" />
      <Score bind:error {diffAfter} {diffBefore} />
    </div>
  </div>
</div>

{#if error}
  <div class="text-red-500 mt-2">{error}</div>
{/if}
