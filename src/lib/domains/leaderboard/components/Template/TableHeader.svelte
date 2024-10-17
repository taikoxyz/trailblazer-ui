<script lang="ts">
  export let headers: string[];
</script>

<thead class="border-b-2 border-gray-800">
  <tr>
    {#each headers as header, i}
      <th
        class="body-regular text-secondary-content pt-8 lg:px-10 {i === headers.length - 1
          ? 'text-right'
          : 'text-start'}">{header}</th>
    {/each}
  </tr>
</thead>
