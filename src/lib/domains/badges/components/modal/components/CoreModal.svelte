<script lang="ts">
  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';

  export let open = false;

  const wrapperClasses = classNames('modal');
  const contentWrapperClasses = classNames(
    'z-100',
    'fixed',
    'top-0',
    'gap-[24px]',
    'left-0',
    'w-[100vw]',
    'h-[100vh]',
    'overflow-hidden',
    'glassy-background-lg',
    'bg-black',
    'bg-opacity-70',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
  );

  const closeButtonClasses = classNames(
    'absolute',
    'top-[40px]',
    'right-[40px]',
    'w-[50px]',
    'h-[50px]',
    'bg-secondary-icon',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    'hover:bg-grey-900',
    'transition-all',
  );

  const closeButtonIconClasses = classNames('fill-primary-icon', 'absolute', 'left-[11px]', 'top-[11px]');

  function closeModal() {
    open = false;
  }
</script>

{#if open}
  <dialog class={wrapperClasses} class:modal-open={open}>
    <div class={contentWrapperClasses}>
      <slot />
      <button class={closeButtonClasses} on:click={closeModal}>
        <Icon type="x-close" class={closeButtonIconClasses} size={24} />
      </button>
    </div>
  </dialog>
{/if}
