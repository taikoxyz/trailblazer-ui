<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  // h-[130px] w-[130px] bg-primary-background rounded-[20px]

  const placeholderClasses = classNames(
    'h-[130px]',
    'w-[130px]',
    'bg-primary-background',
    'rounded-[20px]',
    'justify-center',
    'flex',
    'items-center',
    'text-sm',
    'text-secondary-content',
  );
</script>

<div class={placeholderClasses}></div>
