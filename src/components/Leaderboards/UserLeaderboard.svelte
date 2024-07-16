<script lang="ts">
  import { Icon } from '$components/Icon';
  import { ExplorerLink } from '$components/Links';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { currentUserLeaderboard } from '$stores/leaderboard';
  let headers = ['Rank', 'Address', 'Points'];
</script>

<div class="overflow-x-auto lg:w-full px-8 mt-[18%] lg:mt-0">
  <div class="flex justify-between mb-4">
    <div class="font-clash-grotesk lg:text-[60px] text-[40px] leading-none lg:leading-relaxed">
      <span class="text-secondary">User</span> Leaderboard
    </div>
    <div class="body-small-regular lg:body-regular flex flex-col justify-center">
      <div>Complete trails, bridge,</div>
      <div>use Dapps to rank up.</div>
    </div>
  </div>
  <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
    <!-- head -->
    <thead>
      <tr>
        {#each headers as header}
          <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="rounded-lg">
      {#each $currentUserLeaderboard.items as entry, index}
        {@const rank = index + 1}
        {@const fillClass =
          rank === 1 ? 'fill-[#EBB222]' : rank === 2 ? 'fill-[#91969F]' : rank === 3 ? 'fill-[#775602]' : ''}
        <tr class="row h-12">
          <td class="">
            <div class="f-center gap-[12px]">
              <Icon type="trophy" {fillClass} />{rank}
            </div>
          </td>
          <td class="text-start table-cell lg:px-10 body-regular"
            ><ExplorerLink address={entry.address} linkText={shortenAddress(entry.address, 8, 16)} /></td>
          <td>{formatNumbers(Math.round(entry.score))}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
