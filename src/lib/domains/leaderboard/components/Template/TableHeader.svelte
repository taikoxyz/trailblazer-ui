<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  export let headers: string[];

  // body-regular text-secondary-content pt-8 lg:px-10 border-b-2 border-gray-800
  //
  const headerClasses = classNames(
    'body-regular',
    'text-secondary-content',
    'pt-8',
    'lg:px-10',
    'border-b-2',
    'border-gray-800',
  );
</script>

<thead>
  <tr>
    {#each headers as header, i}
      <th class={classNames(headerClasses, i === headers.length - 1 ? 'text-right' : 'text-start')}>{header} </th>
    {/each}
  </tr>
</thead>
