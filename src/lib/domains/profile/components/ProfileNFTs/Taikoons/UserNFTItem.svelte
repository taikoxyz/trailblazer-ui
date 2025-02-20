<script lang="ts">
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import getNftImage from '$shared/utils/nfts/getNftImage';

  import MultiplierBadge from '../MultiplierBadge.svelte';

  export let token: NFT;

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
</script>

<div class={wrapperClasses}>
  <div class={imageWrapperClasses}>
    <img src={getNftImage(token)} alt={`NFT #${token.tokenId}`} class={imageClasses} />
  </div>

  <div class={bubbleWrapperClasses}>
    <MultiplierBadge {token} />
  </div>
</div>

<style>
  img {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
  }
</style>
