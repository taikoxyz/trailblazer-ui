<script lang="ts">
  import { Icon } from '$components/Icon';

  let carousel: HTMLDivElement;

  function scrollLeft() {
    // Scrolls the carousel to the left
    carousel.scrollBy({ left: -600, behavior: 'smooth' }); // Adjust -300 to the size of your carousel items or desired scroll amount
  }

  function scrollRight() {
    // Scrolls the carousel to the right
    carousel.scrollBy({ left: 600, behavior: 'smooth' }); // Adjust 300 similarly
  }
</script>

<div class="flex w-full justify-center items-center gap-[12.25px]">
  <button on:click={scrollLeft} class="btn btn-circle bg-elevated-background">
    <Icon type="chevron-left" class="-translate-x-[2px]"></Icon>
  </button>
  <div bind:this={carousel} class="carousel w-full overflow-scroll rounded-box gap-8 max-w-[1362px]">
    <div class="min-w-[364px] bg-orange-400 rounded-3xl">
      <img src="/placeholder.png" alt="avatar" />
    </div>
    <div class="skeleton size-[364px] min-w-[364px]"></div>
    <div class="skeleton size-[364px] min-w-[364px]"></div>
    <div class="skeleton size-[364px] min-w-[364px]"></div>
    <div class="skeleton size-[364px] min-w-[364px]"></div>
    <div class="skeleton size-[364px] min-w-[364px]"></div>
  </div>
  <button on:click={scrollRight} class="btn btn-circle bg-elevated-background flex items-center justify-center">
    <Icon type="chevron-right" class="translate-x-[2px]"></Icon>
  </button>
</div>
