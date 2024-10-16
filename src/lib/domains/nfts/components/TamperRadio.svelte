<script lang="ts">
  import { classNames } from '$libs/util/classNames';
  import { createEventDispatcher } from 'svelte';
  import { blur } from 'svelte/transition';

  const wrapperClasses = classNames('radio radio-secondary border-secondary checked:shadow-none!');

  const centerClasses = classNames('w-[15px]', 'h-[15px]', 'bg-[#E81899]', 'rounded-full');

  export let checked = false;
  export let name: string = 'radio-group';

  const dispatch = createEventDispatcher();

  function onChange() {
    //selected = !selected
    dispatch('change');
  }
</script>

<input type="radio" on:change={onChange} {name} class={wrapperClasses} {checked} />
