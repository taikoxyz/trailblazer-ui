<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { web3modal } from '$lib/shared/utils/connect';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { account } from '$shared/stores/account';
  import { classNames } from '$shared/utils/classNames';

  // Container Classes
  const containerClasses = classNames(
    'container',
    'flex',
    'justify-center',
    'items-center',
    'content-center',
    'w-full',
  );

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
    'bg-[url("/banner/s2startbanner/sm/bg.svg")]',
    'md:bg-[url("/banner/s2startbanner/md/bg.svg")]',
  );

  // Inner Wrapper Classes
  const innerWrapperClasses = classNames(
    'bg-[linear-gradient(180deg,rgba(25,30,40,0)_0%,#191e28_31.46%)]',
    'md:bg-[linear-gradient(180deg,rgba(25,30,40,0)_100%,#191e28_0%)]',
    'absolute',
    'w-full',
    'bottom-0',
    'h-[520px]',
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
    'md:px-6',
    'lg:pr-[110px]',
    'xl:pl-0',
    'lg:py-0',
    'md:py-8.75',
    'xl:py-0',
  );

  // Title Wrapper Classes
  const titleWrapperClasses = classNames(
    'flex',
    'flex-col',
    'items-center',
    'md:items-start',
    'mt-[120px]',
    'md:mt-0',
    'gap-1.25',
    'xl:min-w-[402px]',
    'lg:mt-[20.5px]',
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
  const subtextClasses = classNames('w-64', 'md:w-[292px]', 'xl:w-[247px]', 'text-center', 'md:text-left');

  // Action Button Classes
  const actionButtonClasses = classNames('min-w-[140px]', 'max-h-[48px]', 'max-w-[140px]');

  // Inner Content Classes
  const innerContentClasses = classNames(
    'f-col',
    'xl:f-row',
    'md:h-[385px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'justify-center',
    'items-center',
    'md:items-start',
    'xl:items-center',
    'space-y-5',
    'md:ml-12.5',
    'md:ml-[70px]',
    'lg:ml-[57px]',
    'xl:my-[93px]',
    'md:min-w-[315px]',
    'lg:min-w-[367px]',
  );

  // Image Classes
  const characterImageClassesSm = classNames('md:hidden', 'w-auto', 'self-center', 'w-fit');

  const characterImageClassesMd = classNames('hidden', 'md:block', 'lg:hidden', 'h-full', 'w-auto', 'self-start');
  const characterImageClassesLg = classNames('hidden', 'lg:block', 'xl:hidden', 'h-full', 'w-auto', 'self-start');

  const characterImageClassesXl = classNames('hidden', 'xl:block', 'h-full', 'w-auto', 'self-start');

  const runesImageClassesSm = classNames('absolute', 'w-full', 'md:hidden');

  const runesImageClassesMd = classNames('w-full', 'hidden', 'md:block', 'lg:hidden', 'h-[386.329px]', 'w-[241px]');
  const runesImageClassesLg = classNames(
    'w-full',
    'hidden',
    'lg:block',
    'xl:hidden',
    'h-[289.481px]',
    'w-[181.105px]',
    'lg:w-[176.35px]',
    'lg:ml-[80px]',
    'xl:ml-[270px]',
  );
  const runesImageClassesXl = classNames('w-full', 'hidden', 'xl:block', 'h-[250px]', 'max-w-[174px]', 'xl:ml-[270px]');

  const runesRightImageClasses = classNames(
    'absolute',
    'right-0',
    'top-0',
    'hidden',
    'lg:block',
    'h-[183px]',
    'w-[101px]',
    'xl:h-[175px]',
    'xl:w-[97px]',
  );

  const glyphsImageClasses = classNames('md:self-end', 'h-[17px]');

  const h1Classes = classNames(
    'relative',
    'md:text-left',
    'font-semibold',
    'font-clash-grotesk',
    'text-[50px]',
    'lg:text-[64px]',
    'xl:text-[70px]',
    'leading-none',
    'tracking-[7.817px]',
    'xl:tracking-[9.1px]',
    'uppercase',
    'animate-flicker',
    'stroke-2',
    'text-transparent',
    'text-stroke-neon-green',
    'drop-shadow-neon-green',
  );

  const h2Classes = classNames(
    'text-secondary-brand',
    'font-clash-grotesk',
    'text-[34.695px]',
    'lg:text-[37px]',
    'font-semibold',
    'leading-none',
    'tracking-[1.735px]',
  );

  const separatorClasses = classNames('h-sep', 'md:pt-[22px]', 'lg:pt-0', 'my-[12.5px]');

  const handleClick = () => {
    $account.isConnected ? goto('/profile') : web3modal.open();
  };
</script>

<div class={containerClasses}>
  <div class={wrapperClasses}>
    <!-- Character Images -->
    <img alt="character" class={characterImageClassesSm} src="/banner/s2startbanner/sm/character.png" />
    <img alt="character" class={characterImageClassesMd} src="/banner/s2startbanner/md/character.png" />
    <img alt="character" class={characterImageClassesLg} src="/banner/s2startbanner/lg/character.png" />
    <img alt="character" class={characterImageClassesXl} src="/banner/s2startbanner/xl/character.png" />

    <!-- Runes Image for Small Screens -->
    <img class={runesImageClassesSm} alt="runes" src="/banner/s2startbanner/sm/runes.svg" />

    <div class={innerWrapperClasses}>
      <!-- Runes Image for Medium  Screens -->
      <img class={runesImageClassesMd} alt="runes" src="/banner/s2startbanner/md/runes.svg" />
      <!-- Runes Image for Large Screens -->
      <img class={runesImageClassesLg} alt="runes" src="/banner/s2startbanner/lg/runes.svg" />
      <!-- Runes Image for X-Large and up Screens -->
      <img class={runesImageClassesXl} alt="runes" src="/banner/s2startbanner/xl/runes.svg" />

      <div class={innerContentClasses}>
        <div class={titleWrapperClasses}>
          <h1 class={h1Classes}>{$t('banner.s2startbanner.title_1')}</h1>
          <h2 class={h2Classes}>{$t('banner.s2startbanner.title_2')}</h2>

          <div class="hidden xl:f-col w-[402px]">
            <div class={separatorClasses} />
            <img class={glyphsImageClasses} src="/banner/s2startbanner/glyphs.svg" alt="glyphs" />
          </div>
        </div>
        <div class={subtextWrapperClasses}>
          <span class={subtextClasses}>
            {$t('banner.s2startbanner.subtext')}
          </span>
          <ActionButton priority="primary" class={actionButtonClasses} on:click={handleClick}>Start now</ActionButton>
        </div>

        <div class="xl:hidden w-full f-col md:max-w-[315px]">
          <div class={separatorClasses} />
          <img class={glyphsImageClasses} src="/banner/s2startbanner/glyphs.svg" alt="glyphs" />
        </div>
      </div>
    </div>
    <!-- Runes Image for Large and up Screens -->
    <img class={runesRightImageClasses} alt="runes" src="/banner/s2startbanner/lg/runes-right.svg" />
  </div>
</div>
