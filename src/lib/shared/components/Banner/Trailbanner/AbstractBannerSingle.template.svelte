<script lang="ts">
  import { t } from 'svelte-i18n';

  import ActionButton from '$shared/components/Button/ActionButton.svelte';

  export let trailNumber: string;
  export let title: string;
  export let description: string;
  export let href: string;
  export let buttonText: string;

  export let style: 'single' | 'double' = 'single';

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
</script>

<!-- Desktop -->
{#if style === 'double'}
  <div class="container h-auto px-[20px] xl:px-[57px] relative xl:flex hidden">
    <div
      class="w-full relative rounded-[30px] max-h-[250px] bg-cover overflow-hidden"
      style="background-image: url({images.background.xl});">
      <div class="flex items-center h-full">
        <div class="min-h-[250px] w-3/12 min-w-[430px] relative justify-center items-left">
          <img src={images.content.xl} alt={title} />
        </div>
        <div class="f-col w-5/12 h-full py-[32px] max-w-[508px] gap-4 ml-[60px]">
          <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[5px] borde fill0">
            <span class="line-height-[150%]">{$t('common.trail')} {trailNumber}</span>
          </div>
          <span class="text-[45px] leading-[45px] font-clash-grotesk font-bold">{title}</span>
        </div>
        <div class="f-col w-4/12 mx-[60px] h-full justify-center">
          <div class="f-col w-full gap-3 space-y-[32px]">
            <span class="text-body-regular max-w-[315px]">{description}</span>
            <ActionButton {href} priority="primary" class="!w-[140px]">{buttonText}</ActionButton>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="container h-auto px-[20px] xl:px-[57px] relative xl:flex hidden">
    <div
      class="w-full relative rounded-[30px] h-[250px] bg-cover overflow-hidden"
      style="background-image: url({images.background.xl});">
      <div class="flex justify-center items-center space-x-[60px] h-full">
        <div class="flex flex-col h-full w-1/2 relative justify-center items-center">
          <img src={images.content.xl} alt={title} class="min-w-[540px]" />
        </div>
        <div class="flex flex-col w-1/2 h-full py-[32px] max-w-[508px] gap-4">
          <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[5px] borde fill0">
            <span class="line-height-[150%]">{$t('common.trail')} {trailNumber}</span>
          </div>
          <span class="text-[55px] xl:text-[55px] leading-[55px] font-clash-grotesk font-bold">{title}</span>
          <div class="flex w-full gap-3">
            <span class="text-body-regular max-w-[315px]">{description}</span>
            <ActionButton {href} priority="primary" class="!w-[140px]">{buttonText}</ActionButton>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
<!-- Laptop -->
{#if style === 'double'}
  <div class="container h-auto px-[20px] xl:px-[57px] relative lg:flex xl:hidden hidden">
    <div
      class="w-full relative rounded-[30px] h-[427px] bg-cover overflow-hidden"
      style="background-image: url({images.background.lg});">
      <div class="flex justify-center items-center h-full space-x-[72px]">
        <div class="f-col h-full grow w-1/4 relative">
          <img src={images.content.lg} alt={title} class="min-w-[364px] absolute right-[-15px] top-[-30px]" />
        </div>
        <div class="flex flex-col w-3/4 h-full py-[32px] pr-[25px]">
          <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[5px] borde fill0">
            <span class="line-height-[150%]">{$t('common.trail')} {trailNumber}</span>
          </div>
          <span class="xl:text-[45px] leading-[45px] font-clash-grotesk font-bold mt-[20px] mb-[25px]">{title}</span>
          <span class="mb-[32px]">{description}</span>
          <ActionButton {href} priority="primary" class="!w-[140px] !max-h-[48px]">{buttonText}</ActionButton>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="container h-auto px-[20px] relative lg:flex xl:hidden hidden">
    <div
      class="w-full relative rounded-[30px] h-[300px] bg-cover overflow-hidden pt-[50px]"
      style="background-image: url({images.background.lg});">
      <div class="f-row justify-center items-center h-full pr-[65px] space-x-[60px]">
        <div class="f-col h-full relative w-2/12 justify-center min-w-[260px]">
          <img src={images.content.lg} alt={title} />
        </div>
        <div class="f-col w-full h-full w-10/12 justify-center">
          <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[5px]">
            <span class="line-height-[150%]">{$t('common.trail')} {trailNumber}</span>
          </div>
          <span class="f-row w-full text-[55px] leading-[55px] font-clash-grotesk font-bold mt-[20px] mb-[25px]"
            >{title}</span>
          <div class="f-row w-full gap-[28px]">
            <span class="mb-[32px]">{description}</span>
            <ActionButton {href} priority="primary" class="!min-w-[140px] !max-h-[48px]">{buttonText}</ActionButton>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Tablet -->
{#if style === 'double'}
  <div class="container h-auto px-[20px] xl:px-[57px] relative md:flex lg:hidden hidden">
    <div
      class="w-full relative rounded-[30px] h-[427px] bg-cover overflow-hidden"
      style="background-image: url({images.background.lg});">
      <div class="flex justify-center items-center h-full space-x-[72px]">
        <div class="f-col h-full grow w-1/4 relative">
          <img src={images.content.lg} alt={title} class="min-w-[364px] absolute right-[-15px] top-[-30px]" />
        </div>
        <div class="flex flex-col w-3/4 h-full py-[32px] pr-[25px]">
          <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[5px] borde fill0">
            <span class="line-height-[150%]">{$t('common.trail')} {trailNumber}</span>
          </div>
          <span class="xl:text-[45px] leading-[45px] font-clash-grotesk font-bold mt-[20px] mb-[25px]">{title}</span>
          <span class="mb-[32px]">{description}</span>
          <ActionButton {href} priority="primary" class="!w-[140px] !max-h-[48px]">{buttonText}</ActionButton>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="container h-auto px-[20px] relative md:flex lg:hidden hidden">
    <div
      class="w-full relative rounded-[30px] h-[427px] bg-cover overflow-hidden pt-[50px]"
      style="background-image: url({images.background.md});">
      <div class="f-col justify-center items-center h-full px-[65px]">
        <div class="f-col h-full relative">
          <img src={images.content.md} alt={title} class="min-w-[364px]" />
        </div>
        <div class="f-col w-full h-full">
          <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[5px]">
            <span class="line-height-[150%]">{$t('common.trail')} {trailNumber}</span>
          </div>
          <span class="text-[55px] leading-[55px] font-clash-grotesk font-bold mt-[20px] mb-[25px]">{title}</span>
          <div class="f-row w-full gap-[28px]">
            <span class="mb-[32px]">{description}</span>
            <ActionButton {href} priority="primary" class="!min-w-[140px] !max-h-[48px]">{buttonText}</ActionButton>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Mobile -->
<div class="container h-auto px-[20px] xl:px-[57px] min-h-[645px] relative sm:flex md:hidden">
  <div
    class="w-full relative rounded-[30px] h-full bg-cover overflow-hidden"
    style="background-image: url({images.background.sm});">
    <div class="grid grid-cols-1 place-content-between h-full">
      <div class="f-col w-full relative">
        <img src={images.content.sm} alt={title} class="" />
      </div>
      <div class="f-col justify-center items-center w-full] px-[30px]">
        <div class="f-col justify-center text-center pill min-h-[35px] px-[5px] my-[20px]">
          <span class="line-height-[150%]">{$t('common.trail')} {trailNumber}</span>
        </div>
        <span
          class="flex text-[55px] text-center xl:text-[45px] leading-[45px] font-clash-grotesk font-bold mt-[20px] mb-[30px]"
          >{title}</span>
        <span class="flex mb-[30px] text-center">{description}</span>
      </div>
      <div class="flex mb-[15px] w-full self-end px-[30px]">
        <ActionButton {href} priority="primary" class="w-full !max-h-[48px]">{buttonText}</ActionButton>
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
