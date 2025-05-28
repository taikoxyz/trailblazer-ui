<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { zeroAddress } from 'viem';

  import { BasedLinerService } from '$lib/domains/preconf/service/BasedLinerService';
  import { ActionButton } from '$shared/components/Button';
  import StaticTime from '$shared/components/Countdown/StaticTime.svelte';
  import { errorToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores/account';
  import { TransactionTimedOutError } from '$shared/types/errors';
  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';

  import { PRECONF_CAMPAIGN_PHASE, PRECONF_EVENT } from '../../types';

  const log = getLogger('preconf:BeforePreconf');

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

  let loading = false;
  let isPhaseOpen = false;
  $: noAccount = !$account?.isConnected || $account?.address === zeroAddress;

  $: disabled = noAccount || loading || !isPhaseOpen || !reSubmitEnabled;
  export let error: string | null = null;
  export let diffBefore: number = 0;

  onMount(async () => {
    // check if phase is open
    isPhaseOpen = await BasedLinerService.isPhaseOpen({
      eventId: PRECONF_EVENT.BASEDLINER,
      phaseId: PRECONF_CAMPAIGN_PHASE.BEFORE,
    });
  });

  async function handleTrackTime() {
    loading = true;
    error = null;
    try {
      // Send the transaction using the client-side service
      const response = await BasedLinerService.registerPhase(PRECONF_EVENT.BASEDLINER, PRECONF_CAMPAIGN_PHASE.BEFORE);
      log('diffInSeconds', response.diffInSeconds);

      diffBefore = Math.floor(response.diffInSeconds);
      // disable re-submiting for 1 minute after sending
      reSubmitEnabled = false;
      reSubmitTimeout = setTimeout(() => {
        reSubmitEnabled = true;
      }, 1000 * 60);
    } catch (e) {
      console.error('Error tracking time:', e);

      if (e instanceof TransactionTimedOutError) {
        errorToast({
          title: 'Transaction Timeout',
          message: 'Your transaction timed out after 5 minutes. Please set a realistic gas price and try again.',
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
      // reset values
      diffBefore = 0;
      reSubmitEnabled = true;
    } finally {
      loading = false;
    }
  }

  onDestroy(() => {
    if (reSubmitTimeout) {
      clearTimeout(reSubmitTimeout);
      reSubmitTimeout = null;
    }
  });

  let reSubmitTimeout: NodeJS.Timeout | null = null;
  let reSubmitEnabled = true;
</script>

<div class={wrapperClasses}>
  <h1>
    Baseline
    <br />
    <!-- <span class="text-sm text-secondary-content">(Before Preconf)</span> -->
  </h1>

  <StaticTime seconds={Math.floor(diffBefore)} />

  <div class="absolute bottom-0 left-0 w-full flex flex-col items-center">
    {#if error}
      <p class="text-red-500">{error}</p>
    {/if}
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
        Phase is closed
      {:else}
        Track your time
      {/if}
    </ActionButton>
  </div>
</div>
