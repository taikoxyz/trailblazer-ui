<script lang="ts">
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  export let token: NFT;

  $: image = token.metadata.image as string;
  $: videoMp4 = token.metadata['video/mp4'] as string;
  $: videoWebm = token.metadata['video/webm'] as string;

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
  <video poster={image} loop muted autoplay playsinline class={videoClasses}>
    <track kind="captions" />
    {#if token.metadata['video/mp4']}
      <source src={videoMp4} type="video/mp4" />
    {/if}
    {#if token.metadata['video/webm']}
      <source src={videoWebm} type="video/webm" />
    {/if}
    Your browser does not support the video tag.
  </video>
</div>
