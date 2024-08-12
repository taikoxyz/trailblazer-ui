<script lang="ts">
  export let src: string;
</script>

<div class="relative w-full h-full z-0">
  <img {src} alt={src} class="pointer-events-none rounded-[20px] absolute left-0 top-0 z-20 w-full" />
</div>
