<script lang="ts">
  import Skeleton from '$components/Mock/Skeleton.svelte';
  import { MOCK_USER_TRANSACTIONS } from 'src/tests/mocks/userTransactions';

  let headers = ['Activity Name', 'Points', 'Date & Time'];

  let transactions = MOCK_USER_TRANSACTIONS;
</script>

<div class="border-collapse w-full border-none">
  <div class=" px-[55px]">
    <table class="table w-full border-collapse">
      <thead class="border-none bg-none">
        <tr class="border-none">
          {#each headers as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
    </table>
  </div>

  <div class="overflow-scroll max-h-[529px] block bg-elevated-background rounded-2xl px-[55px] py-[20px]">
    <table class="table w-full border-collapse bg-elevated-background">
      <tbody class="border-none pt-6 overflow-scroll">
        {#each transactions as transaction, i}
          <tr class="border-none">
            <td class="flex gap-2 items-center">
              <Skeleton width="w-4" height="h-4" bgColor="bg-blue-200" shineColor="bg-blue-100" />
              {transaction.activityName}
            </td>
            <td>{transaction.points}</td>
            <td>{transaction.date.toLocaleString()}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  th,
  td {
    min-height: 60px;
    border: none;
    text-align: left;
  }

  thead,
  tbody,
  tr {
    display: table;
    width: 100%;
    table-layout: fixed; /* Helps in keeping column width consistent */
  }
  thead {
    background-color: none;
  }
</style>
