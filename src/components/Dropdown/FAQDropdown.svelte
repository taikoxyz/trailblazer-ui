<script lang="ts">
  import { slide } from 'svelte/transition';

  export let question: string = 'Placeholder Preview Text';
  export let answer: string = 'Placeholder FAQ Text';

  let isOpen = false;

  function toggleDropdown() {
    isOpen = !isOpen;
  }
</script>

<div
  class=" flex flex-col w-full py-[42.5px] px-[36px] bg-neutral-background box-border items-start text-left justify-start rounded-[20px]">
  <button class="flex justify-between items-center text-left cursor-pointer w-full" on:click={toggleDropdown}>
    <div class="font-clash-grotesk text-[26px]/[32px] body-regular">{question}</div>
    <div class="icon" class:open={isOpen}>+</div>
  </button>
  {#if isOpen}
    <div class="p-1 w-full mt-8" transition:slide>
      <!-- Dropdown content goes here -->
      <p class="body-regular">{answer}</p>
    </div>
  {/if}
</div>

<style>
  .icon {
    display: inline-block;
    font-size: 2rem;
    line-height: 1rem;

    transition: transform 0.3s ease;
  }

  .icon.open {
    transform: rotate(45deg); /* Plus icon turns into a 'x' */
  }
</style>
