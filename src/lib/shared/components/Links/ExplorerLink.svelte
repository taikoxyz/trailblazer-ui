<script lang="ts">
  import { Icon } from '$shared/components/Icon';
  import { shortenAddress } from '$shared/utils/shortenAddress';

  export let address: string;
  export let shorten: boolean = false;
  export let linkText: string = '';

  $: url = `https://taikoscan.io/address/${address}`;
</script>

<a class="link flex align-center gap-1" target="_blank" href={url}>
  {#if linkText}
    <span>{linkText}</span>
  {:else}
    {shorten ? shortenAddress(address, 8, 4) : address}
  {/if}
  <Icon size={10} type="arrow-top-right" />
</a>
