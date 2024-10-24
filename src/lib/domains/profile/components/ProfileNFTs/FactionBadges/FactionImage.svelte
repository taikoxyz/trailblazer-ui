<script lang="ts">
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  export let token: NFT;

  const wrapperClasses = classNames('relative', 'w-full', 'h-full', 'z-0', 'aspect-square');

  const videoClasses = classNames(
    'pointer-events-none',
    'rounded-[20px]',
    'absolute',
    'left-0',
    'top-0',
    'z-20',
    'w-full',
    'h-full',
  );
</script>

<div class={wrapperClasses}>
  <video poster={token.assets.image} loop muted autoplay playsinline class={videoClasses}>
    <track kind="captions" />

    {#if token.assets.video}
      {#each Object.keys(token.assets.video) as videoType}
        <source src={token.assets.video[videoType]} type={`video/${videoType}`} />
      {/each}
    {/if}
    Your browser does not support the video tag.
  </video>
</div>
