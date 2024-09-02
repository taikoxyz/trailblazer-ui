<script lang="ts">
  import { classNames } from '$libs/util/classNames';

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
    'border',
    'rounded-full',
    'overflow-hidden',
    'h-[32px]',
    'border-[#191E28]',
  );

  const emptyBulletClasses = classNames(
    'w-full',
    'bg-gradient-to-b',
    'from-[#1D2027]',
    'via-[#2B303B]',
    'to-[#2B303B]',
  );

  $: fullBulletClasses = classNames(
    'w-full',
    color === 'pink' ? 'bg-gradient-to-b from-[#F03BAA] via-[#E81899] to-[#C0147E]' : null,
    color === 'purple' ? 'bg-gradient-to-b from-[#6D1CE3] via-[#5D08C8] to-[#4C07A7]' : null,
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
