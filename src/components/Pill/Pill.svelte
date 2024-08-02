<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { Icon } from '$components/Icon';
  import { classNames } from '$libs/util/classNames';
  import { positionElementByTarget } from '$libs/util/positionElementByTarget';
  import { uid } from '$libs/util/uid';

  export let position: Position = 'top';
  export let tooltipOpen = false;

  let tooltipId = `tooltip-${uid()}`;
  let tooltipClass = `block dialog-tooltip`;
  let classes = classNames('flex z-10 rounded-full px-[8px] py-[2px] text-[14px]/[20px]', $$props.class || 'relative');

  const GAP = 10; // distance between trigger element and tooltip
  let triggerElem: HTMLButtonElement;
  let dialogElem: HTMLDialogElement;

  function closeTooltip(ms = 0) {
    setTimeout(() => {
      tooltipOpen = false;
    }, ms);
  }

  function openTooltip() {
    tooltipOpen = true;
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

<div class={classes} role="presentation" on:mouseleave={() => closeTooltip(200)}>
  <slot />
</div>
