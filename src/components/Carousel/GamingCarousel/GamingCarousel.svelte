<script lang="ts">
  import type { CarouselItem } from '../types';
  import GamingCarouselItem from './GamingCarouselItem.svelte';

  export let carouselElement: HTMLDivElement;

  export let carouselItems: CarouselItem[] = [
    {
      id: '1',
      title: 'Zypher Games',
      description:
        'Zypher Network is building the next-generation infrastructure for FOCGs and Autonomous Worlds, featuring a suite of ZKP-powered game engines from Sovereign/Layer 3 Rollups to ZK-as-a-service SDKs.',
      image: '/zyphergames.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://taiko.mirror.xyz/MghuAEQKsqS5Y3hNtq8-9Jv93NEE_1duZKmBE6HKHRQ',
    },
    {
      id: '2',
      title: 'Swords and Dungeons',
      description:
        'Swords and Dungeons is the first multi-chain MMORPG. It is a vast world with rich gameplay, NFTs, and dynamic economic models.',
      image: '/swordsanddungeons.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://taiko.mirror.xyz/MghuAEQKsqS5Y3hNtq8-9Jv93NEE_1duZKmBE6HKHRQ',
    },
    {
      id: '3',
      title: 'Stupid Monkeys',
      description:
        'Welcome to StupidMonkeys Realm Hero, where dynamic NFTs bring your monkeys to life! Level up, evolve, and conquer in thrilling PvP battles to claim your title as the Hero of the MonkeyRealm!',
      image: '/stupidmonkeys.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://taiko.mirror.xyz/MghuAEQKsqS5Y3hNtq8-9Jv93NEE_1duZKmBE6HKHRQ',
    },
    {
      id: '4',
      title: 'Looper Lands',
      description:
        'LooperLands is a free-to-play community-pixelverse. Traverse between captivating creator made worlds, each with its own complete stories and unique minigames.',
      image: '/looperlands.svg',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://taiko.mirror.xyz/MghuAEQKsqS5Y3hNtq8-9Jv93NEE_1duZKmBE6HKHRQ',
    },
    {
      id: '5',
      title: 'EVM Warfare',
      description:
        'Fight, Earn, Dominate. Thrilling third-person shooter powered by Unreal Engine 5. Dominate deathmatches, claim instant rewards based on performance.',
      image: '/evmwarfare.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://taiko.mirror.xyz/MghuAEQKsqS5Y3hNtq8-9Jv93NEE_1duZKmBE6HKHRQ',
    },
    {
      id: '6',
      title: 'Crack & Stack',
      description:
        'Top-down multiplayer game. Enter the Ethereum mines, set traps, mine ores, escape the goblins and escape with your loot.',
      image: '/crackandstack.svg',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://taiko.mirror.xyz/MghuAEQKsqS5Y3hNtq8-9Jv93NEE_1duZKmBE6HKHRQ',
    },
    {
      id: '7',
      title: '21BJ',
      description:
        '21BJ is a free-to-play Fantasy Casino Mobile Game, merging the thrill of casino games with the immersive elements of a strategic RPG-influenced journey.',
      image: '/21bj.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://taiko.mirror.xyz/MghuAEQKsqS5Y3hNtq8-9Jv93NEE_1duZKmBE6HKHRQ',
    },
    {
      id: '8',
      title: '0xAstra',
      description:
        '0xAstra is an onchain SLG game, where you harness cross-chain resources with bridge technology to build and defend your cosmic homeland. Strategize, expand, and dominate in this interstellar conquest.',
      image: '/0xastra.svg',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://taiko.mirror.xyz/MghuAEQKsqS5Y3hNtq8-9Jv93NEE_1duZKmBE6HKHRQ',
    },
  ];
</script>

<div class="flex w-full justify-center items-center gap-[12.25px]">
  <div bind:this={carouselElement} class="carousel w-full overflow-scroll rounded-box gap-8">
    {#each carouselItems as carouselItem}
      <GamingCarouselItem {carouselItem} />
    {/each}
  </div>
</div>
