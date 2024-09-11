<script lang="ts">
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { Title } from '$components/Title';
  import { classNames } from '$libs/util/classNames';

  import EcosystemItem from './components/EcosystemItem.svelte';
  import EcosystemPartners from './partners';

  const wrapperClasses = classNames('relative', 'pt-[664px]', 'flex', 'flex-col', 'items-center', 'justify-center');

  const gridClasses = classNames(
    'grid',
    'grid-cols-1',
    'md:grid-cols-2',
    'lg:grid-cols-3',
    'xl:grid-cols-4',
    'gap-[18px]',
  );

  const buttonRowClasses = classNames('w-[210px]', 'max-w-full', 'flex', 'justify-center', 'items-center', 'pt-[40px]');

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
    'items-start',
  );

  const headerWrapperClasses = classNames(
    'bg-[blue]',
    'ml-[278px]',
    'relative',
    'pb-[60px]',
    'w-[30vw]',
    'flex-col',
    'flex',
  );

  const headerTitleClasses = classNames(
    'text-content-primary',
    'font-clash-grotesk',
    'text-[57px]/[64px]',
    'font-[500]',
  );

  const headerTextClasses = classNames('text-[16px]/[24px]', 'text-content-primary', 'pt-[16px]');

  const headerButtonWrapperClasses = classNames('pt-[30px]', 'w-1/2');

  const headerShadowClasses = classNames('absolute', 'top-[0%]', 'left-0', 'h-full', 'w-1/2', 'bg-cover');

  // Additional constants for other classes
  const titleWrapperClasses = classNames('lg:text-left', 'text-center', 'f-col', 'items-center', 'lg:items-start');

  const titleTextClasses = classNames('text-xl', 'font-clash-grotesk');

  const borderBottomClasses = classNames('border-bottom', 'border-2', 'border-primary', 'w-[66px]', 'mt-[20px]');

  const maxWidthClasses = classNames('my-[40px]', '!max-w-full', '!w-full');

  const partnersTitleClasses = classNames('text-base-content');

  const contentWrapperClasses = classNames(
    'relative',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'border',
    'border-primary',
    'pt-[36px]',
  );

  const contentBackgroundClasses = classNames(
    'absolute',
    //'left-0',
    'top-0',

    'bg-opacity-50',
    'h-full',
    'bg-white',
    'w-[100vw]',
    'rounded-[30px]',
  );

  const partnersWrapperClasses = classNames(
    'mb-[60px]',
    'w-[30vw]',

    'flex',
    'flex-col',
    'text-[purple]',
    'relative',
    'ml-[278px]',
    'border',
  );
</script>

<div class={wrapperClasses}>
  <div class={headerClasses} style="background-image:url('/ecosystem/header.png')">
    <div class={headerShadowClasses} style="background-image:url('/ecosystem/header-shadow.png')"></div>
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

  <div class={contentWrapperClasses}>
    <div class={contentBackgroundClasses}></div>

    <div class={partnersWrapperClasses}>
      <div class="w-full">
        <div class={titleWrapperClasses}>
          <span class={titleTextClasses}>Trailblazer's ecosystem</span>
          <span class={borderBottomClasses}></span>
        </div>
      </div>
      <Title class={maxWidthClasses}>
        <span class={partnersTitleClasses}>Our Partners bla</span>
      </Title>
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
