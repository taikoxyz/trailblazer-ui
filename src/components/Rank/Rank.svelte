<script lang="ts">
  import { Leaderboard } from '$components/Table';
  let ranges = [{
    start: 0,
    end: 2714348799
  }, {
    start: 1713744000,
    end: 1714348799
  }];

  const toDate = (date: number) => {
    const d = new Date(date*1000)
    return d.getDate() + '/ ' + (d.getMonth()+1)
  };

</script>

<div class="flex flex-col w-full h-full items-center gap-8">
  <!-- Leaderboard -->
  <div role="tablist" class="tabs tabs-lifted w-full md:py-[80px]">
    {#each ranges as item, i (i)}
      <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label={i === 0 ? "Total": `${toDate(item.start)} to ${toDate(item.end)}`} checked={i === 0}/>
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6"><Leaderboard start={item.start} end={item.end}/></div>
    {/each}
  </div>
</div>
