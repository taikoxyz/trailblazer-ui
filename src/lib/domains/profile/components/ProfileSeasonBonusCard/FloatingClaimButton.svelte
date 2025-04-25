<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import { type Address, isAddressEqual, zeroAddress } from 'viem';

  import { PUBLIC_SEASON_BONUS_CLAIM_ACTIVE } from '$env/static/public';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import profileService from '../../services/ProfileServiceInstance';
  import { claimModal } from '../../stores';
  import { EventIds } from '../../types/EventIds';

  const wrapperActiveClasses = classNames(
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

  const checkButton = async () => {
    const urlAddress = window.location.pathname.split('/')[2];
    const connectedAddress = getConnectedAddress();
    if (
      connectedAddress &&
      connectedAddress !== zeroAddress &&
      $activeSeason &&
      PUBLIC_SEASON_BONUS_CLAIM_ACTIVE === 'true' &&
      isAddressEqual(connectedAddress, urlAddress as Address)
    ) {
      // button is visible if connected address is the same as the visited profile and env is set to true
      isButtonVisible = true;
      const claimActive = await profileService.checkRegistrationOpen(EventIds.SEASON2);
      // button is active if the claim is open on contract side
      isClaimActive = claimActive;
    }
  };

  $: getConnectedAddress() && checkButton();
  $: isButtonVisible = false;
  $: isClaimActive = false;

  onMount(async () => {
    await checkButton();
  });
</script>

{#if isButtonVisible}
  <div style="z-index:100;" class={wrapperActiveClasses}>
    <div class={labelClasses}>
      <img class={iconClasses} src="/news/flame.svg" alt="Flame" />
      {#if isClaimActive}
        {$t('claim.modal.float_cta_open')}
      {:else}
        {$t('claim.modal.float_cta_closed')}
      {/if}
    </div>
    <ActionButton onPopup disabled={!isClaimActive} on:click={() => claimModal.set(true)} priority="primary">
      Claim now
    </ActionButton>
  </div>
{/if}
