<script lang="ts">
  import { account } from '$stores/account';

  import ProfileIcon from '$images/user-icon.svg';

  import Button from './Button.svelte';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { web3modal } from '$libs/connect';
  import { Icon } from '$components/Icon';

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
    <Icon type={'user'} />
    Connect Wallet
  </button>
{:else}
  <!-- Show user address -->
  <button
    class="btn bg-neutral border-0 text-primary-content rounded-full body-bold px-6 min-h-12 h-12 w-fit"
    on:click={handleConfigureWallet}>
    <Icon type={'user'} />
    {shortenAddress($account.address ?? 'undefined')}
  </button>
{/if}
