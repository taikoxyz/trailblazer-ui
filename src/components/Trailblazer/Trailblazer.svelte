<script>
  import Carousel from '$components/Carousel/Carousel.svelte';
</script>

<div class="flex flex-col w-full items-center gap-8">
  <!-- Section 1 -->
  <div
    class="w-full max-w-section rounded-3xl bg-grey-10 flex flex-col justify-center items-center pt-[120px] pb-[110px] gap-[54px]">
    <div class="flex flex-col gap-[11px]">
      <div class="skeleton w-[754.5px] h-[108.48px] rounded-none"></div>
      <div class="skeleton w-[754.5px] h-[108.48px] rounded-none"></div>
    </div>

    <div class="flex flex-col gap-[11px]">
      <div class="skeleton w-[473.75px] h-[14.48px] rounded-none"></div>
      <div class="skeleton w-[473.75px] h-[14.48px] rounded-none"></div>
    </div>

    <div class="flex gap-[14px]">
      <div class="skeleton w-[140px] h-[48px] rounded-full"></div>
      <div class="skeleton w-[140px] h-[48px] rounded-full"></div>
    </div>
  </div>

  <!-- Section 2 -->
  <div
    class=" max-w-section w-full rounded-3xl bg-none flex flex-col justify-center items-center pt-[120px] pb-[110px] gap-[54px]">
    <div class="skeleton w-[434px] h-[38.56px] rounded-none"></div>

    <div class="flex flex-col gap-[11px]">
      <div class="skeleton w-[473.75px] h-[14.48px] rounded-none"></div>
      <div class="skeleton w-[473.75px] h-[14.48px] rounded-none"></div>
    </div>

    <div class="skeleton w-[140px] h-[48px] rounded-full"></div>
  </div>

  <!-- Section 3 -->
  <div
    class=" max-w-section w-full h-[929.746px] rounded-3xl bg-gradient-to-t from-grey-10/100 to-grey-10/0 flex flex-col justify-center items-center pt-[120px] pb-[110px] gap-[54px]">
  </div>

  <!-- Carousel Section -->
  <div class="max-w-section justify-start items-start w-full">
    <div class="skeleton w-[434px] h-[38.56px] rounded-none"></div>
  </div>

  <div class=" w-full flex flex-col items-start gap-8 overflow-visible">
    <Carousel />
  </div>
  <!-- Section 3 -->
  <div
    class=" max-w-section w-full h-[929.746px] rounded-3xl bg-gradient-to-t from-grey-10/100 to-grey-10/0 flex flex-col justify-center items-center pt-[120px] pb-[110px] gap-[54px]">
  </div>

  <!-- Rank Session -->
  <div
    class=" max-w-section w-full h-[929.746px] rounded-3xl bg-gradient-to-t from-grey-10/100 to-grey-10/0 flex flex-col justify-center items-center pt-[120px] pb-[110px] gap-[54px]">
  </div>

  <!-- Footer -->
  <div
    class="max-w-section w-full h-[929.746px] rounded-3xl bg-gradient-to-t from-grey-10/100 to-grey-10/0 flex flex-col justify-center items-center pt-[120px] pb-[110px] gap-[54px]">
  </div>
</div>
