<script lang="ts">
  import type { TBBadge } from '$shared/types/NFT';
  import { cdnBase } from '$shared/utils/cdnBase';
  import { classNames } from '$shared/utils/classNames';

  export let token: TBBadge;

  $: image = `${cdnBase}${token.metadata.image || ''}`;
  $: videoMp4 = `${cdnBase}${token.metadata['video/mp4'] || ''}`;

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
  {#key token.metadata.image}
    <video poster={image} loop muted autoplay playsinline class={videoClasses}>
      <track kind="captions" />
      {#if token.metadata['video/mp4']}
        <source src={videoMp4} type="video/mp4" />
      {/if}
      Your browser does not support the video tag.
    </video>
  {/key}
</div>
