<script>
  export let width = 'w-1';
  export let height = 'h-1';
  export let bgColor = 'bg-gray-300';
  export let shineColor = 'bg-gray-100'; // Lighter color for the shine effect
</script>

<div class="relative overflow-hidden {width} {height} {bgColor} {$$props.class} rounded-full">
  <div
    class="absolute inset-0 transform {shineColor} "
    style="background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%); animation: skeleton 1s infinite; background-size: 200% 100%;">
  </div>
</div>

<style>
  @keyframes skeleton {
    from {
      background-position: 150%;
    }
    to {
      background-position: -50%;
    }
  }
</style>
