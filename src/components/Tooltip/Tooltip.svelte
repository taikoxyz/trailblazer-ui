<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  import { Icon } from '$components/Icon';
  import { classNames } from '$libs/util/classNames';
  import { positionElementByTarget } from '$libs/util/positionElementByTarget';
  import { uid } from '$libs/util/uid';

  export let position: Position = 'top';
  export let tooltipOpen = false;

  let tooltipId = `tooltip-${uid()}`;
  let tooltipClass = `block dialog-tooltip bg-white text-black border border-white`;
  let classes = classNames('flex z-10 ', $$props.class || 'relative');

  const GAP = 10; // distance between trigger element and tooltip
  let triggerElem: HTMLButtonElement;
  let dialogElem: HTMLDialogElement;

  let dispatch = createEventDispatcher();

  function closeTooltip(ms = 0) {
    setTimeout(() => {
      tooltipOpen = false;
      dispatch('mouseleave');
    }, ms);
  }

  function openTooltip() {
    tooltipOpen = true;
    dispatch('mouseenter');
  }

  onMount(() => {
    if (position === 'top') {
      tooltipClass = `block dialog-tooltip dialog-tooltip-top`;
    }
    positionElementByTarget(dialogElem, triggerElem, position, GAP);
  });

  onDestroy(() => {
    closeTooltip();
  });
</script>

<div class={classes} role="presentation">
  <button
    aria-haspopup="dialog"
    aria-controls={tooltipId}
    aria-expanded={tooltipOpen}
    on:click|stopPropagation={openTooltip}
    on:focus|stopPropagation={openTooltip}
    on:mouseleave={() => closeTooltip(200)}
    on:mouseenter={openTooltip}
    bind:this={triggerElem}>
    <Icon type="question-circle" />
  </button>
  <dialog id={tooltipId} class={tooltipClass} class:block-hidden={!tooltipOpen} bind:this={dialogElem}>
    <svg
      class="absolute left-1/2 top-0 -translate-y-[100%] -translate-x-[50%]"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none">
      <path d="M0.250009 9.74999L10 -1.85515e-05L19.75 9.74999H0.250009Z" fill="white" />
    </svg>
    <slot />
  </dialog>
</div>
