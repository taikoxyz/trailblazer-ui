<script lang="ts">
  import { Icon } from '$components/Icon';
  import { DefiCompetitionInformation } from '$components/Leaderboards/Competition/DefiCompetition';
  import { Skeleton } from '$components/Mock';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { currentDefiDappLeaderboard } from '$stores/leaderboard';

  import DefiDappsHeader from './Header/DefiDappsHeader.svelte';
  import LastUpdated from './LastUpdated.svelte';

  let headers = ['No.', 'Dapp', 'TVL'];
</script>

<div class="lg:w-full px-8 mt-[18%] lg:mt-0 space-y-[50px]">
  <DefiDappsHeader />
  <DefiCompetitionInformation />

  <div class="space-y-[20px]">
    <div class="flex justify-center lg:justify-end m-0">
      <LastUpdated class="w-fit" lastUpdated={new Date($currentDefiDappLeaderboard.lastUpdated * 1000)} />
    </div>
    <div class="overflow-x-auto">
      <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
        <!-- head -->
        <thead class="border-b-2 border-gray-800 ;">
          <tr>
            {#each headers as header}
              <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">{header}</th>
            {/each}
          </tr>
        </thead>
        <tbody class="rounded-lg">
          {#each $currentDefiDappLeaderboard.protocols as entry, i}
            {@const rank = i + 1}
            {@const fillClass =
              rank === 1 ? 'fill-[#EBB222]' : rank === 2 ? 'fill-[#91969F]' : rank === 3 ? 'fill-[#775602]' : ''}

            <tr class="row h-12 hover:bg-neutral-background">
              <td class=" h-full table-cell body-bold">
                <div class="flex gap-[12px]">
                  <Icon type="trophy" {fillClass} />
                  {rank}
                </div>
              </td>
              <td class="lg:px-10">
                <div class="flex gap-[20px] align-center">
                  {#if entry.logo}
                    <img src={entry.logo} alt="icon" class="size-12 rounded-full" />
                  {:else}
                    <Skeleton
                      class="hidden lg:table-cell"
                      width="w-12"
                      height="h-12"
                      bgColor="bg-pink-200"
                      shineColor="bg-pink-100" />
                  {/if}
                  <div class="flex flex-col justify-around">
                    <div class="body-bold">{entry.name ? entry.name : entry.name}</div>
                    {#if entry.twitter}
                      <a
                        class="text-primary-link underline text-[14px]/[20px]"
                        target="_blank"
                        href="https://twitter.com/{entry.twitter}">@{entry.twitter ? entry.twitter : entry.name}</a>
                    {/if}
                  </div>
                </div>
              </td>
              <td class="lg:px-10 body-bold flex-col"> ${formatNumbers(Number(entry.taikoTvl).toFixed(2))} </td>
            </tr>
          {/each}
          {#if $currentDefiDappLeaderboard.protocols.length === 0}
            <tr class="row h-12">
              <td class="lg:px-10" colspan="3">No data available</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
