<script lang="ts">
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  export let token: NFT;

  $: image = token.metadata.image as string;
  $: name = token.metadata.name as string;
  // CSS classes
  const wrapperClasses = classNames(
    'w-[277px]',
    'relative',
    'overflow-hidden',
    'flex',
    'w-full',
    'aspect-square',
    'rounded-[30px]',
    'bg-[#310E2F]',
    'transition-all',
  );
  const imageWrapperClasses = classNames('relative', 'w-full', 'h-full', 'z-0');

  const imageClasses = classNames(
    'pointer-events-none',
    'rounded-[20px]',
    'absolute',
    'left-0',
    'top-0',
    'z-20',
    'w-full',
  );

  const bubbleWrapperClasses = classNames(
    'absolute',
    'top-[20px]',
    'right-[20px]',
    'flex',
    'flex-col',
    'justify-end',
    'items-end',
    'gap-[5px]',
  );
  const bubbleClasses = classNames(
    'badge',
    'py-[15px]',
    'px-[12px]',
    'text-[16px]/[24px]',
    'font-[700]',
    'border-transparent',
    'bg-[rgba(0,0,0,.4)]',
  );

  function prefixIpfsGateway(url: string) {
    if (url.startsWith('http') || url.startsWith('/')) {
      return url;
    }
    return `https://ipfs.io/ipfs/${url}`;
  }
</script>

<div class={wrapperClasses}>
  <div class={imageWrapperClasses}>
    <img src={prefixIpfsGateway(image)} alt={`NFT #${token.tokenId}`} class={imageClasses} />
  </div>

  <div class={bubbleWrapperClasses}>
    {#if token.metadata.name}
      <div class={bubbleClasses}>{name}</div>
    {/if}
  </div>
</div>

<style>
  img {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
  }
</style>
