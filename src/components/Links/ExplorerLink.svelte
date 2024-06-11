<script lang="ts">
  import { shortenAddress } from '$libs/util/shortenAddress';

  export let address: string;
  export let shorten: boolean = false;
  let url = `https://taikoscan.io/address/${address}`;
</script>

<a class="underline body-bold" target="_blank" href={url}>{shorten ? shortenAddress(address) : address}</a>
