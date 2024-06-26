<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import { FactionsGallery } from '$components/FactionsGallery';
  import Title from '$components/Title/Title.svelte';
  import { Icon } from '$components/Icon';

  const handleFactionsButton = () => {
    goto('/about');
  };

  let carouselElement: HTMLDivElement;

  function scrollLeft() {
    carouselElement.scrollBy({ left: -1200, behavior: 'smooth' }); // Adjust -300 to the size of your carousel items or desired scroll amount
  }

  function scrollRight() {
    carouselElement.scrollBy({ left: 1200, behavior: 'smooth' }); // Adjust 300 similarly
  }
</script>

<!-- Taiko Faction -->
<div class="flex flex-col container">
  <div class="f-center flex-col md:flex-row mb-[47px] space-y-[40px] xl:space-x-[88px] px-[20px] xl:px-0 xl:px-[57px]">
    <!-- Title text: Taiko Factions -->
    <Title>
      Taiko<br /><span class="text-base-content">Factions</span>
    </Title>

    <!-- Sub text: In the vibrant world of Neo Nakuz, a groundbreaking cast of characters is emerging, centered around the electrifying ecosystem of Taiko Radio and its dynamic cast of characters: ravers, drummers, masters and more. -->
    <div class="xl:max-w-[434px] md:w-1/2 f-col space-y-[40px]">
      <div class="title-body-regular text-secondary-content text-center xl:self-end max-w-[505px] md:text-left">
        {$t('factions.gallery.description')}
      </div>
      <ActionButton priority="primary" class="md:w-[240px] w-full" on:click={handleFactionsButton}
        >{$t('buttons.factions.learn_about')}</ActionButton>
    </div>
  </div>

  <div class="mb-[80px]">
    <div class="flex gap-4 justify-center xl:justify-end h-full bottom-0">
      <button class="f-center btn-circle border border-primary-brand" on:click={scrollLeft}>
        <Icon class="-translate-x-[2px]" type="chevron-left" />
      </button>
      <button
        class="f-center btn-circle bg-primary-brand border-primary-brand hover:bg-primary-interactive-hover"
        on:click={scrollRight}>
        <Icon class="translate-x-[2px]" type="chevron-right" />
      </button>
    </div>
    <FactionsGallery bind:carouselElement />
  </div>
  <div class="f-center flex-col mb-[47px] space-y-[40px] xl:space-x-[88px]">
    <div class="max-w-[700px]">
      <div class="w-full">
        <div class="xl:text-left text-center f-col items-center xl:items-start">
          <span class="text-xl font-clash-grotesk">Unlock your potential</span>
          <span class=" border-bottom border-2 border-primary w-[66px] mt-[20px]"></span>
        </div>
      </div>
      <Title class=" my-[40px] !max-w-full !w-full">
        <span class="text-base-content">Earn</span> factions
        <span class="text-base-content">through weekly trails</span>
      </Title>
      <div class="xl:text-left text-secondary-content max-w-[482px] text-center">
        To earn Taiko Faction Badges, participants must complete specific weekly challenges outlined in the
        Trailblazers: Call of Taiko campaign.
      </div>
    </div>
  </div>
</div>
