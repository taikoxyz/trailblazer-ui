<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  import { newsEntries } from './newsEntries';
  import NewsEntry from './NewsEntry.svelte';

  const cardClasses = classNames(
    'card',
    'rounded-[20px]',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'h-full',
    'max-h-[366px]',
    'xl:w-[304px]',
    'h-[366px]',
    'p-[24px]',
    'gap-[16px]',
    $$props.class,
  );

  const titleClasses = classNames('font-bold', 'leading-normal');

  const activitiesWrapper = classNames('f-col', 'gap-[12px]', 'overflow-scroll', 'h-[290px]');
  const featuredActivityWrapper = classNames('f-col');
</script>

<div class={cardClasses}>
  <div class={titleClasses}>Latest news</div>
  <div class={featuredActivityWrapper}>
    {#each newsEntries as entry}
      {#if entry.featured}
        <NewsEntry {entry} />
      {/if}
    {/each}
  </div>
  <div class={activitiesWrapper}>
    {#each newsEntries as entry}
      {#if !entry.featured}
        <NewsEntry {entry} />
      {/if}
    {/each}
  </div>
</div>
