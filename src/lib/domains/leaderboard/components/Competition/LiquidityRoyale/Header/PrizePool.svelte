<script lang="ts">
  import { Tooltip } from '$shared/components/Tooltip';
  import { classNames } from '$shared/utils/classNames';
  import { getContext } from 'svelte';
  import { getEditionDetails } from '../editionDetails';
  import { t } from 'svelte-i18n';

  const wrapperClasses = classNames('w-[150px]', 'items-center', 'justify-center', 'f-col', 'gap-[15px]');
  const badgeClasses = classNames(
    'border',
    'border-divider-border',
    'border-[2px]',
    'rounded-full',
    'px-[20px]',
    'py-[10px]',
    'f-row',
    'gap-[10px]',
  );
  const prizeWrapperClasses = classNames('f-row', 'gap-[16px]', 'items-center');
  const prizeClasses = classNames(
    'font-clash-grotesk',
    'text-[45px]',
    'font-semibold',
    'leading-[52px]',
    'tracking-[-0.45px]',
  );
  const tokenClasses = classNames(
    'font-medium',
    'font-clash-grotesk',
    'leading-normal',
    'tracking-[1.6px]',
    'text-primary-link',
  );

  const badgeTextClasses = classNames('uppercase', 'text-sm', 'font-clash-grotesk', 'font-medium');

  const tooltipClass = 'bg-white text-black';

  const edition = getContext<number>('liquidityEdition');

  $: editionDetails = getEditionDetails(edition);

  $: hasTooltip = editionDetails?.tooltip || false;

  $: prize = editionDetails?.prizePool || '';
</script>

<div class={wrapperClasses}>
  <div class={badgeClasses}>
    <span class={badgeTextClasses}>Prize pool</span>
    {#if hasTooltip}
      <Tooltip slot="tooltip" position="top">
        <div class={tooltipClass}>
          <h2 class="text-black">{$t(`leaderboard.liquidityRoyale.prizePoolTooltip.edition${edition}.title`)}</h2>
          <div class="font-normal text-black">
            {$t(`leaderboard.liquidityRoyale.prizePoolTooltip.edition${edition}.content`)}
          </div>
        </div>
      </Tooltip>
    {/if}
  </div>

  <div class={prizeWrapperClasses}>
    <span class={prizeClasses}>{prize}</span>
    <span class={tokenClasses}> Taiko tokens </span>
  </div>
</div>
