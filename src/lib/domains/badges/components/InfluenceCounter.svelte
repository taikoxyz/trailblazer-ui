<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  export let max: number;
  export let value: number;

  export let color: 'pink' | 'purple' = 'pink';

  const maxToGridCols: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
  };

  $: wrapperClasses = classNames(
    'w-full',
    maxToGridCols[max],
    'grid',
    'border',
    'rounded-full',
    'overflow-hidden',
    'h-[32px]',
    'border-elevated-background',
    'bg-gradient-to-b',
    'from-[#1D2027]',
    'via-secondary-icon',
    'to-secondary-icon',
  );

  const emptyBulletClasses = classNames('w-full');

  $: fullBulletClasses = classNames(
    'w-full',
    'h-full',
    color === 'pink' ? 'bg-gradient-to-b from-[#F03BAA] via-secondary to-[#C0147E]' : null,
    color === 'purple' ? 'bg-gradient-to-b from-[#6D1CE3] via-purple-600 to-[#4C07A7]' : null,
  );
</script>

<div class={wrapperClasses}>
  {#each Array.from({ length: max }, (_, i) => i) as i}
    {#if i < value}
      <div class={fullBulletClasses} />
    {:else}
      <div class={emptyBulletClasses} />
    {/if}
  {/each}
</div>
