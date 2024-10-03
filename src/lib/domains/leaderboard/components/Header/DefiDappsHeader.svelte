<script>
  import BottomPinkSVG from './BottomPinkSVG.svelte';
  import CirclesSVG from './CirclesSVG.svelte';
</script>

<div class="relative w-full bg-primary-link-hover p-8 lg:p-12 rounded-[21.6px] lg:rounded-[30px] overflow-hidden">
  <div
    class="font-clash-grotesk text-[45px]/[45px] lg:text-[60px]/[60px] leading-none text-primary-base-content z-10 relative">
    <span class="text-secondary">Defi<br /></span> Leaderboard
  </div>

  <CirclesSVG />
  <BottomPinkSVG />

  <img
    src="/banner/taiko-coin.svg"
    alt="Taiko Coin"
    class="absolute top-[25px] lg:top-[30.41px] left-[310px] sm:left-[517.2px] lg:left-auto lg:right-[160px] lg:size-[130px]" />
</div>
