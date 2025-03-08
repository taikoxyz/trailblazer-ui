<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte';
  import { Icon, type IconType } from '$shared/components/Icon';
  import { uid } from '$shared/utils/uid';
  import { classNames } from '$shared/utils/classNames';

  type Position = 'top' | 'bottom' | 'left' | 'right';

  export let position: Position = 'top';
  export let tooltipOpen = false;
  export let iconType: IconType = 'question-circle';
  export let tooltipClass = 'bg-white border border-black text-black p-[24px] rounded-[16px] shadow-md max-w-[300px]';

  let tooltipId = `tooltip-${uid()}`;
  let triggerElem: HTMLButtonElement;
  let tooltipElem: HTMLDivElement;
  const dispatch = createEventDispatcher();
  const GAP = 10;

  async function openTooltip(): Promise<void> {
    tooltipOpen = true;
    await tick();
    positionTooltip();
    dispatch('mouseenter');
  }

  function closeTooltip(delay = 200): void {
    setTimeout(() => {
      tooltipOpen = false;
      dispatch('mouseleave');
    }, delay);
  }

  function positionTooltip(): void {
    if (!tooltipElem || !triggerElem) return;

    const targetRect = triggerElem.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    tooltipElem.style.position = 'fixed';
    tooltipElem.style.display = 'block';

    const tooltipRect = tooltipElem.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = targetRect.top - tooltipRect.height - GAP;
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = targetRect.bottom + GAP;
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        left = targetRect.left - tooltipRect.width - GAP;
        break;
      case 'right':
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        left = targetRect.right + GAP;
        break;
    }

    // Clamp horizontally
    if (left < 0) {
      left = 5;
    } else if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - 5;
    }

    // Clamp vertically
    if (top < 0) {
      if (position === 'top') {
        top = targetRect.bottom + GAP;
      } else {
        top = 5;
      }
    } else if (top + tooltipRect.height > viewportHeight) {
      if (position === 'bottom') {
        top = targetRect.top - tooltipRect.height - GAP;
      } else {
        top = viewportHeight - tooltipRect.height - 5;
      }
    }

    tooltipElem.style.top = `${top}px`;
    tooltipElem.style.left = `${left}px`;
  }

  $: if (tooltipOpen) {
    tick().then(() => positionTooltip());
  }

  onMount(() => {
    const handleResizeOrScroll = () => {
      if (tooltipOpen) positionTooltip();
    };

    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll);
    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
  });

  onDestroy(() => {
    closeTooltip(0);
  });
</script>

<div class={classNames('relative inline-flex', $$props.class)}>
  <button
    type="button"
    class="flex items-center justify-center focus:outline-none"
    aria-haspopup="true"
    aria-controls={tooltipId}
    aria-expanded={tooltipOpen}
    on:click|stopPropagation={openTooltip}
    on:focus|stopPropagation={openTooltip}
    on:mouseenter={openTooltip}
    on:mouseleave={() => closeTooltip()}
    bind:this={triggerElem}>
    <Icon type={iconType} />
  </button>

  {#if tooltipOpen}
    <div id={tooltipId} class={classNames(tooltipClass, 'z-50 relative')} bind:this={tooltipElem}>
      {#if position === 'top'}
        <div class="absolute bottom-0 left-1/2 w-3 h-3 bg-white rotate-45 translate-y-1/2 -translate-x-1/2" />
      {:else if position === 'bottom'}
        <div class="absolute top-0 left-1/2 w-3 h-3 bg-white rotate-45 -translate-y-1/2 -translate-x-1/2" />
      {:else if position === 'left'}
        <div class="absolute right-0 top-1/2 w-3 h-3 bg-white rotate-45 translate-x-1/2 -translate-y-1/2" />
      {:else if position === 'right'}
        <div class="absolute left-0 top-1/2 w-3 h-3 bg-white rotate-45 -translate-x-1/2 -translate-y-1/2" />
      {/if}

      <slot />
    </div>
  {/if}
</div>
