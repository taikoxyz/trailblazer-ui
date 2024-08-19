<script lang="ts">
  import { t } from 'svelte-i18n';

  import ActionButton from '$components/Button/ActionButton.svelte';
  import { classNames } from '$libs/util/classNames';

  export let trailNumber = '8';
  export let title = $t('trailbanner.stargate.title');
  export let description = $t('trailbanner.stargate.description');
  export let href = 'https://taiko.mirror.xyz/8-8mdHJKlP0sZACfEb666CTctTHbhbV47U4b2-5DHpQ';
  export let buttonText = $t('common.learn_more');

  export let images: {
    content: {
      xl: string;
      lg: string;
      md: string;
      sm: string;
    };
  } = {
    content: {
      xl: '/trailbanner/stargate/xl/icons.png',
      lg: '/trailbanner/stargate/lg/icons.png',
      md: '/trailbanner/stargate/md/icons.png',
      sm: '/trailbanner/stargate/sm/icons.png',
    },
  };

  const wrapperClasses = classNames(
    'container',
    'w-full',
    'h-auto',

    'relative',
  );
  const innerWrapperClasses = classNames(
    'w-full',
    'bg-secondary',
    'rounded-[30px]',
    'border-white',
    'border',
    'border-[5px]',
    'relative',
    'rounded-3xl',
    'bg-cover',

    'overflow-hidden',
  );
  const bannerWrapperClasses = classNames(
    'flex',
    'flex-col',
    'w-full',
    'md:px-[30px]',
    'lg:px-0',
    'md:flex-row',
    'items-center',
    'h-full',
  );

  const xlImageWrapperClasses = classNames(
    'h-full',
    'relative',
    'justify-end',
    'items-left',
    'hidden',
    'lg:hidden',
    'xl:block',
  );

  const xlImageClasses = classNames('h-full', 'hidden', 'sm:hidden', 'md:hidden', 'lg:hidden', 'xl:block');

  const lgImageWrapperClasses = classNames(
    'f-col',
    'h-full',
    'relative',
    'hidden',
    'sm:hidden',
    'md:hidden',
    'lg:block',
    'xl:hidden',
  );

  const lgImageClasses = classNames('hidden', 'sm:hidden', 'md:hidden', 'lg:block', 'xl:hidden');

  const mdImageWrapperClasses = classNames(
    'f-col',
    'h-full',
    'relative',
    'hidden',
    'sm:hidden',
    'md:block',
    'lg:hidden',
  );

  const mdImageClasses = classNames('hidden', 'sm:hidden', 'md:block', 'lg:hidden', 'xl:hidden');

  const smImageWrapperClasses = classNames('f-col', 'w-full', 'relative', 'block', 'md:hidden');

  const contentGridClasses = classNames(
    'grid',
    'grid-cols-1',
    'lg:grid-cols-2',
    'lg:gap-[34px]',
    'md:pl-[61px]',
    'pt-[40px]',
    'pb-[15px]',
    'md:py-5',
    'w-fit',
    'justify-self-start',
    'items-center',
    'space-y-[32px]',
    'lg:space-y-0',
    'text-center',
    'md:text-start',
  );

  const titleColClasses = classNames('f-col', 'h-full', 'gap-4', 'items-center', 'md:items-start');

  const trailWrapperClasses = classNames('f-col', 'justify-center', 'text-center', 'pill', 'min-h-[35px]', 'px-[5px]');

  const titleClasses = classNames(
    'text-[40px]/[40px]',
    'xl:text-[45px]/[45px]',
    'font-clash-grotesk',
    'font-bold',
    'max-w-[316px]',
    'max-w-[360px]',
  );

  const descriptionColClasses = classNames('f-col', 'h-full', 'justify-center');

  const descriptionWrapperClasses = classNames('f-col', 'w-full', 'space-y-[32px]', 'items-center', 'md:items-start');

  const descriptionClasses = classNames('text-body-regular', 'max-w-[315px]');

  const actionButtonClasses = classNames(
    '!w-[140px]',
    'bg-white',
    '!text-[#191E28]',
    'border-transparent',
    'hover:bg-primary',
    'hover:border-white',
    'hover:!text-white',
  );
</script>

<!-- Desktop -->
<div class={wrapperClasses}>
  <div class={innerWrapperClasses}>
    <div class={bannerWrapperClasses}>
      <!-- Desktop -->
      <div class={xlImageWrapperClasses}>
        <img src={images.content.xl} alt={title} class={xlImageClasses} />
      </div>
      <!-- Laptop (lg) -->
      <div class={lgImageWrapperClasses}>
        <img src={images.content.lg} alt={title} class={lgImageClasses} />
      </div>
      <!-- Tablet (md) -->
      <div class={mdImageWrapperClasses}>
        <img src={images.content.md} alt={title} class={mdImageClasses} />
      </div>
      <!-- Mobile (sm) -->
      <div class={smImageWrapperClasses}>
        <img src={images.content.sm} alt={title} />
      </div>

      <div class={contentGridClasses}>
        <div class={titleColClasses}>
          <div class={trailWrapperClasses}>
            <span class="line-height-[150%]">{$t('common.trail')} {trailNumber}</span>
          </div>
          <span class={titleClasses}>{title}</span>
        </div>

        <div class={descriptionColClasses}>
          <div class={descriptionWrapperClasses}>
            <span class={descriptionClasses}>{description}</span>
            <ActionButton {href} priority="secondary" class={actionButtonClasses}>{buttonText}</ActionButton>
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
    border: 1px solid white;
    background: var(
      --background-dark-gradient,
      linear-gradient(204deg, rgba(93, 99, 111, 0.1) -5.09%, rgba(25, 30, 40, 0.2) 78.97%)
    );

    /* bg-blur/20% */
    backdrop-filter: blur(10px);
  }
</style>
