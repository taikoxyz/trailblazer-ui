<script lang="ts">
  import {MOCK_FACTION_GALLERY} from "$mocks"


    export let items: GalleryItems[] = MOCK_FACTION_GALLERY;


</script>

<div class="f-center container px-16 py-16 gap-2">
  <!-- Cards -->
  {#each items as item, i}
  <div class="avatar max-w-full min-w-0 card">
    <div class="rounded-[30px] h-[400px] ">
      <img class="" src={item.image}/>
    </div>
  </div>

  {/each}
</div>

<style>

  .card {
    width: 100%;
    min-height: 400px;
    transition: width 0.1s ease-in-out;
  }

  .card:hover {
    width: 200%; /* Increase the width to 120% of its original size on hover */
  }

</style>
