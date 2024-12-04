<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames('text-[35px]/[42px]', 'font-clash-grotesk', 'font-[500]', 'text-primary-content');
</script>

<div class={wrapperClasses}>
  <slot />
</div>
