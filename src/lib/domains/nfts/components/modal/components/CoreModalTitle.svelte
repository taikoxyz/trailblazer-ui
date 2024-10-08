<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames(
    'text-[35px]/[36px]',
    'font-clash-grotesk',
    'font-[500]',

    'text-primary-content',
  );
</script>

<div class={wrapperClasses}>
  <slot />
</div>
