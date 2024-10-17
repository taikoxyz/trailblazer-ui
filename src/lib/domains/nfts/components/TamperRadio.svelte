<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames('radio radio-secondary border-secondary checked:shadow-none!');

  export let checked = false;
  export let name: string = 'radio-group';

  const dispatch = createEventDispatcher();

  function onChange() {
    dispatch('change');
  }
</script>

<input type="radio" on:change={onChange} {name} class={wrapperClasses} {checked} />
