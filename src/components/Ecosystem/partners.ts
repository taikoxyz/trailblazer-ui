export interface IEcosystemPartner {
  name: string;
  logo: string;
  description: string;
  category: string;
  url: string;
}

const EcosystemPartners: IEcosystemPartner[] = [
  {
    name: 'EVM Warfare',
    description:
      'Fight, Earn, Dominate. Thrilling third-person shooter powered by Unreal Engine 5. Dominate deathmatches, claim instant rewards based on performance.',
    logo: '/dapps/gaming/evmwarfare.png',
    url: 'https://evmwarfare.com/',
    category: 'Gaming',
  },
  {
    name: 'Robots.Farm',
    description:
      'Robot.farms is a gamified trading platform that seamlessly merges decentralized finance with a captivating gaming experience.',
    logo: '/dapps/gaming/robotsfarm.jpg',
    url: 'https://robots.farm/',
    category: 'Gaming',
  },
  {
    name: 'Bullishs',
    description: 'Bullishs is the first seamless transaction tech in Omni Layer2 cross-rollup game.',
    logo: '/dapps/gaming/bullishs.png',
    url: 'https://bullishs.io/',
    category: 'Gaming',
  },
  {
    name: 'Brigade',
    description:
      'Brigade is a play-to-earn game that you can start completely free. It is the perfect opportunity to immerse yourself in the Taco Studios world.',
    logo: '/dapps/gaming/brigade.png',
    url: 'https://brigadegame.io/',
    category: 'Gaming',
  },
  {
    name: 'Swords and Dungeons',
    description:
      'Swords and Dungeons is the first multi-chain MMORPG. It is a vast world with rich gameplay, NFTs, and dynamic economic models.',
    logo: '/dapps/gaming/swordsanddungeons.png',
    url: 'https://swnd.io/',
    category: 'Gaming',
  },
  {
    name: 'World of Dypians',
    description:
      'Experience unique gameplay and explore a world without end in a quest to form your destiny. The opportunities are endless ensuring infinite playability.',
    logo: '/dapps/gaming/dypians.png',
    url: 'https://www.worldofdypians.com/',
    category: 'Gaming',
  },
  {
    name: 'Crack & Stack',
    description:
      'Top-down multiplayer game. Enter the Ethereum mines, set traps, mine ores, escape the goblins and escape with your loot.',
    logo: '/dapps/gaming/crackandstack.svg',
    url: 'https://crackandstack.com/',
    category: 'Gaming',
  },
  {
    name: 'Looper Lands',
    description:
      'LooperLands is a free-to-play community-pixelverse. Traverse between captivating creator made worlds, each with its own complete stories and unique minigames.',
    logo: '/dapps/gaming/looperlands.svg',
    url: 'https://looperlands.io/',
    category: 'Gaming',
  },
  {
    name: 'Ulti-Pilot',
    description:
      'Explore Ultiverse with Ulti-Pilot, powered by Bodhi AI. Create agents, explore daily, and earn rewards. Free access now.',
    logo: '/dapps/gaming/ultiverse.png',
    url: 'https://pilot.ultiverse.io/',
    category: 'Gaming',
  },
  {
    name: 'Zypher z2048',
    description:
      'Immerse in z2048, a strategic on-chain game blending classic 2048 with fair, scalable gameplay via Zypher’s UZKGE.',
    logo: '/dapps/gaming/zyphergames.png',
    url: 'https://zypher.game/2048/',
    category: 'Gaming',
  },
  {
    name: '0xAstra',
    description:
      '0xAstra is an onchain SLG game, where you harness cross-chain resources with bridge technology to build and defend your cosmic homeland. Strategize, expand, and dominate in this interstellar conquest.',
    logo: '/dapps/gaming/0xastra.svg',
    url: 'https://0xastra.xyz/',
    category: 'Gaming',
  },

  {
    name: 'OKU Trade (Uniswap V3)',
    description:
      'Oku Trade is a non-custodial DEX trading platform and bridge aggregator offering the best rates and analytics across 16 EVM chains.',
    logo: '/dapps/stargate/oku-trader.png',
    url: 'https://oku.trade/',
    category: 'DEX', // comes from StargatePartners.svelte
  },
  {
    name: 'Izumi Finance',
    description: 'Liquidity Redefined - A multi-chain DeFi protocol providing One-Stop Liquidity as a Service (LaaS).',
    logo: '/dapps/stargate/izumi.png',
    url: 'https://izumi.finance/',
    category: 'DEX', // comes from StargatePartners.svelte
  },
  {
    name: 'Ritsu',
    description:
      'A based decentralized exchange #DEX on Taiko @taikoxyz Swap and earn with hyper efficiency and seamless experience.',
    logo: '/dapps/stargate/ritsu.png',
    url: 'https://ritsu.xyz',
    category: 'DEX', // comes from StargatePartners.svelte
  },
  {
    name: 'Meridian Finance',
    description:
      'A non-custodial, decentralised financial trading platform that offers interest-free stable coin borrowing, leverage trading and zero slippage swaps all in one place.',
    logo: '/dapps/stargate/meridian.png',
    url: 'https://www.meridianfinance.net/',
    category: 'DEX', // comes from StargatePartners.svelte
  },
  {
    name: 'KiloEx',
    description:
      'Decentralized exchange blending speed and simplicity. Enjoy lightning-fast trades, real-time market insights, and an intuitive interface for traders, alongside secure, LP-friendly solutions for liquidity providers.',
    logo: '/dapps/stargate/kilo-ex.png',
    url: 'https://www.kiloex.io/',
    category: 'DEX', // comes from StargatePartners.svelte
  },
  {
    name: 'Stargate',
    description:
      'Top-down multiplayer game. Enter the Ethereum mines, set traps, mine ores, escape the goblins and escape with your loot.',
    logo: '/dapps/stargate/stargate.png',
    url: 'https://stargate.finance/',
    category: 'DEX', // comes from StargatePartners.svelte
  },
].sort((a, b) => a.name.localeCompare(b.name));

export default EcosystemPartners;
