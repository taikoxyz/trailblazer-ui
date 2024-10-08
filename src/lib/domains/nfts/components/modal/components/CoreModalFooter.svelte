<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames(
    'w-[450px]',
    'justify-center',
    'items-center',
    'gap-[60px]',
    'flex',
    'flex-col',

    'text-[24px]/[32px]',
    'font-clash-grotesk',
    'text-secondary-content',
    'text-center',
  );
</script>

<div class={wrapperClasses}>
  <slot />
</div>
