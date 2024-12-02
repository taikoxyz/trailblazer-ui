<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Spinner } from '$shared/components';
  import { classNames } from '$shared/utils/classNames';

  export let disabled = false;
  export let loading = false;

  const dispatch = createEventDispatcher();
  const fancyButtonClasses = classNames(
    'w-full',
    'fancy-background',
    'rounded-full',
    'py-[16px]',
    'font-[700]',
    'text-[#F3F3F3]',
    'text-[16px]/[24px]',
    'relative',
    'flex',
    'justify-center',
    'gap-[12px]',
    'items-center',
    'disabled:grayscale',
    'disabled:opacity-50',
  );

  const fancyBorderClasses = classNames(
    'w-2/3',
    'h-[1px]',
    'absolute',
    'rounded-full',
    'bg-gradient-to-r',
    'from-transparent',
    'via-[white]',
    'to-transparent',
  );
</script>

<button {disabled} on:click={() => dispatch('click')} class={fancyButtonClasses}>
  {#if loading}
    <Spinner />
  {/if}
  <slot />
  <div class={classNames(fancyBorderClasses, 'top-0')}></div>
  <div class={classNames(fancyBorderClasses, 'bottom-0')}></div>
</button>
