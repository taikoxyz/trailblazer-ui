<script lang="ts">
  let headers = ['Name', 'Job', 'Favorite Color'];
</script>

<div class="overflow-x-auto w-full">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        {#each headers as header}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="rounded-lg">
      <!-- row 1 -->
      <tr class="row">
        <td class="border rounded-l-lg p-2">Ganderton</td>
        <td>Quality Control Specialist</td>
        <td class="rounded-r-lg p-2">Blue</td>
      </tr>
      <!-- row 2 -->
      <tr>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Maybe refactor in the future -->
<style>
  tr.row {
    border-radius: 20px;
    border: 2px solid var(--grays-gray-200, #adb1b8);
    background: rgba(202, 203, 206, 0.15);
  }
</style>
