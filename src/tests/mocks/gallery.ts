import RaverFaction from '$images/factions/faction-gallery-1.png';

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
    image: RaverFaction,
    name: 'Ravers',
    locked: true,

  },
  {
    image: RaverFaction,
    name: 'Ravers',
    locked: true,

  },
  {
    image: RaverFaction,
    name: 'Ravers',
    locked: true,
  },
  {
    image: RaverFaction,
    name: 'Ravers',
    locked: true,
  },
  {
    image: RaverFaction,
    name: 'Ravers',
    locked: true,
  },
  {
    image: RaverFaction,
    name: 'Ravers',
    locked: true,
  },
  {
    image: RaverFaction,
    name: 'Ravers',
    locked: true,
  },
];
