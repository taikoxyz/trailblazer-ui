<script lang="ts">
  import type { Address } from 'viem';

  import { type FactionNames, FACTIONS } from '$configs/badges';
  import claimBadge from '$libs/badges/claimBadge';
  import { account } from '$stores/account';

  import FactionImage from './FactionImage.svelte';

  export let name: FactionNames;
  export let unlocked: boolean = false;
  export let claimable: boolean = false;
  export let address: Address;

  let disabled = '';
  let blur = '';
  let shadow = '';

  $: if (unlocked) {
    disabled = 'hidden';
    blur = '';
  } else if (claimable) {
    disabled = 'border-transparent block';
    blur = 'blur-md';
    shadow = 'shadow-primary shadow-[0_0px_20px]';
  } else {
    disabled = 'btn-disabled border-transparent block';
    blur = 'blur-md';
  }

  $: isClaiming = false;
  async function handleClick() {
    if (claimable /*&& $account && $account.address*/) {
      try {
        disabled = 'btn-disabled border-transparent block';
        isClaiming = true;
        await claimBadge(address, FACTIONS[name]);
        unlocked = true;
      } catch (e) {
        console.error(e);
      } finally {
        isClaiming = false;
        disabled = '';
      }
    }
  }
</script>

<div
  class="{shadow} flex w-full min-h-[306px] max-w-[306px] border-2 border-primary-border-hover rounded-[20px] bg-[#310E2F]">
  <div class="w-full relative pt-[28px] pb-[20px] px-[20px] flex flex-col justify-between">
    <div class="w-full flex flex-col items-center {blur}">
      <div>
        <FactionImage {unlocked} type={name} />
      </div>
    </div>
    <div class="absolute bottom-8 place-self-center w-full px-6">
      {#if $account && $account.address && $account.address.toLowerCase() === address.toLowerCase()}
        <button on:click={handleClick} class="btn btn-primary {disabled} btn-block">
          {#if isClaiming}
            <span class="loading loading-spinner loading-md"></span>
          {:else}
            {claimable ? 'Claim' : 'Locked'}
          {/if}
        </button>
      {/if}
    </div>
  </div>
</div>
