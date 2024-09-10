<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  export let width = classNames('xl:max-w-[434px] md:w-1/2', $$props.class);
  export let center = classNames('md:text-center', $$props.class);
</script>

<div
  class="{width} font-clash-grotesk text-secondary-brand tracking-[-1.5px] text-[75px]/[70px] {center} md:text-left leading-12 md:leading-none">
  <slot />
</div>
