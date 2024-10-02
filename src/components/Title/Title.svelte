<script lang="ts">
  import { classNames } from '$lib/shared/utils/classNames';

  export let width = $$props.class;
  export let center = $$props.class;

  const widthClasses = classNames('xl:max-w-[434px]', 'md:w-1/2', width);
  const centerClasses = classNames('md:text-left', center);

  const titleClasses = classNames(
    widthClasses,
    centerClasses,
    'font-clash-grotesk',
    'text-secondary-brand',
    'tracking-[-1.5px]',
    'md:text-[75px]/[70px]',
    'text-[57px]/[52px]',
    'leading-12',
    'md:leading-none',
  );
</script>

<div class={titleClasses}>
  <slot />
</div>
