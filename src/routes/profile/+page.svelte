<script lang="ts">
  import { account } from '$stores/account';
  import NotEligibleImage from '$images/not-eligible.png';
  import { Page } from '$components/Page';
  import { onMount } from 'svelte';
  import { Profile } from '$components/Profile';

  import { web3modal } from '$libs/connect';
  console.log($account);

  function handleConnectWallet() {
    web3modal.open({ view: 'Connect' });
  }
  async function load() {
    if ($account && $account.address) {
      window.location.href = `/profile/${$account.address}`;
      console.log('redirecting', `/profile/${$account.address}`);
    } else {
      console.error('no account!');
      web3modal.open();
    }
  }

  $: $account, load();
</script>


<Page>
  {#if !$account?.isConnected}
  <div class="flex w-full justify-center">
    <div class="h-fit flex flex-col rounded-[30px] lg:bg-gradient-background items-center justify-center lg:p-[50px] lg:max-w-[570px] w-full align-center">
      <div class="flex flex-col h-full w-full items-center justify-between break-words gap-12">
        <div class="flex flex-col gap-8 items-center w-full">
          <img  src={NotEligibleImage} alt="not-eligible" class="size-[120px]" />
          <div class="display-small-medium text-center">Connect your wallet to view dashboard</div>
          <button
            on:click={handleConnectWallet}
            class="btn btn-primary btn-block rounded-full body-bold border-none min-w-[230px]"
            >Connect Wallet
          </button>
      </div>
    </div>
  </div>
  </div>
  {:else}
  <div class="skeleton w-full h-[75vh]"></div>
  {/if}
</Page>
