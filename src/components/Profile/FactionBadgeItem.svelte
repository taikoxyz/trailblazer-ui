<script lang="ts">
  import { FACTIONS, type FactionNames } from '$configs/badges';
  import claimBadge from '$libs/badges/claimBadge';
  import getMintSignature from '$libs/badges/getMintSignature';
  import type { UserFactionBadge } from '$libs/profile';
  import { account } from '$stores/account';

  import FactionImage from './FactionImage.svelte';

  export let name: FactionNames;
  export let unlocked: boolean = false;
  export let claimable: boolean = false;

  let disabled = '';
  let bg = "bg-[url('/src/public/images/booster-bg.svg')]";
  let blur = '';
  let shadow = '';

  $: if (unlocked) {
    disabled = 'hidden';
    bg = "bg-[url('/src/public/images/booster-bg.svg')]";
    blur = '';
  } else if (claimable) {
    disabled = 'border-transparent block';
    bg = "bg-[url('/src/public/images/booster-bg-disabled.svg')]";
    blur = 'blur-md';
    shadow = 'shadow-primary shadow-[0_0px_20px]';
  } else {
    disabled = 'btn-disabled border-transparent block';
    bg = "bg-[url('/src/public/images/booster-bg-disabled.svg')]";
    blur = 'blur-md';
  }

  async function handleClick() {
    if (claimable && $account && $account.address) {
      const signature = await getMintSignature($account.address, FACTIONS[name]);
      const res = await claimBadge($account.address, FACTIONS[name], signature);
      unlocked = true;
    }
  }
</script>

<div
  class="{shadow} flex w-full min-h-[351px] max-w-[306px] border-2 border-primary-border-hover rounded-[20px] bg-[#310E2F]">
  <div class="w-full relative pt-[28px] pb-[20px] px-[20px] flex flex-col justify-between">
    <div class="w-full flex flex-col items-center {blur}">
      <div>
        <FactionImage type={name} />
      </div>
    </div>
    <div class="absolute bottom-8 place-self-center w-full px-6">
      <button on:click={handleClick} class="btn btn-primary {disabled} btn-block">
        {claimable ? 'Claim' : 'Locked'}
      </button>
    </div>
  </div>
</div>
