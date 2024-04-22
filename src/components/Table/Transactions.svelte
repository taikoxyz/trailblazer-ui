<script lang="ts">
  let headers = ['Activity Name', 'Points', 'Date & Time'];
</script>

<div class="border-collapse w-full border-none">
  <table class="table w-full border-collapse">
    <thead class="border-none bg-none">
      <tr class="border-none">
        {#each headers as header}
          <th class="w-[300px] items-start justify-start text-start">{header}</th>
        {/each}
      </tr>
    </thead>
  </table>

  <div class="overflow-scroll max-h-24 block bg-elevated-background rounded-2xl">
    <table class="table w-full border-collapse bg-elevated-background">
      <!-- head -->

      <tbody class="border-none pt-6 overflow-scroll">
        <!-- row 1 -->
        <tr class="border-none w-[300px]">
          <td class="pt-6">Gandertsson</td>
          <td class="pt-6">Quality Control Specialist</td>
          <td class="pt-6">B2ue</td>
        </tr>

        <tr class="border-none w-[300px]">
          <td class="">Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>B2ue</td>
        </tr>
        <tr class="border-none w-[300px]">
          <td>Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>B2ue</td>
        </tr>
        <tr class="border-none w-[300px]">
          <td>Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>B2ue</td>
        </tr>
        <tr class="border-none">
          <td class="">Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>B2ue</td>
        </tr>
        <!-- row 2 -->
        <tr class="border-none">
          <td class="pb-6">Ganderton</td>
          <td class="pb-6">Quality Control Specialist</td>
          <td class="pb-6">B2ue</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  th,
  td {
    padding: 8px;
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
