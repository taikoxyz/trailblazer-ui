<script lang="ts">
  import { onMount } from 'svelte';
  import { zeroAddress } from 'viem';

  import { BasedLinerService } from '$lib/domains/preconf/service/BasedLinerService';
  import { ActionButton } from '$shared/components/Button';
  import StaticTime from '$shared/components/Countdown/StaticTime.svelte';
  import { errorToast } from '$shared/components/NotificationToast';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
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
    'min-h-[300px]',
    'relative',
  );

  let loading = false;
  let isPhaseOpen = false;
  $: noAccount = getConnectedAddress() === zeroAddress;

  $: disabled = noAccount || loading || !isPhaseOpen;
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
    } catch (e) {
      if (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string') {
        if (e.message.includes('User rejected the request')) {
          errorToast({
            title: 'Request rejected by user',
            message: 'Please try again',
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
</script>

<div class={wrapperClasses}>
  <h1>Before preconfs</h1>
  <StaticTime seconds={diffBefore} />
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
      {:else}
        Track your time
      {/if}
    </ActionButton>
    <div class="text-[12px] text-secondary-content mt-2">Global avg: ~42s</div>
  </div>
</div>
