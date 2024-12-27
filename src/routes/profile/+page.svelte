<script lang="ts">
  import { goto } from '$app/navigation';
  import { web3modal } from '$lib/shared/utils/connect';
  import { Page } from '$shared/components/Page';
  import { account } from '$shared/stores/account';

  function handleConnectWallet() {
    web3modal.open({ view: 'Connect' });
  }
  async function load() {
    if ($account && $account.address) {
      const location = `/profile/${$account.address}`;
      goto(location);
    } else {
      console.warn('no account!');
    }
  }

  $: $account, load();
</script>

<Page>
  {#if $account?.isConnected}
    <div class="skeleton w-full h-[75vh]"></div>
  {:else}
    <div class="flex w-full justify-center mt-[18%] lg:mt-0">
      <div
        class="h-fit flex flex-col rounded-[30px] lg:bg-gradient-background items-center justify-center lg:p-[50px] lg:max-w-[570px] w-full align-center">
        <div class="flex flex-col h-full w-full items-center justify-between break-words gap-12">
          <div class="flex flex-col gap-8 items-center w-full">
            <img src="/error/error.png" alt="not-eligible" class="size-[120px]" />
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
  {/if}
</Page>
