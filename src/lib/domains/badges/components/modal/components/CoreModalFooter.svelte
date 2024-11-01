<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames(
    'w-[450px]',
    'max-w-full',
    'justify-center',
    'items-center',
    'gap-[24px]',
    'flex',
    'flex-col',
    'text-[24px]/[32px]',
    'text-secondary-content',
    'text-center',
  );
</script>

<div class={wrapperClasses}>
  <slot />
</div>
