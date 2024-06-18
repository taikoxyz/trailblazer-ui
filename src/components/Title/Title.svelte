<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  export let width = classNames($$props.class, 'xl:max-w-[434px] md:w-1/2');
</script>

<div
  class="{width} font-clash-grotesk text-secondary-brand tracking-[-1.5px] text-[75px]/[70px] text-center md:text-left">
  <slot />
</div>
