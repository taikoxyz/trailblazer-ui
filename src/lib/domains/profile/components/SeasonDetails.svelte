<script lang="ts">
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';

  const seasonSelectorWrapper = classNames(
    'f-row',
    'items-center',
    'gap-[20px]',
    'w-full',
    'justify-center',
    'lg:justify-start',
    'px-[6px]',
    'py-[12px]',
    'mb-[-18px]',
  );
  type SeasonType = {
    id: number;
    start_date: string;
    end_date: string;
  };
  let seasons: SeasonType[] = [
    {
      id: 2,
      start_date: 'Sep 17th 2024',
      end_date: 'Dec 16th 2024',
    },
    {
      id: 3,
      start_date: 'Dec 16th. 2024',
      end_date: 'March 17th 2025',
    },
    {
      id: 4,
      start_date: 'March 17th 2025',
      end_date: 'June 16th 2025',
    },
    {
      id: 5,
      start_date: 'June 16th 2025',
      end_date: 'Sep 15th 2025',
    },
  ];

  const getSeasonDetails = () => {
    // based on $activeSeason get the details (match id)
    const currentSeason = seasons.find((season) => season.id === $activeSeason);
    return currentSeason ? `${currentSeason.start_date} - ${currentSeason.end_date}` : 'N/A';
  };
  $: $activeSeason && getSeasonDetails();
</script>

<div class={seasonSelectorWrapper}>
  <div class="font-bold f-row gap-1">
    <span>Season {$activeSeason}</span>
  </div>
  <span class="text-secondary-content text-sm">{getSeasonDetails()}</span>
</div>
