<script lang="ts">
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { Title } from '$components/Title';
  import { classNames } from '$libs/util/classNames';

  import EcosystemItem from './components/EcosystemItem.svelte';
  import EcosystemPartners from './partners';

  const wrapperClasses = classNames(
    'relative',
    'pt-[664px]',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'w-full',
  );

  const gridClasses = classNames(
    'grid',
    'grid-cols-1',
    'md:grid-cols-2',
    'lg:grid-cols-3',
    'xl:grid-cols-4',
    'px-[48px]',
    'gap-[18px]',
  );

  const buttonRowClasses = classNames(
    'w-[210px]',
    'relative',
    'max-w-full',
    'flex',
    'justify-center',
    'items-center',
    'pt-[50px]',
  );

  const mainPartnerNames = [
    'Zypher z2048',
    'World of Dypians',
    'Looper Lands',
    'EVM Warfare',
    'Brigade',
    'OKU Trade (Uniswap V3)',
    'iZUMi Finance',
    'Henjin DEX',
    'Hana Finance',
    'DTX',
    'KiloEx',
  ];

  const partners = EcosystemPartners.filter((partner) => mainPartnerNames.includes(partner.name));

  const headerClasses = classNames(
    'absolute',
    'top-0',
    'w-[100vw]',
    'h-[700px]',
    'bg-cover',
    'bg-center',
    'pb-[36px]',
    'flex',
    'flex-col',
    'justify-end',
    'items-center',
  );

  const headerGridClasses = classNames(
    'relative',
    'pb-[60px]',
    'w-full',
    'px-[48px]',
    'grid',
    'md:grid-cols-6',
    'grid-cols-4',
  );

  const headerWrapperClasses = classNames('lg:col-span-3', 'lg:col-start-2', 'md:col-start-2', 'col-span-4');

  const headerTitleClasses = classNames(
    'text-content-primary',
    'font-clash-grotesk',
    'text-[57px]/[64px]',
    'font-[500]',
  );

  const headerTextClasses = classNames('text-[16px]/[24px]', 'text-content-primary', 'pt-[16px]');

  const headerButtonWrapperClasses = classNames('pt-[30px]', 'w-full', 'max-w-[225px]');

  const headerShadowClasses = classNames('absolute', 'top-[0%]', 'left-0', 'h-full', 'w-1/2', 'bg-cover', 'bg-right');

  const titleWrapperClasses = classNames('text-center', 'md:text-left', 'f-col', 'items-center', 'md:items-start');

  const titleTextClasses = classNames('text-xl', 'font-clash-grotesk', 'text-grey-800');

  const borderBottomClasses = classNames('border-bottom', 'border-2', 'border-primary', 'w-[66px]', 'mt-[20px]');

  const maxWidthClasses = classNames('my-[40px]', '!max-w-full', '!w-full');

  const partnersTitleClasses = classNames('text-grey-800');

  const contentWrapperClasses = classNames(
    'relative',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'pt-[36px]',
    'pb-[100px]',
    'w-[100vw]',
  );

  const contentBackgroundClasses = classNames('absolute', 'top-0', 'h-full', 'bg-white', 'w-full', 'rounded-[30px]');

  const partnersWrapperClasses = classNames(
    'w-full',
    'px-[48px]',
    'relative',
    'pt-[64px]',
    'grid',
    'md:grid-cols-6',
    'grid-cols-4',
  );

  const partnersClasses = classNames('lg:col-span-3', 'lg:col-start-2', 'md:col-start-2', 'col-span-4');
</script>

<div class={wrapperClasses}>
  <div class={headerClasses} style="background-image:url('/ecosystem/header.png')">
    <div class={headerShadowClasses} style="background-image:url('/ecosystem/header-shadow.png')"></div>
    <div class={headerGridClasses}>
      <div class={headerWrapperClasses}>
        <div class={headerTitleClasses}>
          Our<br />Ecosystem
        </div>
        <div class={headerTextClasses}>
          Explore more, earn more: Dive into leading dapps and maximize your points in an accessible, open and inclusive
          ecosystem.
        </div>
        <div class={headerButtonWrapperClasses}>
          <ActionButton priority="primary" href="/ecosystem">Explore the ecosystem</ActionButton>
        </div>
      </div>
    </div>
  </div>

  <div class={contentWrapperClasses}>
    <div class={contentBackgroundClasses}></div>

    <div class={partnersWrapperClasses}>
      <div class={partnersClasses}>
        <div class="w-full">
          <div class={titleWrapperClasses}>
            <span class={titleTextClasses}>Trailblazer's ecosystem</span>
            <span class={borderBottomClasses}></span>
          </div>
        </div>
        <Title class={maxWidthClasses}>
          <span class={partnersTitleClasses}>Our Partners</span>
        </Title>
      </div>
    </div>

    <div class={gridClasses}>
      {#each partners as partner}
        <EcosystemItem data={partner} style="light" />
      {/each}
    </div>

    <div class={buttonRowClasses}>
      <ActionButton priority="primary" href="/ecosystem">View more dapps</ActionButton>
    </div>
  </div>
</div>
