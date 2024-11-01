<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'gap-[8px]',
    'items-center',
    'justify-center',
    'w-full',
    'max-w-[900px]',
    // 'pb-[40px]',
  );
</script>

<div class={wrapperClasses}>
  <slot />
</div>
