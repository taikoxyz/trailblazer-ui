<script lang="ts">
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { Title } from '$components/Title';
  import { classNames } from '$libs/util/classNames';

  import EcosystemItem from './components/EcosystemItem.svelte';
  import EcosystemPartners from './partners';

  const wrapperClasses = classNames('flex', 'flex-col', 'items-center', 'justify-center');

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
</script>

<div class={wrapperClasses}>
  <div class="mb-[60px] w-full">
    <div class="w-full">
      <div class="lg:text-left text-center f-col items-center lg:items-start">
        <span class="text-xl font-clash-grotesk">Trailblazer's ecosystem</span>
        <span class=" border-bottom border-2 border-primary w-[66px] mt-[20px]"></span>
      </div>
    </div>
    <Title class=" my-[40px] !max-w-full !w-full">
      <span class="text-base-content">Our Partners</span>
    </Title>
  </div>
  <div class={gridClasses}>
    {#each partners as partner}
      <EcosystemItem data={partner} />
    {/each}
  </div>

  <div class={buttonRowClasses}>
    <ActionButton priority="primary" href="/ecosystem">View more dapps</ActionButton>
  </div>
</div>
