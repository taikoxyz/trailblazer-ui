<script lang="ts">
  import type { NFT } from '$shared/types/NFT';
  import { cdnBase } from '$shared/utils/cdnBase';
  import { classNames } from '$shared/utils/classNames';

  export let token: NFT;

  $: image = `${cdnBase}${token.metadata.image}` as string;
  $: videoMp4 = `${cdnBase}${token.metadata['video/mp4']}` as string;
  $: videoWebm = `${cdnBase}${token.metadata['video/webm']}` as string;

  const wrapperClasses = classNames(
    'relative',
    'w-full',
    'h-full',
    'z-0',
    'aspect-square',
    token.frozen ? 'blur-sm' : '',
    $$props.class,
  );

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
