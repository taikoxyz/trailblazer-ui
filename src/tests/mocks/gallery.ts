import RaverFaction from '$images/factions/faction-gallery-1.png';
import RobotFaction from '$images/factions/faction-gallery-2.png';
import BouncerFaction from '$images/factions/faction-gallery-3.png';
import MasterFaction from '$images/factions/faction-gallery-4.png';
import MonkFaction from '$images/factions/faction-gallery-5.png';
import DrummerFaction from '$images/factions/faction-gallery-6.png';
// import AndroidFaction from '$images/factions/faction-gallery-7.png';
// import ShintoFaction from '$images/factions/faction-gallery-8.png';

export type GalleryItem = {
  image: string;
  name: string;
  locked: boolean;
};

export const MOCK_FACTION_GALLERY: GalleryItem[] = [
  {
    image: RaverFaction,
    name: 'Ravers',
    locked: false,
  },
  {
    image: RobotFaction,
    name: 'Robots',
    locked: true,
  },
  {
    image: BouncerFaction,
    name: 'Bouncers',
    locked: true,
  },
  {
    image: MasterFaction,
    name: 'Masters',
    locked: true,
  },
  {
    image: MonkFaction,
    name: 'Monks',
    locked: true,
  },
  {
    image: DrummerFaction,
    name: 'Drummers',
    locked: true,
  },
  // {
  //   image: AndroidFaction,
  //   name: 'Androids',
  //   locked: true,
  // },
  // {
  //   image: ShintoFaction,
  //   name: 'Shinto',
  //   locked: true,
  // },
];
