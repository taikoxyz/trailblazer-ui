<script lang="ts">
  let headers = ['Activity Name', 'Points', 'Date & Time'];
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
        <tr class="border-none">
          <td>Gandertsson</td>
          <td>Quality Control Specialist</td>
          <td>B2ue</td>
        </tr>

        <tr class="border-none">
          <td class="">Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>B2ue</td>
        </tr>
        <tr class="border-none">
          <td>Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>B2ue</td>
        </tr>
        <tr class="border-none">
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
          <td>Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>B2ue</td>
        </tr>
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
