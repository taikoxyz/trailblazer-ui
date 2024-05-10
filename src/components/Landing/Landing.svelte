<script>
  import { FactionCollection } from '$components/Carousel';
  import Carousel from '$components/Carousel/Carousel.svelte';
  import Placeholder from '$images/placeholder.png';
</script>

<div class="flex flex-col w-full items-center gap-8">
  <h1>Week 1</h1>
  <div class="min-w-[364px] bg-orange-400 rounded-3xl">
    <img src={Placeholder} alt="avatar" />
  </div>
  <button class="btn btn-primary">Claim Week 1</button>
  <div></div>
  <div class="max-w-section w-full flex">
    <h1>Collection</h1>
  </div>

  <FactionCollection></FactionCollection>
</div>
