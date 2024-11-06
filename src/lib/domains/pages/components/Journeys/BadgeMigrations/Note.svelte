<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames('border-l-[9px]', 'border-secondary-brand', 'f-row', 'px-[16px]');
  const noteClasses = classNames('flex-grow', 'font-bold', 'leading-[24px]');
</script>

<div class={wrapperClasses}>
  <div class={noteClasses}>
    Note: <slot />
  </div>
</div>
