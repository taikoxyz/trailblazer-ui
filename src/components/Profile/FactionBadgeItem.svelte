<script lang="ts">
  import type { UserFactionBadge } from '$libs/profile';

  import FactionImage from './FactionImage.svelte';

  export let data: UserFactionBadge;
  let disabled = '';
  let bg = "bg-[url('/src/public/images/booster-bg.svg')]";
  let blur = '';
  let shadow = '';

  $: if (data.unlocked) {
    disabled = 'hidden';
    bg = "bg-[url('/src/public/images/booster-bg.svg')]";
    blur = '';
  } else if (data.claimable) {
    disabled = 'border-transparent block';
    bg = "bg-[url('/src/public/images/booster-bg-disabled.svg')]";
    blur = 'blur-md';
    shadow = 'shadow-primary shadow-[0_0px_50px]';
  } else {
    disabled = 'btn-disabled border-transparent block';
    bg = "bg-[url('/src/public/images/booster-bg-disabled.svg')]";
    blur = 'blur-md';
  }
</script>

<div
  class="{shadow} flex w-full min-h-[351px] max-w-[306px] border-2 border-primary-border-hover rounded-[20px] bg-[#310E2F]">
  <div class="w-full relative pt-[28px] pb-[20px] px-[20px] flex flex-col justify-between">
    <div class="w-full flex flex-col items-center {blur}">
      <div>
        <FactionImage type={data.faction} />
      </div>
    </div>
    <div class="absolute bottom-8 place-self-center w-full px-6">
      <button class="btn btn-primary {disabled} btn-block">
        {data.claimable ? 'Claim' : 'Locked'}
      </button>
    </div>
  </div>
</div>
