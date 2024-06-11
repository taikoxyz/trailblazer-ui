<script lang="ts">
  import type { NavigationData } from './types';

  export let children: NavigationData[] = [];
  export let navigation: NavigationData = {
    name: '',
    url: '/',
  };
</script>

{#if Object.keys(children).length > 0}
  <div class="dropdown dropdown-hover dropdown-bottom rounded-full lg:bg-container">
    <a
      class="hover:cursor-pointer rounded-full lg:bg-neutral-background lg:hover:bg-elevated-background px-[20px] py-[12px] f-center"
      href={navigation.url}>
      <div tabindex="0" role="button">{navigation.name} +</div>
    </a>
    <ul
      class="dropdown-delay dropdown-content bg-overlay-background opacity-100 -left-1/3 z-[1] menu p-4 mt-2 shadow rounded-box w-52 body-regular">
      {#each Object.entries(children) as [key, value]}
        <li>
          <a href={value.url} class="flex items-center gap-4">{value.name}</a>
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <a href={navigation.url}>
    <div
      class="hover:cursor-pointer rounded-full lg:bg-neutral-background lg:hover:bg-elevated-background px-[20px] py-[12px] f-center">
      {navigation.name}
    </div>
  </a>
{/if}
