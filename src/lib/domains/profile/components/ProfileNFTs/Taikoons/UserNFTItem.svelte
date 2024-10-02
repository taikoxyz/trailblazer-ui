<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  export let imageUrl: string | undefined;

  // CSS classes
  const wrapperClasses = classNames(
    'w-[277px]',

    'relative',
    'overflow-hidden',
    'flex',
    'w-full',
    'aspect-square',
    'rounded-[30px]',
    'bg-[#310E2F]',
    'transition-all',
  );
</script>

<div class={wrapperClasses}>
  <div class="relative w-full h-full z-0">
    <img src={imageUrl} alt={imageUrl} class="pointer-events-none rounded-[20px] absolute left-0 top-0 z-20 w-full" />
  </div>
</div>
