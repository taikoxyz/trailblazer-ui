<script lang="ts">
  import { onMount } from 'svelte';

  import { classNames } from '$shared/utils/classNames';
  import { positionElementByTarget } from '$shared/utils/positionElementByTarget';

  export let position: Position = 'top';

  let classes = classNames('flex z-10 rounded-full px-[8px] py-[2px] text-[14px]/[20px]', $$props.class || 'relative');

  const GAP = 10; // distance between trigger element and tooltip
  let triggerElem: HTMLButtonElement | null = null;
  let dialogElem: HTMLDialogElement | null = null;

  onMount(() => {
    if (triggerElem && dialogElem) {
      positionElementByTarget(dialogElem, triggerElem, position, GAP);
    }
  });
</script>

<div class={classes} role="presentation">
  <slot />
</div>
