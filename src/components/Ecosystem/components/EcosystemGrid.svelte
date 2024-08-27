<script lang="ts">
  import Icon from '$components/Icon/Icon.svelte';
  import { classNames } from '$libs/util/classNames';

  import EcosystemPartners from '../partners';
  import EcosystemItem from './EcosystemItem.svelte';

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
    'bg-[#191E28]',
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
    'bg-[#191E28]',
    'h-full',
    'py-[24px]',
    'px-[27px]',
    'pr-[50px]',
  );

  $: filterText = '';

  function onFilterTextChange() {
    // clear the category
    filterCategory = 'ALL CATEGORIES';

    if (filterText === '') {
      filteredPartners = EcosystemPartners;
    } else {
      filteredPartners = EcosystemPartners.filter((partner) => {
        return (
          partner.name.toLowerCase().includes(filterText.toLowerCase()) ||
          partner.description.toLowerCase().includes(filterText.toLowerCase()) ||
          partner.category.toLowerCase().includes(filterText.toLowerCase())
        );
      });
    }
  }

  $: filterText, onFilterTextChange();
  let filteredPartners = EcosystemPartners;

  $: filterCategory = 'ALL CATEGORIES';
  $: categories = ['ALL CATEGORIES', ...new Set(EcosystemPartners.map((partner) => partner.category.toUpperCase()))];

  function onSelectCategory(category: string) {
    // clear the filter text
    filterText = '';
    if (category === 'ALL CATEGORIES') {
      filteredPartners = EcosystemPartners;
    } else {
      filteredPartners = EcosystemPartners.filter((partner) => partner.category.toUpperCase() === category);
    }

    filterCategory = category;
  }
</script>

<div class={wrapperClasses}>
  <div class={filterRowClasses}>
    <div class={filterInputWrapperClasses}>
      <input bind:value={filterText} type="text" class={filterInputClasses} placeholder="SEARCH FOR PROJECTS..." />
      <Icon type="magnifying-glass" size={20} class={filterIconClasses} />
    </div>

    <select value={filterCategory} class={filterSelectClasses}>
      {#each categories as category}
        <option value={category} on:click={() => onSelectCategory(category)}>{category}</option>
      {/each}
    </select>
  </div>
  <div class={gridClasses}>
    {#each filteredPartners as partner}
      <EcosystemItem data={partner} />
    {/each}
  </div>
</div>
