<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import { FactionsGallery } from '$components/FactionsGallery';
  import Icon from '$components/Icon/Icon.svelte';
  import Title from '$components/Title/Title.svelte';

  import { DividerElement } from '../DividerElement';

  const handleFactionsButton = () => {
    goto('/about');
  };
  let carouselRef: InstanceType<typeof FactionsGallery>;

  function scrollLeft() {
    carouselRef.scrollLeft(); // Accessing the function on the child
  }

  function scrollRight() {
    carouselRef.scrollRight(); // Accessing the function on the child
  }
</script>

<!-- Taiko Faction -->
<div class="flex flex-col container bg-base-200 rounded-t-[30px] rounded-b-none">
  <div class="flex flex-col container lg:h-[413px] justify-center">
    <div class="f-center flex-col md:flex-row gap-[200px]">
      <!-- Title text: Unlock your potential -->
      <div class="lg:w-[562px] lg:h-[225px] flex flex-col justify-between">
        <div class="w-full text-center xl:text-left mb-[40px]">
          <span class="text-primary-base-content font-clash-grotesk text-[20px]">Unlock your potential</span>
          <!-- Underline -->
          <div class="w-[60px] h-[3px] bg-primary-brand mt-[10px]"></div>
        </div>

        <!-- Title text: Taiko Factions -->
        <Title class="text-primary !text-[57px]" width="full">
          Taiko <span class="text-primary-base-content">Factions</span>
        </Title>

        <!-- Sub text: Updated to match the new description styling -->
        <div class="w-full f-col mt-[16px]">
          <div class="body-regular text-primary-base-content text-center md:text-left">
            A groundbreaking cast of characters emerges to enrich our community and deepen the immersive experience.
            Meet eight distinct factions, each with its own unique character and flair.
          </div>
        </div>
      </div>

      <!-- Carousel buttons -->
      <div class="flex gap-4 justify-center xl:justify-end h-full bottom-0 items-end">
        <button class="f-center btn-circle border border-primary-brand" on:click={scrollLeft}>
          <Icon class="-translate-x-[2px]" type="chevron-left" />
        </button>
        <button
          class="f-center btn-circle bg-primary-brand border-primary-brand hover:bg-primary-interactive-hover"
          on:click={scrollRight}>
          <Icon class="translate-x-[2px]" type="chevron-right" />
        </button>
      </div>
    </div>
  </div>

  <FactionsGallery bind:this={carouselRef} />
  <div class="mt-[50px] f-center flex-col mb-[47px] w-[504px] m-auto ml-72">
    <div class="max-w-[700px]">
      <Title class=" my-[40px] !max-w-full !w-full">
        <span class="text-primary-base-content text-[57px] leading-10"
          >Start earning factions through weekly trails</span>
      </Title>
      <div class="xl:text-left text-secondary-content max-w-[482px] text-center mb-[40px]">
        To earn Taiko Faction Badges, participants must complete specific weekly challenges outlined in the
        Trailblazers: Call of Taiko campaign.
      </div>
      <ActionButton priority="primary" class="md:w-[240px] w-full" on:click={handleFactionsButton}
        >{$t('buttons.factions.learn_about')}</ActionButton>
    </div>
  </div>
  <div class="w-full">
    <DividerElement />
  </div>
</div>
