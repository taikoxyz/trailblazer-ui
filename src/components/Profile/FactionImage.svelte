<script lang="ts">
  import { FactionNames } from '$configs/badges';
  import { MovementNames, type Movements } from '$libs/badges/const';
  import type { Faction } from '$libs/profile';

  export let type: Faction;
  export let unlocked: boolean = false;
  export let movement: Movements = 0;

  const sources: Record<string, string[]> = {
    [FactionNames.Ravers]: [
      // neutral
      'bafybeib5k7vqni6iigzrldhq7emfansogqdg2lniaev7ha2qsj433puuay',
      // based
      'bafybeiantdftlxhy64zmsf522npqmd2ur3fvvbudy5o6vgmkw3kmlsdqxy',
      // boosted
      'bafybeieqjpwmheoxvngt7634a5p7zsvv74gn2i5ddyk7b4xkgeybcc7uuy',
    ],
    [FactionNames.Robots]: [
      // neutral
      'bafybeigc73i4i5f3drbwhrztpy2tyhxpriduhae5ic7voqy7l5ngezucs4',
      // based
      'bafybeihv6xsjtwybbumibwa6rimhd57ar2qy25etlk64d4k37m4xdaqeom',
      // boosted
      'bafybeigh6ow5366rf42l2wb5xcvgxxytuty4qcski47rhqtyfrs6l633jq',
    ],
    [FactionNames.Bouncers]: [
      // neutral
      'bafybeidjzeiwovs62xna36bpwjwc6kfku2yoemsqxomq3vvalz7sr4e7uq',
      // based
      'bafybeieetylyaze564l4dqg64os73dgi2njvum5akzrh4pfisp3yorlwlm',
      // boosted
      'bafybeib6afcp2ll26fww4okjvs6j6oldme6kitxygibx46bj2huuqwefmy',
    ],
    [FactionNames.Masters]: [
      // neutral
      'bafybeigtpmucvju4ip3h6lkdfbu4maxqtzeolnjv5zrsrjdkww2wcjikhi',
      // based
      'bafybeiam7pmx2agypdherm4huekdougmejoufc3hry3qtr5zmgqzwundsi',
      // boosted
      'bafybeibxuki7nfn3aexscl7xslyfifqwu2klblmf4s2lb5fvcjsh2vmepi',
    ],
  };

  let videoSrc = '';
  $: movement, (videoSrc = setVideoSrc());
  $: type, (videoSrc = setVideoSrc());

  $: videoPoster = '';

  function setVideoSrc() {
    if (movement < 0) return '';
    videoPoster = getVideoPoster();
    return `https://taikonfts.4everland.link/ipfs/${sources[type][movement]}`;
  }

  function getVideoPoster() {
    return `/factions/${type.toLowerCase()}/${MovementNames[movement].toLowerCase()}.png`;
  }
</script>

<div class="relative w-full h-full z-0">
  {#if videoSrc}
    <video poster={videoPoster} loop autoplay={unlocked} class="rounded-[20px] absolute left-0 top-0 z-20">
      <track kind="captions" />
      {#if videoSrc}
        <source src={videoSrc} type="video/mp4" />
      {/if}
      Your browser does not support the video tag.
    </video>
  {:else}
    <img alt={`${MovementNames[movement]} Badge`} src={videoPoster} />
  {/if}
</div>
