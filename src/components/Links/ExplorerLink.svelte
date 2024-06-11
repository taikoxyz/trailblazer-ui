<script lang="ts">
  import { Icon } from '$components/Icon';
  import { shortenAddress } from '$libs/util/shortenAddress';

  export let address: string;
  export let shorten: boolean = false;
  let url = `https://taikoscan.io/address/${address}`;
</script>

<a class="underline body-bold flex align-center" target="_blank" href={url}>{shorten ? shortenAddress(address) : address}<Icon size={10} type='arrow-top-right'/></a>
