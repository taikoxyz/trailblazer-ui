<script lang="ts">
  import { onMount } from 'svelte';

  import Icon from '$shared/components/Icon/Icon.svelte';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';

  import { ecosystemService } from '../service/EcosystemServiceInstance';
  import EcosystemItem from './EcosystemItem.svelte';
  import type { IEcosystemPartner } from './partners';

  const wrapperClasses = classNames('flex', 'w-full', 'flex-col', 'gap-[20px]');
  const gridClasses = classNames(
    'grid',
    'grid-cols-1',
    'md:grid-cols-2',
    'lg:grid-cols-3',
    'xl:grid-cols-4',
    'gap-[18px]',
  );
  const filterRowClasses = classNames(
    'flex',
    'md:flex-row',
    'justify-between',
    'items-center',
    'w-full',
    'gap-[20px]',
    'flex-col',
  );
  const filterInputWrapperClasses = classNames(
    'lg:w-[40vw]',
    'md:w-1/2',
    'w-full',
    'relative',
    'flex',
    'items-center',
    'justify-center',
  );
  const filterInputClasses = classNames(
    'text-[12px]/[16px]',
    'font-[600]',
    'bg-elevated-background',
    'rounded-full',
    'px-[24px]',
    'py-[30px]',
    'w-full',
    'focus:text-[16px]/[20px]',
    'focus:outline-none',
    'focus:shadow-none',
  );
  const filterIconClasses = classNames('absolute', 'right-[30px]');
  const filterSelectClasses = classNames(
    'select',
    'w-full',
    'gap-[20px]',
    'lg:w-max',
    'md:w-1/2',
    'rounded-full',
    'bg-elevated-background',
    'h-full',
    'py-[24px]',
    'px-[27px]',
    'pr-[50px]',
  );

  $: filterText = '';

  $: entries = [] as IEcosystemPartner[];

  function onFilterTextChange() {
    // clear the category
    filterCategory = 'ALL CATEGORIES';

    if (filterText === '') {
      filteredPartners = entries;
    } else {
      filteredPartners = entries.filter((partner) => {
        const name = partner.name?.toLowerCase() || '';
        const description = partner.description?.toLowerCase() || '';
        const category = partner.category?.toLowerCase() || '';
        const filter = filterText.toLowerCase();

        return name.includes(filter) || description.includes(filter) || category.includes(filter);
      });
    }
  }

  $: filterText, onFilterTextChange();
  $: filteredPartners =
    filterCategory === 'ALL CATEGORIES'
      ? entries
      : entries.filter((partner) => partner.category && partner.category.toUpperCase() === filterCategory);

  $: filterCategory = 'ALL CATEGORIES';
  $: categories =
    entries.length > 0
      ? [
          'ALL CATEGORIES',
          ...new Set(entries.filter((partner) => partner.category).map((partner) => partner.category.toUpperCase())),
        ]
      : [];

  function onSelectCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;

    // clear the filter text
    filterText = '';
    if (category === 'ALL CATEGORIES') {
      filteredPartners = entries;
    } else {
      filteredPartners = entries.filter((partner) => partner.category && partner.category.toUpperCase() === category);
    }
    filterCategory = category;
  }

  onMount(async () => {
    entries = await ecosystemService.getEcosystemEntries($activeSeason);
  });
</script>

<div class={wrapperClasses}>
  <div class={filterRowClasses}>
    <div class={filterInputWrapperClasses}>
      <input bind:value={filterText} type="text" class={filterInputClasses} placeholder="SEARCH FOR PROJECTS..." />
      <Icon type="magnifying-glass" size={20} class={filterIconClasses} />
    </div>

    <select bind:value={filterCategory} class={filterSelectClasses} on:change={onSelectCategory}>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
  </div>
  <div class={gridClasses}>
    {#each filteredPartners as partner}
      <EcosystemItem data={partner} />
    {/each}
  </div>
</div>
