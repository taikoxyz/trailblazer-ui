<script lang="ts">
  import { account } from '$stores/account';
  import { onMount } from 'svelte';

  import { web3modal } from '$libs/connect';
  console.log($account);

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
