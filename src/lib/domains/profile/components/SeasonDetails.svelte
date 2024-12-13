<script lang="ts">
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';

  const seasonSelectorWrapper = classNames(
    'f-row',
    'items-center',
    'gap-2',
    'w-full',
    'justify-center',
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
      start_date: '17 Sep 2024',
      end_date: '16 Dec 2024',
    },
    {
      id: 3,
      start_date: '16 Dec 2024',
      end_date: '17 Marc 2025',
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
  <span class="font-bold">Season {$activeSeason}</span>
  <span class="text-secondary-content text-sm">{getSeasonDetails()}</span>
</div>
