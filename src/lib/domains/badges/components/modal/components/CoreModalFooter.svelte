<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames(
    'w-[450px]',
    'max-w-full',
    'justify-center',
    'items-center',
    'gap-[30px]',
    'flex',
    'flex-col',
    'text-[24px]/[32px]',
    'text-secondary-content',
    'text-center',
    'mt-[80px]',
    'md:mt-[30px]',
  );
</script>

<div class={wrapperClasses}>
  <slot />
</div>
