<script lang="ts">
  import { Icon } from '$components/Icon';
  import { Spinner } from '$components/Spinner';
  import { classNames } from '$libs/util/classNames';

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
    'btn size-[56px] px-[20px] py-[8px] rounded-full flex-1 items-center body-medium',
    $$restProps.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    withArrow ? 'min-w-[180px]' : 'w-full',
    disabledColor,
    $$props.class,
  );

  $: primaryClasses = classNames('btn-primary text-white border-none');

  $: secondaryClasses = classNames(
    $$restProps.disabled
      ? 'border-none'
      : 'border-primary-brand dark:text-white hover:bg-primary-interactive-hover btn-secondary bg-transparent light:text-black',
  );

  $: priorityToClassMap = {
    primary: primaryClasses,
    secondary: secondaryClasses,
  };

  $: classes = classNames(commonClasses, priorityToClassMap[priority], $$props.class);
</script>

<button {...$$restProps} class={classes} on:click>
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

<style>
  .btn:hover .arrow-container {
    animation: slide-right 0.3s forwards;
  }
</style>
