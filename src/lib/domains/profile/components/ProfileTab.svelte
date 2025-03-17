<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const containerClass = classNames(
    'container',
    'w-full',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'rounded-[30px]',
    'relative',
    'py-[35px]',
    'px-[24px]',
  );
</script>

<div class={containerClass}>
  <slot />
</div>
