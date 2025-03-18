<script lang="ts">
  import { Icon } from '$shared/components/Icon';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  // import MultiplierBadge from '../MultiplierBadge.svelte';

  export let token: NFT;
  // export let hideBubbles = false;
  export let locked = false;

  $: image = token.metadata.image as string;

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
    'flex',
    'items-center',
    'justify-center',
  );
  const imageWrapperClasses = classNames('relative', 'w-full', 'h-full', 'z-0', $$props.class);

  const imageClasses = classNames(
    'pointer-events-none',
    'rounded-[20px]',
    'absolute',
    'left-0',
    'top-0',
    'z-20',
    'w-full',
    locked ? 'blur-md' : null,
  );

  // const bubbleWrapperClasses = classNames(
  //   hideBubbles ? 'hidden' : 'block',
  //   'absolute',
  //   'top-[20px]',
  //   'right-[20px]',
  //   'flex',
  //   'flex-col',
  //   'justify-end',
  //   'items-end',
  //   'gap-[5px]',
  // );

  function prefixIpfsGateway(url: string) {
    if (url.startsWith('http') || url.startsWith('/')) {
      return url;
    }
    return `https://ipfs.io/ipfs/${url}`;
  }

  const lockedOverlayClasses = classNames('absolute', 'w-full', 'h-full', 'items-center', 'justify-center', 'f-col');
</script>

<div class={wrapperClasses}>
  <div class={imageWrapperClasses}>
    <img src={prefixIpfsGateway(image)} alt={`NFT #${token.tokenId}`} class={imageClasses} />
  </div>

  {#if locked}
    <div class={lockedOverlayClasses}>
      <Icon type="lock" size={80} />
      <span class="text-sm hidden lg:block">Max multiplier reached</span>
    </div>
  {/if}
</div>

<style>
  img {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
  }
</style>
