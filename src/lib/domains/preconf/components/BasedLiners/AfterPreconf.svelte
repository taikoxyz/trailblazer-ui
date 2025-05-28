<script lang="ts">
  import { onMount } from 'svelte';
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
  $: noAccount = !$account?.isConnected || $account?.address === zeroAddress;

  $: disabled = noAccount || loading || !isPhaseOpen;
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
      {:else}
        Track your time
      {/if}
    </ActionButton>
  </div>
</div>
