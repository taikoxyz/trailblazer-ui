<script lang="ts">
  import { Icon } from '$shared/components/Icon';
  import { Tooltip } from '$shared/components/Tooltip';
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
  ];

  const getSeasonDetails = () => {
    // based on $activeSeason get the details (match id)
    const currentSeason = seasons.find((season) => season.id === $activeSeason);
    return currentSeason ? `${currentSeason.start_date} - ${currentSeason.end_date}` : 'N/A';
  };
  const tooltipContentClasses = classNames('bg-white', 'text-black');
  $: $activeSeason && getSeasonDetails();
</script>

<div class={seasonSelectorWrapper}>
  <div class="font-bold f-row gap-1">
    <span>Season {$activeSeason}</span>

    <Tooltip position="bottom">
      <div class={tooltipContentClasses}>
        <h2 class="text-black">Season selector soon</h2>
        <div class="body-regular text-black">
          We are working on a way to let you view your previous season's statistics. Stay tuned!
        </div>
      </div>
    </Tooltip>
    <Icon type="chevron-down" size={14} class="min-w-[20px] self-center" />
  </div>
  <span class="text-secondary-content text-sm">{getSeasonDetails()}</span>
</div>
