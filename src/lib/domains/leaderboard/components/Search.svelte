<script lang="ts">
  import { SearchIcon } from '$shared/components/Icon';
  import { InputBox } from '$shared/components/InputBox';
  import { debounce } from '$shared/utils/debounce';

  export let onSearch: (value: string) => void;
  export let placeholder = 'Search...';
  export let className = '';
  let value = '';

  const debouncedOnSearch = debounce(onSearch, 300);

  function handleInputChange() {
    debouncedOnSearch(value);
  }
</script>

<div class={`relative f-items-center w-full ${className}`}>
  <InputBox
    {placeholder}
    bind:value
    on:input={handleInputChange}
    class="min-h-[64px] pl-[15px] w-full border-0 h-full z-20 uppercase rounded-full" />
  <div class="max-button absolute right-6 text-tertiary-content z-20">
    <SearchIcon />
  </div>
</div>
