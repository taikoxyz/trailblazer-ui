<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import ActionButton from '$components/Button/ActionButton.svelte';

  export let trailNumber: string;
  export let title: string;
  export let description: string;
  export let href: string;
  export let buttonText: string;

  export let images: {
    content: {
      xl: string;
      lg: string;
      md: string;
      sm: string;
    };
    background: {
      xl: string;
      lg: string;
      md: string;
      sm: string;
    };
  };

  let backgroundImageUrl = images.background.sm;

  function updateBackgroundImage() {
    if (window.innerWidth >= 1440) {
      backgroundImageUrl = images.background.xl;
    } else if (window.innerWidth >= 1280) {
      backgroundImageUrl = images.background.lg;
    } else if (window.innerWidth >= 1024) {
      backgroundImageUrl = images.background.md;
    } else {
      backgroundImageUrl = images.background.sm;
    }
  }

  onMount(() => {
    updateBackgroundImage();
    window.addEventListener('resize', updateBackgroundImage);
    return () => {
      window.removeEventListener('resize', updateBackgroundImage);
    };
  });
</script>

<!-- Desktop -->
<div class="container w-full h-auto px-[20px] xl:px-[57px] relative">
  <div
    class="w-full relative rounded-3xl bg-cover overflow-hidden"
    style="background-image: url({backgroundImageUrl});">
    <div class="flex flex-col w-full md:flex-row items-center h-full">
      <!-- Desktop -->
      <div class="min-h-[250px] w-3/12 min-w-[430px] relative justify-center items-left hidden lg:hidden xl:block">
        <img src={images.content.xl} alt={title} class="hidden sm:hidden md:hidden lg:hidden xl:block" />
      </div>
      <!-- Laptop (lg) -->
      <div class="f-col h-full relative hidden sm:hidden md:hidden lg:block xl:hidden">
        <img src={images.content.lg} alt={title} class="hidden sm:hidden md:hidden lg:block xl:hidden" />
      </div>
      <!-- Tablet (md) -->
      <div class="f-col h-full relative hidden sm:hidden md:block lg:hidden">
        <img src={images.content.md} alt={title} class="hidden sm:hidden md:block lg:hidden xl:hidden" />
      </div>
      <!-- Mobile (sm) -->
      <div class="f-col h-full relative block md:hidden">
        <img src={images.content.sm} alt={title} />
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-2 lg:gap-[34px] xl:gap-[59px] md:px-[60px] pt-[40px] pb-[15px] md:py-5 w-fit justify-self-start items-center space-y-[32px] lg:space-y-0 text-center md:text-start">
        <!-- Column 1 -->
        <div class="f-col h-full gap-4 items-center md:items-start">
          <div class="f-col justify-center text-center pill min-h-[35px] px-[5px]">
            <span class="line-height-[150%]">{$t('common.trail')} {trailNumber}</span>
          </div>
          <span
            class="text-[40px]/[40px] xl:text-[45px]/[45px] font-clash-grotesk font-bold max-w-[316px] max-w-[360px]"
            >{title}</span>
        </div>

        <!-- Column 2 -->
        <div class="f-col h-full justify-center">
          <div class="f-col w-full space-y-[32px] items-center md:items-start">
            <span class="text-body-regular max-w-[315px]">{description}</span>
            <ActionButton {href} priority="primary" class="!w-[140px]">{buttonText}</ActionButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .pill {
    width: 90px;
    border-radius: 1000px;
    border: 1px solid var(--border-dark-divider-default, #444a55);
    background: var(
      --background-dark-gradient,
      linear-gradient(204deg, rgba(93, 99, 111, 0.1) -5.09%, rgba(25, 30, 40, 0.2) 78.97%)
    );

    /* bg-blur/20% */
    backdrop-filter: blur(10px);
  }
</style>
