<script lang="ts">
  import { Icon, LockIcon } from '$components/Icon';
  import { classNames } from '$libs/util/classNames';

  import { type GalleryItem } from './types';

  export let arrowClasses: string = '';
  let carouselElement: HTMLDivElement;

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
      locked: false,
    },
    {
      image: '/factions/gallery/bouncer.png',
      name: 'Bouncers',
      description:
        'The controlling government of Neo Nakuza is trying to keep the city kids under wraps and are very concerned about the burgeoning Based scene taking over the city. They have deployed clandestine sentinel bouncers to keep an eye on the proceedings.',
      locked: false,
    },
    {
      image: '/factions/gallery/master.png',
      name: 'Masters',
      description:
        'The old Taiko Masters have heard the new beats on the streets and recognise their origins as their own, they’re intrigued to learn what the new kids are up to, and so bring their depth of knowledge of the genre as both mentors and masters.',
      locked: false,
    },
    {
      image: '/factions/gallery/monk.png',
      name: 'Monks',
      description:
        "The city's Monks and Postulants have been blessing the dance floor with their arcane knowledge and sacred rhythms bringing sacrament to the rave.",
      locked: false,
    },
    {
      image: '/factions/gallery/drummer.png',
      name: 'Drummers',
      description:
        'Our drum leaders bring the very latest patterns to the rave to have us all beating in unison along with the DJ drumming up a frenzy as the ravers ‘Get Boosted’.',

      locked: false,
    },
    {
      image: '/factions/gallery/android.png',
      name: 'Androids',
      description:
        'Dealers in underground boosted technology the Androids are constantly updating their kernel and neural vapourware, they’ll help you keep the vibe alive.',
      locked: false,
    },
    {
      image: '/factions/gallery/shinto.png',
      name: 'Shinto',
      description:
        'Ethereal beings have been spotted around the city temples drawn into Neo Nakuza by the call of taiko. Will you answer the call?',
      locked: false,
    },
  ];

  function scrollLeft() {
    carouselElement.scrollBy({ left: -1200, behavior: 'smooth' }); // Adjust -300 to the size of your carousel items or desired scroll amount
  }

  function scrollRight() {
    carouselElement.scrollBy({ left: 1200, behavior: 'smooth' }); // Adjust 300 similarly
  }

  $: navButtonsWrapperClasses = classNames(
    'flex',
    'gap-4',

    'h-full',
    'bottom-0',
    arrowClasses ? arrowClasses : classNames('justify-center', 'xl:justify-end'),
  );

  const leftButtonClasses = classNames('f-center', 'btn-circle', 'border', 'border-primary-brand');
  const rightButtonClasses = classNames(
    'f-center',
    'btn-circle',
    'bg-primary-brand',
    'border-primary-brand',
    'hover:bg-primary-interactive-hover',
  );

  const carouselWrapperClasses = classNames(
    //'max-w-full',
    'relative',
    'w-[100vw]',
    'flex',
    'justify-center',
    'items-center',
    'h-[500px]',
  );
  const carouselClasses = classNames(
    'absolute',
    'carousel',
    'flex',
    'gap-[25px]',
    'xl:ml-0',
    'w-full',
    'overflow-x-scroll',
    'xl:overflow-scroll',
    'xl:overflow-y-visible',
    'px-0',
    'hide-scrollbar',
    'xl:px-0',
    'xl:py-[60px]',
    'py-4',
  );
</script>

<div class={navButtonsWrapperClasses}>
  <button class={leftButtonClasses} on:click={scrollLeft}>
    <Icon class="-translate-x-[2px]" type="chevron-left" />
  </button>
  <button class={rightButtonClasses} on:click={scrollRight}>
    <Icon class="translate-x-[2px]" type="chevron-right" />
  </button>
</div>

<div class={carouselWrapperClasses}>
  <div bind:this={carouselElement} class={carouselClasses}>
    <!-- Cards -->
    {#each items as item, i}
      {#if i == 0}
        <!-- spacer -->
        <div class="flex min-w-[10px] xl:min-w-0"></div>
      {/if}

      {#if item.locked}
        <div class="avatar relative xl:max-w-full xl:min-w-[312px] xl:w-full max-w-full min-w-[277px] w-full">
          <div class="rounded-[30px] h-[502px]">
            <div class="absolute z-10 w-full h-full f-center">
              <LockIcon />
            </div>
            <img class={item.locked ? 'blur-lg' : ''} src={item.image} alt={item.image} />
          </div>
        </div>
      {:else}
        <div class="avatar relative card xl:max-w-full xl:min-w-[312px] xl:w-full max-w-full min-w-[277px] w-full">
          <div class="rounded-[30px] h-[502px] f-center">
            <img class={item.locked ? 'blur-lg' : ''} src={item.image} alt={item.image} />
            <div
              class="absolute flex card-contents p-[40px] left-0 top-0 h-full w-full flex-col font-clash-grotesk display-small-medium text-white">
              <div class="flex flex-col justify-center h-full gap-[40px]">
                <div class="text-primary-content">{item.name}</div>
                <div class="text-secondary-content body-regular">{item.description}</div>
              </div>
            </div>
          </div>
        </div>
      {/if}
      {#if i == items.length - 1}
        <!-- spacer -->
        <div class="flex min-w-[10px] xl:min-w-0"></div>
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
    border-radius: 30px;
    border: 3px solid transparent;

    transition:
      width 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out,
      border 0.1s ease-in-out;
  }

  .card:hover {
    box-shadow: 0 0 10px 5px #e81899;
    border: 3px solid var(--border-dark-hover, #ff6fc8);
    z-index: 100;
  }

  .card-contents {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 30px;
  }

  .card-contents:hover {
    opacity: 1;
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.5); /* Darken background */
  }
</style>
