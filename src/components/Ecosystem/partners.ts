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
    name: 'Stargate',
    description:
      'Top-down multiplayer game. Enter the Ethereum mines, set traps, mine ores, escape the goblins and escape with your loot.',
    logo: '/dapps/stargate/stargate.png',
    url: 'https://stargate.finance/',
    category: 'DEX', // comes from StargatePartners.svelte
  },

  {
    name: 'Ritsu',
    description:
      'A based decentralized exchange #DEX on Taiko @taikoxyz Swap and earn with hyper efficiency and seamless experience.',
    logo: '/dapps/defi/ritsu-protocol.png',
    url: 'https://ritsu.xyz/',
    category: 'DeFi', // from defiCarouselItems.ts
  },
  {
    name: 'iZUMi Finance',
    description: 'Liquidity Redefined - A multi-chain DeFi protocol providing One-Stop Liquidity as a Service (LaaS).',
    logo: '/dapps/defi/izumi_finance.png',
    url: 'https://izumi.finance/trade/swap',
    category: 'DeFi', // from defiCarouselItems.ts
  },
  {
    name: 'Minterest',
    description:
      'Minterest captures more fees than any other lending protocol and redistributes them as rewards back to users who contribute to its governance with the highest long term yields.',
    logo: '/dapps/defi/minterest.png',
    url: 'https://taiko.minterest.com/',
    category: 'DeFi', // from defiCarouselItems.ts
  },
  {
    name: 'Henjin DEX',
    description: 'Henjin is an ecosystem-focused, community-driven DEX and Launchpad built on Taiko.',
    logo: '/dapps/defi/henjin_dex.png',
    url: 'https://app.henjin.xyz/',
    category: 'DeFi', // from defiCarouselItems.ts
  },
  {
    name: 'Hana Finance',
    description:
      'Elevate your financial strategy with Hana Finance. Lend, borrow, and earn competitive yields in a dynamic liquidity environment designed for growth.',
    logo: '/dapps/defi/hana_finance.png',
    url: 'https://www.hana.finance/market',
    category: 'DeFi', // from defiCarouselItems.ts
  },
  {
    name: 'DTX',
    description:
      'DTX is a decentralized trading and liquidity protocol deployed across multiple chains, crafted by seasoned traders for the community.',
    logo: '/dapps/defi/dtx-trade.png',
    url: 'https://dtx.trade/trade',
    category: 'DeFi', // from defiCarouselItems.ts
  },
  {
    name: 'KiloEx',
    description:
      'Decentralized exchange blending speed and simplicity. Enjoy lightning-fast trades, real-time market insights, and an intuitive interface for traders, alongside secure, LP-friendly solutions for liquidity providers.',
    logo: '/dapps/defi/kiloex.png',
    url: 'https://app.kiloex.io/trade',
    category: 'DeFi', // from defiCarouselItems.ts
  },

  {
    name: 'DotTaiko (SpaceID)',
    description: 'DotTaiko is the web3 domain naming service built for the Taiko blockchain community. ',
    logo: '/dapps/ens/dottaiko.svg',
    url: 'https://dottaiko.me/',
    category: 'ENS', // from ensCarouselItems.ts
  },
  {
    name: 'ZNS',
    description:
      'ZNS Connect decentralized ID platform powered by decentralized addresses with unique domain names on Taiko.',
    logo: '/dapps/ens/zns.svg',
    url: 'https://www.znsconnect.io/',
    category: 'ENS', // from ensCarouselItems.ts
  },
  {
    name: 'PoP Planet',
    description:
      'Connect with millions through an AI & Social Plugin, crafted to reshape the social narrative of the digital age. Join the Influence-to-Earn Platform and transform your online interactions into opportunities.',
    logo: '/dapps/ens/pop-planet.svg',
    url: 'https://socialsummer.ai/',
    category: 'ENS', // from ensCarouselItems.ts
  },

  {
    name: 'OKX NFT Marketplace',
    description:
      'OKX NFT marketplace is a decentralized NFT exchange to create, collect and trade extraordinary NFTs on Taiko',
    logo: '/dapps/nft/okx-marketplace.webp',
    url: 'https://www.okx.com/web3/marketplace/nft',
    category: 'NFT', // from nftPartnersItems.svelte.ts
  },
  {
    name: 'Mintpad.co',
    description: 'The easiest way to launch an NFT on Taiko!',
    logo: '/dapps/nft/mintpad.jpeg',
    url: 'https://www.mintpad.co/',
    category: 'NFT', // from nftPartnersItems.svelte.ts
  },
  {
    name: 'CoNFT',
    description:
      'A Multi-Chain Web3 Utility Hub offering comprehensive services such as Web3 Name Service, NFT Aggregator, Launchpad, Bridges, and Swaps.',
    logo: '/dapps/nft/conft.jpg',
    url: 'https://conft.app/',
    category: 'NFT', // from nftPartnersItems.svelte.ts
  },
  {
    name: 'Loopex',
    description: 'A next-gen community-first NFT marketplace.',
    logo: '/dapps/nft/loopex.jpg',
    url: 'https://taiko.loopexchange.io/',
    category: 'NFT', // from nftPartnersItems.svelte.ts
  },
  {
    name: 'NFTs2me',
    description:
      'NFTs2Me is a multichain user-friendly comprehensive platform to create, deploy and manage your NFT collection and community, 100% free with advanced functionalities.',
    logo: '/dapps/nft/nfts2me.png',
    url: 'https://nfts2me.com/app/',
    category: 'NFT', // from nftPartnersItems.svelte.ts
  },
  {
    name: 'Omnihub',
    description:
      'OmniHub NFT launchpad invites you to explore the boundless realms of creativity. Create your own collection in just a few clicks. This is where the future of art is born.',
    logo: '/dapps/nft/omnihub.png',
    url: 'https://omnihub.xyz/',
    category: 'NFT', // from nftPartnersItems.svelte.ts
  },
].sort((a, b) => a.name.localeCompare(b.name));

export default EcosystemPartners;
