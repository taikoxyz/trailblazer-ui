<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from 'svelte-i18n';

  import { Icon } from '$components/Icon';
  import { classNames } from '$lib/shared/utils/classNames';

  export let currentPage = 1; // UI starts with page 1
  export let totalItems = 0;
  export let pageSize = 5;
  export let maxPages = 1;
  export let limitPages = false;

  $: totalPages = limitPages ? maxPages : Math.ceil(totalItems / pageSize);

  const dispatch = createEventDispatcher<{ pageChange: number }>();

  function goToPage(page: number) {
    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
    currentPage = page;
    dispatch('pageChange', page - 1);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      goToPage(currentPage);
    }
  }

  const btnClass = 'btn btn-xs btn-ghost';
</script>

<div class="pagination btn-group {$$props.class}">
  <button class={classNames(btnClass, currentPage === 1 ? 'invisible' : '')} on:click={() => goToPage(currentPage - 1)}>
    <Icon type="chevron-left" /></button>
  {$t('paginator.page')}
  <input
    type="number"
    class="form-control mx-1 text-center rounded-md py-1 px-8 bg-neutral-background"
    bind:value={currentPage}
    min={1}
    max={totalPages}
    on:keydown={handleKeydown}
    on:blur={() => goToPage(currentPage)} />
  {$t('paginator.of')}
  {totalPages}
  <button class={btnClass + (currentPage === totalPages ? ' invisible' : '')} on:click={() => goToPage(currentPage + 1)}
    ><Icon type="chevron-right" /></button>
</div>

<style>
  .pagination {
    justify-content: flex-end;
    align-items: flex-end;
    gap: 10px;
    display: flex;
    align-items: center;
  }
  .invisible {
    opacity: 0;
    pointer-events: none;
  }
</style>
