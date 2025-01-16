<!-- <script lang="ts">
  import { Icon } from '$shared/components/Icon';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import getMultiplierFor from '$shared/utils/nfts/getMultiplierFor';

  export let token: NFT;

  $: multiplierInfo = getMultiplierFor(token);
  $: multiplier = multiplierInfo?.multiplier || 1;
  $: tooltip = multiplierInfo?.tooltip || '';

  const wrapperClasses = classNames(
    'border',
    'border-pink-50',
    'rounded-full',
    'px-[10px]',
    'py-[5px]',
    'flex',
    'flex-row',
    'justify-center',
    'items-center',
    'gap-[5px]',
    'multiplier-background',
    'relative',
    'tooltip',
    'tooltip-bottom',
  );

  const borderOverlayClasses = classNames(
    'w-full',
    'h-[1px]',
    'bg-gradient-to-r from-transparent via-primary to-transparent',
    'absolute',
  );
</script>

<div class={wrapperClasses} data-tip={tooltip}>
  +{multiplier}x Multiplier
  <Icon type="question-circle" />

  <div class={classNames(borderOverlayClasses, 'top-[-1px]')}></div>
  <div class={classNames(borderOverlayClasses, 'bottom-[-1px]')}></div>
</div> -->
