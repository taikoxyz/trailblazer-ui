<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  // Conceived as a wrapper for CoreModalTitle and CoreModalDescription

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'gap-[20px]',
    'items-center',
    'justify-center',
    'w-full',
    'max-w-[900px]',
  );
</script>

<div class={wrapperClasses}>
  <slot />
</div>
