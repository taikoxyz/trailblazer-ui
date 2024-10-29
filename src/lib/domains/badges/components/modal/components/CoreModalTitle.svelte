<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames('text-[35px]/[42px]', 'font-clash-grotesk', 'font-[500]', 'text-[#f3f3f3]');
</script>

<div class={wrapperClasses}>
  <slot />
</div>
