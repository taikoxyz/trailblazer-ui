<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames('bg-[purple]', 'border', 'border-[purple]', 'w-max', 'h-full');

  const borderedRowClasses = classNames(
    'flex',
    'justify-center',
    'items-center',
    'border',
    'border-grey-600',
    'h-[57px]',
    'w-full',
  );
  const linesClasses = classNames('h-full');
  const linesImageClasses = classNames('w-full');
</script>

<div class={wrapperClasses}>
  <div class={borderedRowClasses}></div>
  <div class={borderedRowClasses}></div>
  <div class={linesClasses}>
    <img class={linesImageClasses} src="/thrillblazers/diagonal-lines.svg" />
  </div>
  <div class={borderedRowClasses}></div>
</div>
