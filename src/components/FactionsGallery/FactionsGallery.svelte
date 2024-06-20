<script lang="ts">
  import { LockIcon } from '$components/Icon';

  import { type GalleryItem } from './types';

  export let items: GalleryItem[] = [
    {
      image: '/factions/gallery/raver.png',
      name: 'Ravers',
      description:
        'Neo Nakuza’s latest underground based music genre is drawing the city’s rave community who have answered the call of Taiko, Ravers take their taiko drum to the raves to play along with the DJs and get boosted.',
      locked: false,
    },
    {
      image: '/factions/gallery/robot.png',
      name: 'Robots',
      description:
        'Neo Nakuza’s city robots are in touch with the fabric of the city, they’re your black market dealers, selling the latest based DJ mixtapes and upgrades to boosted technology.',
      locked: true,
    },
    {
      image: '/factions/gallery/bouncer.png',
      name: 'Bouncers',
      description:
        'The controlling government of Neo Nakuza is trying to keep the city kids under wraps and are very concerned about the burgeoning Based scene taking over the city. They have deployed clandestine sentinel bouncers to keep an eye on the proceedings.',
      locked: true,
    },
    {
      image: '/factions/gallery/master.png',
      name: 'Masters',
      description:
        'The old Taiko Masters have heard the new beats on the streets and recognise their origins as their own, they’re intrigued to learn what the new kids are up to, and so bring their depth of knowledge of the genre as both mentors and masters.',
      locked: true,
    },
    {
      image: '/factions/gallery/monk.png',
      name: 'Monks',
      description:
        "The city's Monks and Postulants have been blessing the dance floor with their arcane knowledge and sacred rhythms bringing sacrament to the rave.",
      locked: true,
    },
    {
      image: '/factions/gallery/drummer.png',
      name: 'Drummers',
      description:
        'Our drum leaders bring the very latest patterns to the rave to have us all beating in unison along with the DJ drumming up a frenzy as the ravers ‘Get Boosted’.',

      locked: true,
    },
    {
      image: '/factions/gallery/android.png',
      name: 'Androids',
      description:
        'Dealers in underground boosted technology the Androids are constantly updating their kernel and neural vapourware, they’ll help you keep the vibe alive.',

      locked: true,
    },
    {
      image: '/factions/gallery/shinto.png',
      name: 'Shinto',
      description:
        'Ethereal beings have been spotted around the city temples drawn into Neo Nakuza by the call of taiko. Will you answer the call?',
      locked: true,
    },
  ];
</script>

<div class="max-w-full h-[700px] xl:h-auto">
  <div
    class="flex xl:f-center gap-2 xl:ml-0 w-full overflow-x-scroll xl:overflow-visible py-20 px-0 hide-scrollbar xl:p-0">
    <!-- Cards -->
    {#each items as item, i}
      {#if i == 0}
        <!-- spacer -->
        <div class="flex min-w-[10px] xl:min-w-0"></div>
      {/if}
      {#if item.locked}
        <div class="avatar relative xl:max-w-full xl:min-w-0 xl:w-full max-w-full min-w-[277px] w-full">
          <div class="rounded-[30px] h-[502px]">
            <div class="absolute z-10 w-full h-full f-center">
              <LockIcon />
            </div>
            <img class={item.locked ? 'blur-lg' : ''} src={item.image} alt={item.image} />
          </div>
        </div>
      {:else}
        <div class="avatar relative card xl:max-w-full xl:min-w-0 xl:w-full max-w-full min-w-[277px] w-full">
          <div class="rounded-[30px] h-[502px] f-center">
            <img class={item.locked ? 'blur-lg' : ''} src={item.image} alt={item.image} />
            <div
              class="absolute flex card-contents p-4 left-0 top-0 h-full w-full flex-col font-clash-grotesk display-small-medium text-white">
              {#each item.name.toUpperCase().split('') as letter}
                <div class="w-fit pink-glow">{letter}</div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .card {
    width: 100%;
    min-height: 400px;
    transition:
      width 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }

  .card:hover {
    width: 120%; /* Increase the width to 120% of its original size on hover */
    box-shadow: 0 0 10px 5px #e81899;
    border-radius: 30px;
    scale: 1.15;
    z-index: 100;
  }

  .card-contents {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .card-contents:hover {
    opacity: 1;
  }

  .pink-glow {
    filter: drop-shadow(2px 2px 1px #e81899);
  }
</style>
