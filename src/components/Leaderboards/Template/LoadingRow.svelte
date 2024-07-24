<script lang="ts">
  import { Icon } from '$components/Icon';
  import Skeleton from '$components/Mock/Skeleton.svelte';
  import Spinner from '$components/Spinner/Spinner.svelte';
  export let rank: number;
  export let fillClass: string;
  export let showTrophy: boolean;
</script>

<tr class="row h-[88px] hover:bg-neutral-background">
  <td class="h-full table-cell body-bold w-1/12">
    <div class="f-center gap-[12px]">
      {#if showTrophy}
        <Icon type="trophy" {fillClass} />
      {/if}
      {rank}
    </div>
  </td>
  <td class="lg:px-10 w-6/12">
    <div class="flex gap-[20px] align-center">
      <div class="flex flex-col justify-around">
        <div class="flex gap-[20px] align-center">
          <Skeleton
            class="hidden lg:table-cell"
            width="w-12"
            height="h-12"
            bgColor="bg-pink-200"
            shineColor="bg-pink-100" />
          <div class="f-col justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  </td>
</tr>
