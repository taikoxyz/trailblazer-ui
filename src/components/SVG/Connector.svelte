<script lang="ts" context="module">
  export let size = 30; // Default size
  export let width: number = size; // You can now pass width and height as props, or they will default to size
  export let height: number = size;
  export let fillClass = 'fill-primary-icon';

  // Fixed viewBox
  const minX = 0;
  const minY = 0;
  export let vWidth = 30;
  export let vHeight = 30;
  const viewBox = `${minX} ${minY} ${vWidth} ${vHeight}`;
</script>

<svg {width} {height} class={$$props.class} {viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    class={fillClass}
    d="M0 0V0C8.38992 8.02514 21.6101 8.02514 30 0V0V30V30C21.7157 21.7157 8.28427 21.7157 0 30V30V0Z" />
</svg>
