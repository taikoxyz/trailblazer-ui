<script lang="ts">
  import { t } from 'svelte-i18n';

  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { classNames } from '$shared/utils/classNames';
  import { isDesktop, isMobile, isTablet } from '$shared/utils/responsiveCheck';

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

  const wrapperClasses = classNames('container', '!text-grey-0', 'w-full', 'h-auto', 'relative');
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
    'lg:px-0',
    'md:flex-row',
    'items-center',
    'h-min',
    'md:pl-[30px]',
    'flex',
    'justify-start',

    'lg:h-fit',
  );

  const contentGridClasses = classNames(
    'flex',
    'flex-col',
    'lg:flex-row',
    'lg:gap-[34px]',
    'pb-[15px]',
    'md:py-5',
    'md:w-fit',
    'w-full',
    'justify-self-start',
    'items-center',
    'space-y-[32px]',
    'lg:space-y-0',
    'text-center',
    'md:text-start',
    'md:p-[44px]',
    'xl:py-0',
    'xl:gap-[59px]',
    'pt-[32px]',
    'md:pt-0',

    'px-[29px]',
    'md:px-0',
    'md:pl-[61px]',
    'lg:pl-[37px]',
  );

  const titleColClasses = classNames('f-col', 'w-full', 'h-full', 'gap-4', 'items-center', 'md:items-start');

  const trailWrapperClasses = classNames('f-col', 'justify-center', 'text-center', 'pill', 'min-h-[35px]', 'px-[5px]');

  const titleClasses = classNames(
    'text-[40px]/[40px]',
    'xl:text-[45px]/[45px]',
    'font-clash-grotesk',
    'font-bold',
    'w-full',
    'md:max-w-[316px]',
    'text-grey-0',
  );

  const descriptionColClasses = classNames('f-col', 'w-full', 'h-full', 'justify-center');

  const descriptionWrapperClasses = classNames('f-col', 'w-full', 'space-y-[32px]', 'items-center', 'md:items-start');

  const descriptionClasses = classNames('text-grey-0', 'md:max-w-[315px]');

  const actionButtonClasses = classNames(
    '!w-[140px]',
    'bg-white',
    '!text-elevated-background',
    'border-transparent',
    'hover:bg-primary',
    'hover:border-white',
    'hover:!text-white',
  );

  const imageWrapperClasses = classNames('md:h-full', 'w-full', 'md:w-auto');

  const imageClasses = classNames('md:object-contain', 'w-full', 'md:w-auto', 'lg:h-full');
</script>

<div class={wrapperClasses}>
  <div class={innerWrapperClasses}>
    <div class={bannerWrapperClasses}>
      <div class={imageWrapperClasses}>
        <img
          src={$isMobile
            ? images.content.sm
            : $isTablet
              ? images.content.md
              : $isDesktop
                ? images.content.lg
                : images.content.xl}
          alt={title}
          class={imageClasses} />
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
