<script lang="ts">
  import { Icon } from '$components/Icon';
  import { Skeleton } from '$components/Mock';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { currentDefiDappLeaderboard } from '$stores/leaderboard';

  import DefiDappsHeader from './Header/DefiDappsHeader.svelte';
  import LastUpdated from './LastUpdated.svelte';

  let headers = ['No.', 'Dapp', 'TVL'];
</script>

<div class="lg:w-full px-8 mt-[18%] lg:mt-0 space-y-[50px]">
  <DefiDappsHeader />

  <!-- Competition Information -->
  <div class="f-center flex-col">
    <div class="flex gap-5">
      <img src="/leaderboard/defi/left-laser.svg" alt="left laser" class="hidden lg:block" />
      <div class="display-medium-medium text-center pb-[30px]">Join the DeFi competition starting July 15th!</div>
      <img src="/leaderboard/defi/right-laser.svg" alt="right laser" class="hidden lg:block" />
    </div>
    <div class="text-secondary-content body-regular text-center max-w-[485px] pb-[80px]">
      Compete for a month-long jackpot by increasing your TVL on DeFiLlama. Rewards will be based on performance
      throughout the competition, ending August 9th.
    </div>

    <div
      class="flex flex-col sm:flex-col lg:flex-row relative border-2 border-primary-border-hover rounded-3xl px-[90px] lg:px-[46px] pt-[90px] lg:pt-[58px] pb-[51px] gap-[30px] lg:gap-[83px]">
      <div
        class="f-col lg:block absolute border-2 body-bold border-primary-border-hover top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-4 min-w-[209px] rounded-full text-center bg-primary-background">
        <span> Prize Pool</span>
        <span class="text-primary-brand">175K TAIKO Tokens</span>
      </div>

      <div class="f-center gap-4 w-fit">
        <img src="/leaderboard/defi/first.svg" alt="100K TAIKO Tokens" class="size-[48px]" />
        <div class="flex flex-col">
          <span class="title-section-bold">100K</span>
          <span class="body-regular">TAIKO Tokens</span>
        </div>
      </div>
      <div class="f-center gap-4 w-fit">
        <img src="/leaderboard/defi/second.svg" alt="50K TAIKO Tokens" class="size-[48px]" />
        <div class="flex flex-col">
          <span class="title-section-bold">50K</span>
          <span class="body-regular">TAIKO Tokens</span>
        </div>
      </div>
      <div class="f-center gap-4 w-fit">
        <img src="/leaderboard/defi/third.svg" alt="25K TAIKO Tokens" class="size-[48px]" />
        <div class="flex flex-col">
          <span class="title-section-bold">25K</span>
          <span class="body-regular">TAIKO Tokens</span>
        </div>
      </div>
    </div>
  </div>

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
