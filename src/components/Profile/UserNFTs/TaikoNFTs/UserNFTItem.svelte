<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  import UserNftImage from './UserNFTImage.svelte';

  // CSS classes
  $: wrapperClasses = classNames(
    'relative',
    'overflow-hidden',
    'flex',
    'w-full',
    'min-h-[306px]',
    'max-w-[306px]',
    'rounded-[30px]',
    'bg-[#310E2F]',
    'transition-all',
  );

  const contentWrapperClasses = classNames(
    'w-full',
    'relative',
    'flex',
    'flex-col',
    'justify-between',
    'overflow-hidden',
  );

  $: imageWrapperClasses = classNames('w-full', 'f-col', 'items-center');

  const tooltipClasses = classNames(
    'absolute',
    'w-full',
    'h-full',
    'top-0',
    'left-0',
    'flex',
    'justify-center',
    'items-center',
  );

  export let imageUrl: string | undefined;
  export let explorerLink: string | undefined;
</script>

<a class={wrapperClasses} role="button" href={explorerLink} target="_blank">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <!-- NFT Image -->
      <!-- {#if imageUrl} -->
      <UserNftImage src={imageUrl || 'https://placehold.co/200x200'} />
      <!-- {/if} -->
    </div>
    asd

    <div class={tooltipClasses}>
      <div class={classNames('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-secondary', 'opacity-10')}></div>
    </div>
  </div>
</a>
