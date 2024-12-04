<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames(
    'w-[138px]',
    'items-center',
    'justify-center',
    'f-col',
    'gap-[15px]',
    'uppercase',
    'text-sm',
    'font-clash-grotesk',
    'font-medium',
  );
  const badgeClasses = classNames(
    'border',
    'border-divider-border',
    'border-[2px]',
    'rounded-full',
    'px-[20px]',
    'py-[10px]',
  );
  const prizeWrapperClasses = classNames('f-row', 'gap-[16px]', 'items-center');
  const prizeClasses = classNames(
    'font-clash-grotesk',
    'text-[45px]',
    'font-semibold',
    'leading-[52px]',
    'tracking-[-0.45px]',
  );
  const tokenClasses = classNames(
    'font-medium',
    'font-clash-grotesk',
    'leading-normal',
    'tracking-[1.6px]',
    'text-primary-link',
  );
</script>

<div class={wrapperClasses}>
  <span class={badgeClasses}> Prize pool </span>

  <div class={prizeWrapperClasses}>
    <span class={prizeClasses}> 1M </span>
    <span class={tokenClasses}> Taiko tokens </span>
  </div>
</div>
