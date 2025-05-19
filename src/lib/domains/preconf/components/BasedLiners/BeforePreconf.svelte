<script lang="ts">
  import { zeroAddress } from 'viem';

  import { BasedLinerService } from '$lib/domains/preconf/service/BasedLinerService';
  import { ActionButton } from '$shared/components/Button';
  import StaticTime from '$shared/components/Countdown/StaticTime.svelte';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import { getLogger } from '$shared/utils/logger';

  import { PRECONF_CAMPAIGN_PHASE } from '../../types';

  const log = getLogger('preconf:BeforePreconf');

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'gap-4',
    'items-center',
    'justify-center',
    'px-[24px]',
    'md:px-[48px]',
  );

  let loading = false;

  $: noAccount = getConnectedAddress() === zeroAddress;

  $: disabled = noAccount || loading;
  export let error: string | null = null;

  $: diffInSeconds = 0;

  const activePhase: PRECONF_CAMPAIGN_PHASE = PRECONF_CAMPAIGN_PHASE.BEFORE;

  async function handleTrackTime() {
    loading = true;
    error = null;
    try {
      // Send the transaction using the client-side service
      const response = await BasedLinerService.registerPhase(activePhase);
      log('diffInSeconds', response.diffInSeconds);

      diffInSeconds = Math.floor(response.diffInSeconds);
    } catch (e) {
      if (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string') {
        error = e.message;
      } else {
        error = 'Unknown error';
      }
    } finally {
      loading = false;
    }
  }
</script>

<div class={wrapperClasses}>
  <h1>Before preconfs</h1>

  <StaticTime seconds={diffInSeconds} />

  <ActionButton priority="primary" on:click={handleTrackTime} {disabled} {loading}>
    {#if loading}
      Tracking...
    {:else if noAccount}
      Connect wallet
    {:else}
      Track your time
    {/if}
  </ActionButton>
</div>
