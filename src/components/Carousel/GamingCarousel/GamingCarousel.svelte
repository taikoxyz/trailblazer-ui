<script lang="ts">
  import type { CarouselItem } from '../types';
  import GamingCarouselItem from './GamingCarouselItem.svelte';

  export let carouselElement: HTMLDivElement;

  export let carouselItems: CarouselItem[] = [
    {
      id: '6',
      title: 'Crack & Stack',
      description:
        'Top-down multiplayer game. Enter the Ethereum mines, set traps, mine ores, escape the goblins and escape with your loot.',
      image: '/games/crackandstack.svg',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://crackandstack.com/',
    },
    {
      id: '1',
      title: 'Zypher z2048',
      description:
        'Immerse in z2048, a strategic on-chain game blending classic 2048 with fair, scalable gameplay via Zypher’s UZKGE.',
      image: '/games/zyphergames.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://zypher.game/2048/',
    },
    {
      id: '2',
      title: 'Swords and Dungeons',
      description:
        'Swords and Dungeons is the first multi-chain MMORPG. It is a vast world with rich gameplay, NFTs, and dynamic economic models.',
      image: '/games/swordsanddungeons.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://swnd.io/',
    },
    {
      id: '3',
      title: 'Stupid Monkeys',
      description:
        'Welcome to StupidMonkeys Realm Hero, where dynamic NFTs bring your monkeys to life! Level up, evolve, and conquer in thrilling PvP battles to claim your title as the Hero of the MonkeyRealm!',
      image: '/games/stupidmonkeys.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://www.stupidmonkeys.co/',
    },
    {
      id: '4',
      title: 'Looper Lands',
      description:
        'LooperLands is a free-to-play community-pixelverse. Traverse between captivating creator made worlds, each with its own complete stories and unique minigames.',
      image: '/games/looperlands.svg',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://looperlands.io/',
    },
    {
      id: '5',
      title: 'EVM Warfare',
      description:
        'Fight, Earn, Dominate. Thrilling third-person shooter powered by Unreal Engine 5. Dominate deathmatches, claim instant rewards based on performance.',
      image: '/games/evmwarfare.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://evmwarfare.com/',
    },
    {
      id: '7',
      title: '21BJ',
      description:
        '21BJ is a free-to-play Fantasy Casino Mobile Game, merging the thrill of casino games with the immersive elements of a strategic RPG-influenced journey.',
      image: '/games/21bj.png',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://21bj.io/',
    },
    {
      id: '8',
      title: '0xAstra',
      description:
        '0xAstra is an onchain SLG game, where you harness cross-chain resources with bridge technology to build and defend your cosmic homeland. Strategize, expand, and dominate in this interstellar conquest.',
      image: '/games/0xastra.svg',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://0xastra.xyz/',
    },
  ];
</script>

<div class="flex w-full justify-center items-center gap-[12.25px] pl-4 xl:pl-0">
  <div bind:this={carouselElement} class="carousel w-full overflow-scroll rounded-box gap-8">
    {#each carouselItems as carouselItem}
      <GamingCarouselItem {carouselItem} />
    {/each}
  </div>
</div>
