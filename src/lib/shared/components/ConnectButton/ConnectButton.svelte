<script lang="ts">
  import { type PublicStateControllerState } from '@reown/appkit';
  import { onDestroy, onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import { getChainImage } from '$lib/shared/utils/chain';
  import { web3modal } from '$lib/shared/utils/connect';
  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { account } from '$shared/stores/account';
  import { ethBalance } from '$shared/stores/balance';
  import { connectedSourceChain } from '$shared/stores/network';
  import { refreshUserBalance, renderEthBalance } from '$shared/utils/balance';
  import { noop } from '$shared/utils/noop';
  import { shortenAddress } from '$shared/utils/shortenAddress';

  let web3modalOpen = false;
  let unsubscribeWeb3Modal = noop;

  function connectWallet() {
    if (web3modalOpen) return;
    web3modal.open();
  }

  function onWeb3Modal(state: PublicStateControllerState) {
    web3modalOpen = state.open;
  }

  $: currentChainId = $connectedSourceChain?.id;
  $: accountAddress = $account?.address || '';

  $: balance = $ethBalance || 0n;

  onMount(async () => {
    unsubscribeWeb3Modal = web3modal.subscribeState(onWeb3Modal);
    await refreshUserBalance();
  });

  onDestroy(unsubscribeWeb3Modal);
</script>

{#if $account?.isConnected}
  <!-- Connected State -->
  <button
    on:click={connectWallet}
    class="rounded-full flex justify-between items-center pl-[24px] lg:pl-[8px] pr-[3px] py-1 lg:max-h-[44px] xl:min-h-[40px] w-[250px] wc-parent-glass !border-solid gap-2 font-bold font-clash-grotesk lg:font-public-sans {$$props.class}">
    <div class="flex gap-2">
      <img
        alt="chain icon"
        class="w-[24px]"
        src={(currentChainId && getChainImage(currentChainId)) || '/chains/ethereum.svg'} />
      <span
        class="flex items-center text-primary-content lg:text-secondary-content justify-self-start gap-4 font-normal lg:font-bold text-[22px] lg:text-sm"
        >{renderEthBalance(balance, 3)}
      </span>
    </div>
    <span
      class="flex items-center text-secondary-content lg:text-tertiary-content btn-glass-bg rounded-full px-[10px] py-[19px] lg:py-[4px] min-h-[65px] xl:min-h-[38px] bg-interactive-primary font-normal lg:font-bold font-medium text-[22px] lg:text-sm">
      {shortenAddress(accountAddress, 4, 4)}
    </span>
  </button>
{:else}
  <!-- Disconnected State -->
  <ActionButton
    priority="primary"
    class="lg:!max-w-[215px] max-h-[75px] {$$props.class} lg:!f-items-center font-clash-grotesk lg:max-h-[44px] xl:min-h-[40px] !min-w-[250px] py-[24px] px-[24px] lg:py-[0px] w-full justify-start"
    loading={web3modalOpen}
    on:click={connectWallet}>
    <div class="flex items-center lg:body-regular text-[22px] font-medium space-x-2">
      {#if web3modalOpen}
        <span>{$t('wallet.status.connecting')}</span>
      {:else}
        <Icon type="user-circle" class="size-[24px] lg:size-[20px]" fillClass="fill-white" />
        <span>{$t('wallet.connect')}</span>
      {/if}
    </div>
  </ActionButton>
{/if}

<!-- TODO: move to css -->
<style>
  .wc-parent-glass {
    background: rgba(255, 255, 255, 0.02);
    transition: background 0.3s ease-in-out;
    border: 1px solid rgb(255 255 255 / 5%);
    &:hover {
      background: rgb(255 255 255 / 5%);
    }
  }
  .btn-glass-bg {
    border: 1px solid rgb(255 255 255 / 5%);
    background: rgb(255 255 255 / 5%);
  }
</style>
