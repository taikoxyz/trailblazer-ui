<script lang="ts">
  import { t } from 'svelte-i18n';
  import { type Address, getAddress } from 'viem';

  import ActionButton from '$components/Button/ActionButton.svelte';
  import { errorToast } from '$components/NotificationToast';
  import { type FactionNames, FACTIONS } from '$configs/badges';
  import canClaimPreflight from '$libs/badges/canClaimPreflight';
  import claimBadge from '$libs/badges/claimBadge';
  import type { Movements } from '$libs/badges/const';
  import { account } from '$stores/account';
  import { isMintDisclaimerAccepted, mintDisclaimerModal } from '$stores/modal';

  import FactionImage from './FactionImage.svelte';

  export let name: FactionNames;
  export let unlocked: boolean = false;
  export let address: Address;
  export let movement: Movements;

  let blur = '';
  let shadow = '';
  let claimable: boolean = false;

  $: if (unlocked) {
    blur = '';
  } else if (claimable) {
    blur = 'blur-md';
    shadow = 'shadow-primary shadow-[0_0px_20px]';
  } else {
    blur = 'blur-md';
  }

  $: isClaiming = false;
  $: isAwaitingDisclaimer = false;

  $: $mintDisclaimerModal, isAwaitingDisclaimer && !$mintDisclaimerModal && safeClaimBadge();

  async function safeClaimBadge() {
    try {
      await claimBadge(address, FACTIONS[name]);
      unlocked = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      errorToast({
        title: 'Badge Claim Error',
        message: e.message,
      });
      console.error(e);
    } finally {
      isClaiming = false;
    }
  }
  async function handleClaimClick() {
    isClaiming = true;
    if (claimable) {
      if (!isMintDisclaimerAccepted()) {
        isAwaitingDisclaimer = true;
        mintDisclaimerModal.set(true);
        isClaiming = false;
        return;
      }
      await safeClaimBadge();
    }
    isClaiming = false;
  }

  async function claimPreflight() {
    if (isClaiming || !$account || !$account.address) return;
    if (getAddress($account.address) !== getAddress(address.toLowerCase())) return;
    claimable = await canClaimPreflight(address, FACTIONS[name]);
  }

  $: $account, claimPreflight();

  $: buttonText = isClaiming ? $t('common.claiming') : claimable ? $t('common.claim') : $t('common.not_eligible');
</script>

<div
  class="{shadow} flex w-full min-h-[306px] max-w-[306px] border-2 border-primary-border-hover rounded-[20px] bg-[#310E2F]">
  <div class="w-full relative flex flex-col justify-between overflow-hidden">
    <div class="w-full f-col items-center {blur}">
      <FactionImage {movement} {unlocked} type={name} />
    </div>
    {#if !unlocked}
      <div class="absolute bottom-8 place-self-center w-full px-6">
        <ActionButton
          priority="primary"
          on:click={handleClaimClick}
          disabled={isClaiming || !claimable}
          loading={isClaiming}>
          {buttonText}
        </ActionButton>
      </div>
    {/if}
  </div>
</div>
