<script lang="ts">
  import type { Address, Hash } from 'viem';

  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';
  import { shortenAddress } from '$shared/utils/shortenAddress';

  type ExplorerCategory = 'address' | 'transaction' | 'token' | 'contract';

  export let urlParam: Hash | Address;
  export let category: ExplorerCategory = 'address';
  export let shorten: boolean = false;
  export let linkText: string = '';
  export let noIcon = false;

  $: url = `https://www.taikoscan.io/${category}/${urlParam}`;
</script>

<a
  class={classNames('link flex align-center gap-1', $$props.class)}
  target="_blank"
  href={url}
  rel="noopener noreferrer">
  {#if linkText}
    <span>{linkText}</span>
  {:else if shorten}
    {shortenAddress(urlParam, 6, 4)}
  {:else}
    {urlParam}
  {/if}
  {#if !noIcon}
    <Icon size={10} type="arrow-top-right" />
  {/if}
</a>
