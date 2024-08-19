<script lang="ts">
  import type { CarouselItemType } from '$components/Carousel/types';
  import { PartnersTemplate } from '$components/Partner/';
  import { classNames } from '$libs/util/classNames';

  export const gamingCarouselItems: CarouselItemType[] = [
    {
      id: '1',
      title: 'OKU Trade (Uniswap V3)',
      description:
        'Oku Trade is a non-custodial DEX trading platform and bridge aggregator offering the best rates and analytics across 16 EVM chains.',
      image: '/dapps/stargate/oku-trader.png',
      link: 'https://oku.trade/',
      cta: 'Use now',
    },
    {
      id: '2',
      title: 'Izumi Finance',
      description:
        'Liquidity Redefined - A multi-chain DeFi protocol providing One-Stop Liquidity as a Service (LaaS).',
      image: '/dapps/stargate/izumi.png',
      link: 'https://izumi.finance/',
      cta: 'Use now',
    },
    {
      id: '3',
      title: 'Ritsu',
      description:
        'A based decentralized exchange #DEX on Taiko @taikoxyz Swap and earn with hyper efficiency and seamless experience.',
      image: '/dapps/stargate/ritsu.png',
      link: 'https://ritsu.xyz',
      cta: 'Use now',
    },
    {
      id: '4',
      title: 'Meridian Finance',
      description:
        'A non-custodial, decentralised financial trading platform that offers interest-free stable coin borrowing, leverage trading and zero slippage swaps all in one place.',
      image: '/dapps/stargate/meridian.png',
      link: 'https://www.meridianfinance.net/',
      cta: 'Use now',
    },
    {
      id: '5',
      title: 'KiloEx',
      description:
        'Decentralized exchange blending speed and simplicity. Enjoy lightning-fast trades, real-time market insights, and an intuitive interface for traders, alongside secure, LP-friendly solutions for liquidity providers.',
      image: '/dapps/stargate/kilo-ex.png',
      link: 'https://www.kiloex.io/',
      cta: 'Use now',
    },
    {
      id: '6',
      title: 'Stargate',
      description:
        'Top-down multiplayer game. Enter the Ethereum mines, set traps, mine ores, escape the goblins and escape with your loot.',
      image: '/dapps/stargate/stargate.png',
      link: 'https://stargate.finance/',
      cta: 'Use now',
    },
  ];
</script>

<div class={classNames('w-full', 'px-[20px]', 'lg:px-[57px]', 'md:px-[47px]')}>
  <PartnersTemplate title="Featured projects" carouselItems={gamingCarouselItems} />
</div>
