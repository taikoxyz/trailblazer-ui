<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'gap-[8px]',
    'items-center',
    'justify-center',
    'w-full',
    'text-center',
    'max-w-[900px]',
    'mb-[60px]',
  );
</script>

<div class={wrapperClasses}>
  <slot />
</div>
