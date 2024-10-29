<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames('text-[#ADB1B8]', 'text-center', 'md:text-[18px]/[24px]', 'text-[16px]/[24px]');
</script>

<div class={wrapperClasses}>
  <slot />
</div>
