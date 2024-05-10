<script lang="ts">
  import type { UserBooster } from '$libs/profile';

  import BoosterIcon from './BoosterIcon.svelte';

  export let data: UserBooster;
  let disabled = '';
  let bg = "bg-[url('/src/public/images/booster-bg.svg')]";
  let blur = "bg-[url('/src/public/images/booster-bg.svg')]";

  $: if (data.unlocked) {
    disabled = '';
    bg = "bg-[url('/src/public/images/booster-bg.svg')]";
    blur = '';
  } else {
    disabled = 'btn-disabled border-transparent';
    bg = "bg-[url('/src/public/images/booster-bg-disabled.svg')]";
    blur = 'blur-md';
  }
</script>

<div class="flex w-full min-h-[351px] max-w-[306px]">
  <div class="flex w-full h-full {bg} bg-no-repeat bg-cover">
    <div class="w-full pt-[28px] pb-[20px] px-[20px] flex flex-col justify-between">
      <div class="w-full flex flex-col justify-between {blur}">
        <div class="absolute z-10 px-[10px] py-[5px] body-bold rounded-full bg-purple-600 place-self-start">
          {data.boost}x Boost
        </div>
        <div class="flex flex-col w-full h-full items-center justify-between pb-[20px]">
          <div class=" ">
            <BoosterIcon type={data.type} />
          </div>
          <div class="display-small-medium text-center">
            {data.title}
          </div>
        </div>
      </div>
      <div class="w-full place-self-end mb-0">
        <button class="btn btn-primary {disabled} btn-block">Earn Booster</button>
      </div>
    </div>
  </div>
</div>
