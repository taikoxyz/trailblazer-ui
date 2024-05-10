<script lang="ts">
  import { Icon } from '$components/Icon';
  import { web3modal } from '$libs/connect';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { account } from '$stores/account';

  function handleConnectWallet() {
    // Do not open if connection is active
    web3modal.open({ view: 'Connect' });
  }

  function handleConfigureWallet() {
    // Do not open if connection is active
    web3modal.open({ view: 'Account' });
  }
</script>

{#if !$account?.isConnected}
  <!-- Show Connect Wallet -->
  <button
    class="btn btn-primary border-0 text-primary-content rounded-full body-bold px-6 min-h-12 h-12 w-fit"
    on:click={handleConnectWallet}>
    <Icon type={'user-circle'} />
    Connect Wallet
  </button>
{:else}
  <!-- Show user address -->
  <button
    class="btn bg-neutral border-0 text-primary-content rounded-full body-bold px-6 min-h-12 h-12 w-fit"
    on:click={handleConfigureWallet}>
    <Icon type={'user-circle'} />
    {shortenAddress($account.address ?? 'undefined')}
  </button>
{/if}
