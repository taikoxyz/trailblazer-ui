<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { zeroAddress } from 'viem';

  import { BasedLinerService } from '$lib/domains/preconf/service/BasedLinerService';
  import { ResubmitStorage } from '$lib/domains/preconf/utils/resubmitStorage';
  import { ActionButton } from '$shared/components/Button';
  import StaticTime from '$shared/components/Countdown/StaticTime.svelte';
  import { errorToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores/account';
  import { TransactionTimedOutError } from '$shared/types/errors';
  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';

  import { PRECONF_CAMPAIGN_PHASE, PRECONF_EVENT } from '../../types';

  const log = getLogger('preconf:AfterPreconf');

  const wrapperClasses = classNames(
    'f-col',
    'w-full',
    'gap-[30px]',
    'items-center',
    'justify-start',
    'px-[24px]',
    'md:px-[48px]',
    'relative',
  );

  let isPhaseOpen = false;
  let loading = false;
  let remainingCooldown = 0;
  let cooldownInterval: NodeJS.Timeout | null = null;

  $: noAccount = !$account?.isConnected || $account?.address === zeroAddress;

  // Check resubmit status using persistent storage
  $: userAddress = $account?.address || zeroAddress;
  $: reSubmitEnabled = !ResubmitStorage.isResubmitBlocked(userAddress, PRECONF_EVENT.BASEDLINER);

  // Update remaining cooldown time
  function updateRemainingCooldown() {
    if (userAddress && userAddress !== zeroAddress) {
      remainingCooldown = ResubmitStorage.getRemainingCooldown(userAddress, PRECONF_EVENT.BASEDLINER);
    } else {
      remainingCooldown = 0;
    }
  }

  // Format remaining time as MM:SS
  function formatRemainingTime(milliseconds: number): string {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  $: disabled = noAccount || loading || !isPhaseOpen || !reSubmitEnabled;
  export let error: string | null = null;

  export let diffAfter = 0;

  async function handleTrackTime() {
    loading = true;
    error = null;
    try {
      // Send the transaction using the client-side service
      const response = await BasedLinerService.registerPhase(PRECONF_EVENT.BASEDLINER, PRECONF_CAMPAIGN_PHASE.AFTER);
      log('diffInSeconds', response.diffInSeconds);

      diffAfter = Math.floor(response.diffInSeconds);

      // Set persistent resubmit block for 1 minute
      if (userAddress && userAddress !== zeroAddress) {
        ResubmitStorage.setResubmitBlock(userAddress, PRECONF_EVENT.BASEDLINER, PRECONF_CAMPAIGN_PHASE.AFTER);
        // Immediately update the cooldown display
        updateRemainingCooldown();
      }
    } catch (e) {
      console.error('Error tracking time:', e);

      if (e instanceof TransactionTimedOutError) {
        errorToast({
          title: 'Transaction Timeout',
          message:
            'Your transaction timed out after 5 minutes. Please set a realistic gas price and try again. Your time has been set to 0',
        });
      } else if (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string') {
        if (e.message.includes('User rejected the request')) {
          errorToast({
            title: 'Request rejected by user',
            message: 'Please try again',
          });
        } else {
          errorToast({
            title: 'Error',
            message: e.message,
          });
        }
      } else {
        errorToast({
          title: 'Unknown error',
          message: 'Please try again',
        });
      }
      // Clear resubmit block on error so user can try again
      if (userAddress && userAddress !== zeroAddress) {
        ResubmitStorage.clearResubmitBlock();
      }
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    // check if phase is open
    isPhaseOpen = await BasedLinerService.isPhaseOpen({
      eventId: PRECONF_EVENT.BASEDLINER,
      phaseId: PRECONF_CAMPAIGN_PHASE.AFTER,
    });

    // Clear any existing resubmit blocks for different users/events
    if (userAddress && userAddress !== zeroAddress) {
      ResubmitStorage.clearResubmitBlockIfDifferent(
        userAddress,
        PRECONF_EVENT.BASEDLINER,
        PRECONF_CAMPAIGN_PHASE.AFTER,
      );
    }

    // Start cooldown interval to update remaining time
    updateRemainingCooldown();
    cooldownInterval = setInterval(updateRemainingCooldown, 1000);
  });

  onDestroy(() => {
    // Clean up the cooldown interval
    if (cooldownInterval) {
      clearInterval(cooldownInterval);
      cooldownInterval = null;
    }
  });
</script>

<div class={wrapperClasses}>
  <h1>With preconfs</h1>
  <StaticTime seconds={Math.floor(diffAfter)} />
  <div class="absolute bottom-0 left-0 w-full flex flex-col items-center">
    <ActionButton
      class="!max-h-[48px] !max-w-[200px]"
      priority="primary"
      on:click={handleTrackTime}
      {disabled}
      {loading}>
      {#if loading}
        Tracking...
      {:else if noAccount}
        Connect wallet
      {:else if !isPhaseOpen}
        Not launched yet
      {:else if !reSubmitEnabled && remainingCooldown > 0}
        Wait {formatRemainingTime(remainingCooldown)}
      {:else}
        Track your time
      {/if}
    </ActionButton>
  </div>
</div>
