<script lang="ts">
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { classNames } from '$shared/utils/classNames';

  import { claimModal } from '../../stores';

  const wrapperClasses = classNames(
    'bg-grey-700',
    'fixed',
    'bottom-[30px]',
    'right-[30px]',
    'flex',
    'justify-center',
    'items-center',
    'rounded-full',
    'shadow-[0px_0px_30px_0px_#FFC6E933]',
    'border',
    'border-grey-600',
    'p-[4px]',
    'pl-[16px]',
    'gap-[40px]',
  );

  const labelClasses = classNames('text-grey-10', 'font-[700]', 'text-[16px]/[24px]', 'flex');

  const iconClasses = classNames('w-[24px]', 'h-[24px]');
</script>

<div class={wrapperClasses}>
  <div class={labelClasses}>
    <img class={iconClasses} src="/news/flame.svg" alt="Flame" />
    Your S2 Bonus is Ready!
  </div>
  <ActionButton on:click={() => claimModal.set(true)} priority="primary">Claim Now</ActionButton>
</div>
