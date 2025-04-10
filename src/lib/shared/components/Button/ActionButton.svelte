<script lang="ts">
  import { Icon } from '$shared/components/Icon';
  import { Spinner } from '$shared/components/Spinner';
  import { classNames } from '$shared/utils/classNames';

  import { ButtonState } from './states';
  import type { ActionButtonType } from './types';

  export let loading = false;

  export let priority: ActionButtonType;
  export let state: ButtonState = ButtonState.DEFAULT;

  export let withArrow = false;

  export let onPopup = false;

  $: if (loading) {
    state = ButtonState.LOADING;
  } else {
    state = ButtonState.DEFAULT;
  }

  $: disabledColor = onPopup && $$restProps.disabled ? '!bg-dialog-interactive-disabled' : '';

  $: commonClasses = classNames(
    'relative',
    'btn',
    'size-[56px]',
    'min-h-[56px]',
    'px-[20px]',
    'py-[8px]',
    'rounded-full',
    'flex-1',
    'items-center',
    'body-medium',
    'justify-center',
    withArrow ? 'pr-[8px]' : '',
    $$restProps.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    withArrow ? 'min-w-[161px]' : 'w-full',
    disabledColor,
    $$props.class,
  );

  $: primaryClasses = classNames('btn-primary', 'text-white', 'border-none', 'hover:bg-secondary');

  $: secondaryClasses = classNames(
    $$restProps.disabled
      ? 'border-none'
      : 'border-primary-brand text-white hover:bg-secondary btn-secondary bg-transparent ',
  );

  $: tertiaryClasses = classNames('btn-primary', 'border-none');

  const fancyButtonClasses = classNames(
    'btn',
    'btn-ghost',
    'border-none',
    'w-full',
    'fancy-background',
    'rounded-full',
    'py-[16px]',
    'font-[700]',
    'text-grey-10',
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

  const tertiaryBorderClasses = classNames(
    'bg-[green]',
    'absolute',
    'w-[calc(100%+4px)]',
    'h-[calc(100%+4px)]',
    'rounded-full',
    'z-[-1]',
    'bg-gradient-to-r',
    'from-primary',
    'via-[#FFC6E9]',
    'to-primary',
  );

  $: priorityToClassMap = {
    primary: primaryClasses,
    fancy: fancyButtonClasses,
    secondary: secondaryClasses,
    tertiary: tertiaryClasses,
  };

  $: classes = classNames(commonClasses, priorityToClassMap[priority], $$props.class);
</script>

{#if $$restProps.href}
  <a {...$$restProps} href={$$restProps.href} target="_blank" class={classes}>
    {#if priority === 'fancy'}
      <div class={classNames(fancyBorderClasses, 'top-0')}></div>
      <div class={classNames(fancyBorderClasses, 'bottom-0')}></div>
    {:else if priority === 'tertiary'}
      <div class={tertiaryBorderClasses}></div>
    {/if}
    {#if loading}
      <Spinner />
    {/if}
    <slot />
    {#if withArrow}
      <div class="flex items-center justify-end">
        <div class="f-center w-[32px] min-h-[32px] rounded-full bg-white overflow-hidden">
          <div class="arrow-container translate-x-[-14px] flex gap-[14px] hover:animate-slide-right">
            <Icon type={'arrow-right'} fillClass="fill-secondary-brand" width={14} />
            <Icon type={'arrow-right'} fillClass="fill-secondary-brand" width={14} />
          </div>
        </div>
      </div>
    {/if}
  </a>
{:else}
  <button {...$$restProps} class={classes} on:click>
    {#if priority === 'fancy'}
      <div class={classNames(fancyBorderClasses, 'top-0')}></div>
      <div class={classNames(fancyBorderClasses, 'bottom-0')}></div>
    {:else if priority === 'tertiary'}
      <div class={tertiaryBorderClasses}></div>
    {/if}
    {#if loading}
      <Spinner />
    {/if}
    <slot />
    {#if withArrow}
      <div class="flex items-center justify-end">
        <div class="f-center w-[32px] min-h-[32px] rounded-full bg-white overflow-hidden">
          <div class="arrow-container translate-x-[-14px] flex gap-[14px] hover:animate-slide-right">
            <Icon type={'arrow-right'} fillClass="fill-secondary-brand" width={14} />
            <Icon type={'arrow-right'} fillClass="fill-secondary-brand" width={14} />
          </div>
        </div>
      </div>
    {/if}
  </button>
{/if}

<style>
  .btn:hover .arrow-container {
    animation: slide-right 0.3s forwards;
  }
</style>
