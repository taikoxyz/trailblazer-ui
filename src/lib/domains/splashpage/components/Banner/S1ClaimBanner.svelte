<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { web3modal } from '$lib/shared/utils/connect';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { account } from '$shared/stores/account';
  import { classNames } from '$shared/utils/classNames';

  // Container Classes
  const containerClasses = classNames('container', 'flex', 'justify-center', 'items-center', 'w-full');

  // Wrapper Classes
  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'w-full',
    'rounded-[30px]',
    'bg-elevated-background',
    'bg-cover',
    'relative',
    'overflow-hidden',
    'h-[732px]',
    'md:h-[427px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'min-w-[342px]',
    'bg-[url("/banner/s1claimbanner/sm/bg.png")]',
    'md:bg-[url("/banner/s1claimbanner/md/bg.png")]',
    'lg:bg-[url("/banner/s1claimbanner/lg/bg.png")]',
  );

  // Inner Wrapper Classes
  const innerWrapperClasses = classNames(
    'absolute',
    'w-full',
    'bottom-0',
    'h-[522px]',
    'md:h-[427px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'flex',
    'flex-col',
    'md:flex-row',
    'items-center',
    'space-y-7.5',
    'lg:space-y-0',
    'px-5',
    'md:px-0',
    'lg:px-[110px]',
    'xl:px-[330px]',
    'lg:py-0',
    'md:py-8.75',
    'xl:py-0',
  );

  // Subtext Wrapper Classes
  const subtextWrapperClasses = classNames(
    'f-col',
    'lg:f-row',
    'xl:f-col',
    'items-center',
    'md:items-start',
    'mt-7.5',
    'xl:ml-[95px]',
    'md:mt-0',
    'text-center',
    'md:text-left',
    'justify-center',
    'gap-[34px]',
  );

  // Subtext Classes
  const subtextClasses = classNames(
    'w-64',
    'md:w-[292px]',
    'xl:w-[247px]',
    'text-center',
    'md:text-left',
    'text-[#FF10CF]',
    'uppercase',
    'md:hidden',
  );

  const subtextClassesMd = classNames(
    'w-64',
    'md:w-[230px]',
    'xl:w-[247px]',
    'text-center',
    'md:text-left',
    'text-[#FF10CF]',
    'uppercase',
    'hidden',
    'md:block',
  );

  // Action Button Classes
  const actionButtonClasses = classNames(
    'min-w-[140px]',
    'max-w-[140px]',
    'max-h-[48px]',
    'lg:absolute',
    'lg:top-[175px]',
    'lg:right-[144px]',
    'xl:right-[329px]',
    'xl:top-[160px]',
  );

  // Inner Content Classes
  const innerContentClasses = classNames(
    'f-col',
    'md:h-[385px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'justify-center',
    'items-center',
    'md:items-start',
    'xl:items-center',
    'space-y-5',
    'md:ml-12.5',
    'md:ml-[128px]',
    'lg:ml-[57px]',
    'xl:ml-0',
    'xl:my-[93px]',
    'md:min-w-[315px]',
    'lg:min-w-[367px]',
  );

  // Image Classes
  const runesLeftImageClasses = classNames('absolute', 'top-0', 'left-0', 'xl:hidden');
  const runesLeftImageClassesXl = classNames(
    'absolute',
    'top-0',
    'left-0',
    'hidden',
    'xl:block',
    'w-[261px]',
    'h-[250px]',
  );

  const runesRightImageClasses = classNames('absolute', 'right-0', 'bottom-0', 'h-[183px]', 'w-[101px]', 'xl:hidden');

  const runesRightImageClassesXl = classNames(
    'absolute',
    'right-0',
    'bottom-0',
    'xl:h-[250px]',
    'xl:w-[182px]',
    'hidden',
    'xl:block',
  );

  const glyphsImageClasses = classNames('md:self-end', 'h-[17px]');

  // Title Classes
  const titleWrapperClasses = classNames(
    'flex',
    'flex-col',
    'items-center',
    'md:items-start',
    'md:mt-0',
    'gap-[10px]',
    'xl:min-w-[402px]',
    'lg:mt-[35.5px]',
  );

  const h1Classes = classNames(
    'relative',
    'md:text-left',
    'text-secondary-warm-yellow',
    'font-bold',
    'font-["Clash_Grotesk"]',
    'text-[60px]',
    'lg:text-[64px]',
    'xl:text-[68px]',
    'text-[60px]',
    'leading-[62.909px]',
    'tracking-[1.8px]',
    'xl:tracking-[2.097px]',
    'uppercase',
  );

  const h2Classes = classNames(
    'text-secondary-brand',
    'font-["Clash_Grotesk"]',
    'text-[34.695px]',
    'lg:text-[37px]',
    'uppercase',
    'text-[#FF10CF]',
    'font-semibold',
    'leading-none',
    'tracking-[1.735px]',
  );

  const overlayClasses = classNames(
    'absolute',
    'md:hidden',
    'top-0',
    'left-0',
    'w-full',
    'h-full',
    'bg-center',
    'bg-no-repeat',
    'bg-cover',
    'opacity-70',
    'bg-[url("/banner/s1claimbanner/sm/overlay.svg")]',
  );

  const separatorClasses = classNames(
    'h-sep',
    'lg:pt-0',
    'lg:mb-0',
    'mt-0',
    'self-center',
    'md:self-start',
    'w-[286px]',
    'md:w-[416px]',
    'lg:w-[463.326px]',
    'xl:w-[500px]',
    'bg-[#FF10CF]',
  );

  const handleClick = () => {
    $account.isConnected ? goto('/profile') : web3modal.open();
  };
</script>

<div class={containerClasses}>
  <div class={wrapperClasses}>
    <!-- Runes Image left -->
    <img class={runesLeftImageClasses} alt="runes" src="/banner/s1claimbanner/runes-left.svg" />
    <img class={runesLeftImageClassesXl} alt="runes" src="/banner/s1claimbanner/xl/runes-left.svg" />
    <!-- Overlay -->
    <div class={overlayClasses} />

    <div class={innerWrapperClasses}>
      <div class={innerContentClasses}>
        <div class={titleWrapperClasses}>
          <h1 class={h1Classes}>{$t('banner.s1claimbanner.title_1')}</h1>
          <h2 class={h2Classes}>{$t('banner.s1claimbanner.title_2')}</h2>

          <div class={separatorClasses} />
          <div class="f-row justify-between xl:w-[500px]">
            <span class={subtextClassesMd}>trailblazers.taiko.xyz </span>
            <img class={glyphsImageClasses} src="/banner/s1claimbanner/glyphs.svg" alt="glyphs" />
          </div>
        </div>
        <div class={subtextWrapperClasses}>
          <span class={subtextClasses}>trailblazers.taiko.xyz </span>
          <ActionButton priority="primary" class={actionButtonClasses} on:click={handleClick}>Claim now</ActionButton>
        </div>
      </div>
    </div>
    <!-- Runes Image right -->
    <img class={runesRightImageClasses} alt="runes" src="/banner/s1claimbanner/runes-right.svg" />
    <img class={runesRightImageClassesXl} alt="runes" src="/banner/s1claimbanner/xl/runes-right.svg" />
  </div>
</div>
