<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames('text-secondary-content', 'text-center', 'text-[16px]/[24px]');
</script>

<div class={wrapperClasses}>
  <slot />
</div>
