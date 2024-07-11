<script lang="ts">
  import { Skeleton } from '$components/Mock';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { currentDefiDappLeaderboard } from '$stores/leaderboard';

  import DefiDappsHeader from './Header/DefiDappsHeader.svelte';
</script>

<div class="lg:w-full px-8 mt-[18%] lg:mt-0 space-y-[60px]">
  <DefiDappsHeader />
  <div class="overflow-x-auto">
    <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
      <!-- head -->
      <thead class="border-b-2 border-gray-800 ;">
        <tr>
          <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">No.</th>
          <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">Dapp</th>
          <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">TVL</th>
        </tr>
      </thead>
      <tbody class="rounded-lg">
        {#each $currentDefiDappLeaderboard.defiDappEntries as entry, i}
          <tr class="row h-12">
            <td class="lg:px-10 w-2">{i + 1}</td>
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
            <td class="lg:px-10 body-regular flex-col"> ${formatNumbers(Number(entry.taikoTvl).toFixed(2))} </td>
          </tr>
        {/each}
        {#if $currentDefiDappLeaderboard.defiDappEntries.length === 0}
          <tr class="row h-12">
            <td class="lg:px-10" colspan="3">No data available</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
