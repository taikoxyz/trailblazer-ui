<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import { type Address, isAddressEqual, zeroAddress } from 'viem';

  import { browser } from '$app/environment';
  import { PUBLIC_SEASON_BONUS_CLAIM_ACTIVE } from '$env/static/public';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import profileService from '../../services/ProfileServiceInstance';
  import { claimModal } from '../../stores';

  const wrapperClasses = classNames(
    'bg-grey-700',
    'fixed',
    'bottom-[30px]',
    'right-[30px]',
    'flex',
    'justify-center',
    'items-center',
    'rounded-full',
    'shadow-[0px_0px_30px_0px_#FFC6E933]',
    'border',
    'border-grey-600',
    'p-[4px]',
    'pl-[16px]',
    'gap-[40px]',
  );

  const labelClasses = classNames('text-grey-10', 'font-[700]', 'text-[16px]/[24px]', 'flex');

  const iconClasses = classNames('w-[24px]', 'h-[24px]');

  $: visible = false;
  function load() {
    const connectedAddress = getConnectedAddress();
    if (!browser || !connectedAddress || connectedAddress === zeroAddress) {
      return;
    }
    const urlAddress = window.location.pathname.split('/')[2];
    visible = isAddressEqual(connectedAddress, urlAddress as Address);
  }

  $: getConnectedAddress() && load();
  $: claimActive = false;

  $: bonusClaimActive = PUBLIC_SEASON_BONUS_CLAIM_ACTIVE === 'true';
  onMount(async () => {
    const address = getConnectedAddress();
    if (address && address !== zeroAddress && $activeSeason && bonusClaimActive) {
      claimActive = await profileService.checkRegistrationOpen(0);
    }
  });
</script>

{#if visible}
  <div style="z-index:100;" class={wrapperClasses}>
    <div class={labelClasses}>
      <img class={iconClasses} src="/news/flame.svg" alt="Flame" />
      {#if claimActive}
        {$t('claim.modal.float_cta_open')}
      {:else}
        {$t('claim.modal.float_cta_closed')}
      {/if}
    </div>
    <ActionButton onPopup disabled={!claimActive} on:click={() => claimModal.set(true)} priority="primary"
      >Claim Now</ActionButton>
  </div>
{/if}
