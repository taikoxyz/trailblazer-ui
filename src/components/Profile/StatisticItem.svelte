<script lang="ts">
  type Statistic = {
    description: string;
    value: string;
  };

  export let statistic: Statistic = {
    description: 'transactions',
    value: '420',
  };
</script>

<div class="flex p-[10px] bg-neutral rounded-[10px] gap-3">
  <div class="skeleton bg-green-50 rounded-full size-4"></div>
  <div class="flex flex-col gap-1">
    <div class="body-bold leading-none">{statistic.value}</div>
    <div class="body-regular text-secondary-content leading-none">{statistic.description}</div>
  </div>
</div>
