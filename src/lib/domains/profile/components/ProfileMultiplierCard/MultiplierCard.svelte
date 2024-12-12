<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

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

  onMount(async () => {
    const mp: Multipliers = await profileService.getBadgeMultiplier(getConnectedAddress(), $activeSeason);

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
    'top-0 ',
    'gap-[5px]',
  );
</script>

<AbstractProfileCard class="bg-purple-900 relative flex flex-col h-full">
  <div slot="title" class={headerClasses}>
    <span class="text-center font-bold">{$t('booster.title')}</span>
    <Tooltip slot="tooltip" position="bottom">
      <div class="bg-white text-black">
        <h2 class="text-black">{$t('booster.tooltip.title')}</h2>
        <div class="body-regular text-black">
          {$t('booster.tooltip.description')}
        </div>
      </div>
    </Tooltip>
  </div>

  <div slot="status" class="flex-1 mt-[65px]">
    <div class="font-bold text-left">
      <ul class="f-col gap-[8px]">
        <MultiplierItem label={$t('profile.multipliers.card.tx')} multiplierView={transationMultiplierView} />
        <MultiplierItem
          label={$t('profile.multipliers.card.txValue')}
          multiplierView={transactionVolumeMultiplierView} />
        <MultiplierItem label={$t('profile.multipliers.card.global')} multiplierView={globalMultiplierView} />
      </ul>
    </div>
  </div>

  <div slot="cta" class="absolute bottom-0 w-full pb-[27px] px-[24px]">
    <a class="f-row justify-between items-center w-full" href={`/profile/${getConnectedAddress()}#badge-recruitment`}>
      <span class="font-bold">{$t('profile.multipliers.card.cta')}</span>
      <Icon type="chevron-right" />
    </a>
  </div>
</AbstractProfileCard>
