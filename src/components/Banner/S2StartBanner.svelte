<script lang="ts">
  import { t } from 'svelte-i18n';

  import ActionButton from '$components/Button/ActionButton.svelte';
  import { classNames } from '$libs/util/classNames';

  // Container Classes
  const containerClasses = classNames(
    'container',
    'px-6',
    'flex',
    'justify-center',
    'items-center',
    'w-full',
    'lg:px-[48px]',
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
    'xl:h-[250px]',
    'flex',
    'flex-col',
    'md:flex-row',
    'items-center',
    'space-y-7.5',
    'xl:space-y-0',
    'px-5',
    'md:px-6',
    'lg:px-[110px]',
    'md:py-8.75',
    'xl:py-0',
  );

  // Title Wrapper Classes
  const titleWrapperClasses = classNames(
    'flex',
    'flex-col',
    'items-center',
    'md:items-start',
    'mt-32.5',
    'md:mt-0',
    'gap-1.25',
    'xl:min-w-[402px]',
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
  const actionButtonClasses = classNames('max-w-[140px]', 'max-h-[48px]');

  // Inner Content Classes
  const innerContentClasses = classNames(
    'f-col',
    'xl:f-row',
    'md:h-[385px]',
    'xl:h-[250px]',
    'justify-center',
    'items-center',
    'md:items-start',
    'xl:items-center',
    'space-y-5',
    'md:ml-12.5',
    'md:ml-[95px]',
    'lg:ml-[80px]',
    'xl:my-[93px]',
  );

  // Image Classes
  const characterImageClassesSm = classNames('md:hidden', 'w-auto');

  const characterImageClassesMd = classNames('hidden', 'md:block', 'xl:hidden', 'h-full', 'w-auto', 'self-start');

  const characterImageClassesXl = classNames('hidden', 'xl:block', 'h-full', 'w-auto', 'self-start');

  const runesImageClassesSm = classNames('absolute', 'w-full', 'md:hidden');

  const runesImageClassesMd = classNames('w-full', 'hidden', 'md:block', 'xl:hidden', 'h-[386.329px]', 'w-[241px]');
  const runesImageClassesXl = classNames('w-full', 'hidden', 'xl:block', 'h-[250px]', 'w-[174px]', 'xl:ml-[130px]');

  const runesRightImageClasses = classNames(
    'absolute',
    'right-0',
    'top-0',
    'hidden',
    'md:block',
    'h-[183px]',
    'w-[101px]',
    'xl:h-[175px]',
    'xl:w-[97px]',
  );

  const glyphsImageClasses = classNames('md:self-end');

  const h1Classes = classNames(
    'relative',
    'font-semibold',
    'font-["Clash_Grotesk"]',
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
    'text-stroke-neon',
    'drop-shadow-neon',
  );

  const h2Classes = classNames(
    'text-secondary-brand',
    'font-["Clash_Grotesk"]',
    'text-[34.695px]',
    'lg:text-[37px]',
    'font-semibold',
    'leading-none',
    'tracking-[1.735px]',
  );

  const separatorClasses = classNames('h-sep', 'md:pt-[22px]');
</script>

<div class={containerClasses}>
  <div class={wrapperClasses}>
    <!-- Character Images -->
    <img alt="character" class={characterImageClassesSm} src="/banner/s2startbanner/sm/character.png" />
    <img alt="character" class={characterImageClassesMd} src="/banner/s2startbanner/md/character.png" />
    <img alt="character" class={characterImageClassesXl} src="/banner/s2startbanner/xl/character.png" />

    <!-- Runes Image for Small Screens -->
    <img class={runesImageClassesSm} alt="runes" src="/banner/s2startbanner/sm/runes.svg" />

    <div class={innerWrapperClasses}>
      <!-- Runes Image for Medium and large Screens -->
      <img class={runesImageClassesMd} alt="runes" src="/banner/s2startbanner/md/runes.svg" />
      <!-- Runes Image for X-Large and up Screens -->
      <img class={runesImageClassesXl} alt="runes" src="/banner/s2startbanner/xl/runes.svg" />

      <div class={innerContentClasses}>
        <div class={titleWrapperClasses}>
          <h1 class={h1Classes}>{$t('banner.s2startbanner.title_1')}</h1>
          <h2 class={h2Classes}>{$t('banner.s2startbanner.title_2')}</h2>

          <div class="hidden xl:block w-[402px]">
            <div class={separatorClasses} />
            <img class={glyphsImageClasses} src="/banner/s2startbanner/glyphs.svg" alt="glyphs" />
          </div>
        </div>
        <div class={subtextWrapperClasses}>
          <span class={subtextClasses}>
            {$t('banner.s2startbanner.subtext')}
          </span>
          <ActionButton priority="primary" class={actionButtonClasses}>Start now</ActionButton>
        </div>

        <div class="xl:hidden">
          <div class={separatorClasses} />
          <img class={glyphsImageClasses} src="/banner/s2startbanner/glyphs.svg" alt="glyphs" />
        </div>
      </div>
    </div>
    <!-- Runes Image for Large and up Screens -->
    <img class={runesRightImageClasses} alt="runes" src="/banner/s2startbanner/lg/runes-right.svg" />
  </div>
</div>
