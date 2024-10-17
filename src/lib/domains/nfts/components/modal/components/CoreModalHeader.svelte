<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

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
