<script lang="ts">
  import Skeleton from '$components/Mock/Skeleton.svelte';

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
  <Skeleton width="w-4" height="h-4" bgColor="bg-green-50" shineColor="bg-green-10" />
  <div class="flex flex-col gap-1">
    <div class="body-bold leading-none">{statistic.value}</div>
    <div class="body-regular text-secondary-content leading-none">{statistic.description}</div>
  </div>
</div>
