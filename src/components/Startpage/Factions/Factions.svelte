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
<div class="flex flex-col w-screen bg-base-200 rounded-t-[30px] rounded-b-none">
  <div class="flex flex-col w-screen lg:h-[413px] justify-center">
    <div class="f-center flex-col lg:flex-row gap-[100px] px-8">
      <!-- Title text: Unlock your potential -->
      <div class="lg:w-[562px] md:w-[402px] md:pt-10 flex flex-col justify-between">
        <div class="w-full xl:text-left mb-[40px] md:pt-10 md:w-[189px] pt-8 w-[100px]">
          <span class="text-primary-base-content font-clash-grotesk text-[20px]">Unlock your potential</span>
          <!-- Underline -->
          <div class="w-[60px] h-[3px] bg-primary-brand mt-[10px]"></div>
        </div>

        <!-- Title text: Taiko Factions -->
        <Title class="text-primary !text-[57px]" center="left" width="full">
          Taiko <span class="text-primary-base-content">Factions</span>
        </Title>

        <!-- Sub text: Updated to match the new description styling -->
        <div class="w-full f-col mt-12">
          <div class="body-regular text-primary-base-content text-left">
            A groundbreaking cast of characters emerges to enrich our community and deepen the immersive experience.
            Meet eight distinct factions, each with its own unique character and flair.
          </div>
        </div>
      </div>

      <!-- Carousel buttons -->
      <div
        class="flex gap-4 md:w-[402px] md:justify-start md:mb-2 justify-center xl:justify-end h-full bottom-0 items-end">
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
  <div class="mt-[50px] f-center flex-col mb-[47px] xl:w-[504px] m-auto xl:ml-72 px-8">
    <div class="max-w-[700px]">
      <Title class="my-[40px] !max-w-full !w-full" center="left">
        <span class="text-primary-base-content text-[40px] !leading-4 md:text-[57px]"
          >Start earning factions through weekly trails</span>
      </Title>
      <div class="xl:text-left text-secondary-content max-w-[482px] mb-[40px]">
        To earn Taiko Faction Badges, participants must complete specific weekly challenges outlined in the
        Trailblazers: Call of Taiko campaign.
      </div>
      <ActionButton priority="primary" class="w-[240px] w-full" on:click={handleFactionsButton}
        >{$t('buttons.factions.learn_about')}</ActionButton>
    </div>
  </div>
  <div class="w-full">
    <DividerElement />
  </div>
</div>
