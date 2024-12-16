<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import { type Address,isAddressEqual } from 'viem';

  import { page } from '$app/stores';
  import Icon from '$shared/components/Icon/Icon.svelte';
  import { Tooltip } from '$shared/components/Tooltip';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import profileService from '../../services/ProfileServiceInstance';
  import type { Multipliers } from '../../types/Multipliers';
  import { AbstractProfileCard } from '../templates';
  import MultiplierItem from './MultiplierItem.svelte';

  $: globalMultiplierView = { multiplier: 0, max: false };
  $: transactionVolumeMultiplierView = { multiplier: 0, max: false };
  $: transationMultiplierView = { multiplier: 0, max: false };

  let isSelfProfile: boolean;
  let urlAddress: Address;

  onMount(async () => {
    urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile = isAddressEqual(urlAddress, getConnectedAddress());

    const mp: Multipliers = await profileService.getBadgeMultiplierForProfile(
      isSelfProfile ? getConnectedAddress() : urlAddress,
      $activeSeason,
    );
    const { globalMultiplier, transactionVolumeMultiplier, transationMultiplier } = mp.multipliers;

    globalMultiplierView = globalMultiplier;
    transactionVolumeMultiplierView = transactionVolumeMultiplier;
    transationMultiplierView = transationMultiplier;
  });

  const headerClasses = classNames(
    'f-center',
    'profile-card-gradient',
    'rounded-t-[30px]',
    'absolute',
    'h-[66px]',
    'w-full',
    'left-0',
    'top-0',
    'gap-[5px]',
  );

  const cardClasses = classNames('bg-purple-900', 'relative', 'flex', 'flex-col', 'h-full');
  const statusClasses = classNames('flex-1', 'mt-[80px]', 'xl:mt-0');
  const fontBoldTextLeftClasses = classNames('font-bold', 'text-left');
  const listClasses = classNames('f-col', 'gap-[8px]');
  const ctaClasses = classNames('absolute', 'bottom-0', 'w-full', 'pb-[27px]', 'px-[24px]');
  const linkClasses = classNames('f-row', 'justify-between', 'items-center', 'w-full');
  const tooltipContentClasses = classNames('bg-white', 'text-black');
</script>

{isSelfProfile} ! {urlAddress}
<AbstractProfileCard class={cardClasses}>
  <div slot="title" class={headerClasses}>
    <span class="text-center font-bold">{$t('booster.title')}</span>
    <Tooltip slot="tooltip" position="bottom">
      <div class={tooltipContentClasses}>
        <h2 class="text-black">{$t('booster.tooltip.title')}</h2>
        <div class="body-regular text-black">
          {$t('booster.tooltip.description')}
        </div>
      </div>
    </Tooltip>
  </div>

  <div slot="status" class={statusClasses}>
    <div class={fontBoldTextLeftClasses}>
      <ul class={listClasses}>
        <MultiplierItem label={$t('profile.multipliers.card.tx')} multiplierView={transationMultiplierView} />
        <MultiplierItem
          label={$t('profile.multipliers.card.txValue')}
          multiplierView={transactionVolumeMultiplierView} />
        <MultiplierItem label={$t('profile.multipliers.card.global')} multiplierView={globalMultiplierView} />
      </ul>
    </div>
  </div>

  <div slot="cta" class={ctaClasses}>
    <a class={linkClasses} href={`/profile/${getConnectedAddress()}#badge-recruitment`}>
      <span class="font-bold">{$t('profile.multipliers.card.cta')}</span>
      <Icon type="chevron-right" />
    </a>
  </div>
</AbstractProfileCard>
