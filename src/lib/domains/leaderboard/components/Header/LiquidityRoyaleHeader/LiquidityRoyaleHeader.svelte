<script lang="ts">
  import { PlusIcon } from '$shared/components/Icon';
  import LiquidityRoyalCarousel from '$shared/components/PartnerCarousel/LiquidityRoyalCarousel.svelte';
  import { classNames } from '$shared/utils/classNames';

  import Infoboxes from './Infoboxes.svelte';
  import PrizePool from './PrizePool.svelte';
  import ReadMoreBox from './ReadMoreBox.svelte';

  const containerClasses = classNames('flex', 'justify-center', 'items-center', 'w-full');
  const wrapperClasses = classNames(
    'f-col',
    'w-full',
    'z-10',
    'overflow-hidden',
    'mt-[550px]',
    'xl:mt-[600px]',
    'md:space-y-[50px]',
    'space-y-[120px]',
  );
  const headerImageClasses = classNames(
    'min-h-[475px]',
    'xl:h-[606px]',
    'bg-[url(/competitionInfo/liquidityRoyale/sm/header.png)]',
    'md:bg-[url(/competitionInfo/liquidityRoyale/md/header.png)]',
    'lg:bg-[url(/competitionInfo/liquidityRoyale/lg/header.png)]',
    'xl:bg-[url(/competitionInfo/liquidityRoyale/xl/header.png)]',
    'bg-no-repeat',
    'bg-center',
    'bg-contain',
    'overflow-visible',
    'absolute',
    'left-0',
    'top-[180px]',
    'w-full',
    'z-0',
  );

  const descriptionClasses = classNames(
    'f-col',
    'md:f-row',
    'gap-[24px]',
    'items-center',
    'text-center',
    'md:text-left',
    'md:w-[395px]',
    'lg:w-[555px]',
    'font-clash-grotesk',
    'text-[16px]',
    'font-medium',
    'leading-[22px]',
    'tracking-[0.32px]',
  );
  const plusIconClasses = classNames('self-center', 'mb-6', 'md:mb-0');
</script>

<div class={containerClasses}>
  <div class={headerImageClasses}></div>

  <div class={wrapperClasses}>
    <div class="f-col md:f-row justify-between items-center space-y-[50px]">
      <span class={descriptionClasses}>
        <PlusIcon class={plusIconClasses} />

        Ready to supercharge your liquidity and get rewarded for it? The Taiko Liquidity Royale is here, offering a
        massive 1M Taiko tokens in rewards! Whether you’re a seasoned liquidity provider or looking to get started, this
        is your chance to dive in and earn juicy prizes.
      </span>
      <PrizePool />
    </div>
    <Infoboxes />
    <ReadMoreBox />
    <LiquidityRoyalCarousel />
  </div>
</div>
