<script lang="ts">
  import { Icon } from '$shared/components/Icon';
  import Skeleton from '$shared/components/Mock/Skeleton.svelte';
  import Spinner from '$shared/components/Spinner/Spinner.svelte';
  export let rank: number;
  export let fillClass: string;
  export let showTrophy: boolean;

  const rowClass = 'row h-[80px] hover:bg-neutral-background';
  const rankCellClass = 'h-full table-cell body-bold w-1/12';
  const rankDivClass = 'f-center gap-[12px]';
  const mainCellClass = 'lg:px-10 w-6/12';
  const mainDivClass = 'flex gap-[20px] align-center';
  const innerDivClass = 'flex flex-col justify-around';
  const skeletonClass = 'hidden lg:table-cell';
  const spinnerDivClass = 'f-col justify-center';
</script>

<tr class={rowClass}>
  <td class={rankCellClass}>
    <div class={rankDivClass}>
      {#if showTrophy}
        <Icon type="trophy" {fillClass} />
      {/if}
      {rank}
    </div>
  </td>
  <td class={mainCellClass}>
    <div class={mainDivClass}>
      <div class={innerDivClass}>
        <div class={mainDivClass}>
          <Skeleton class={skeletonClass} width="w-12" height="h-12" bgColor="bg-pink-200" shineColor="bg-pink-100" />
          <div class={spinnerDivClass}>
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  </td>
</tr>
