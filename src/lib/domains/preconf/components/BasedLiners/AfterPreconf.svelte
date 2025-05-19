<script lang="ts">
  import { BasedLinerService } from '$lib/domains/preconf/service/BasedLinerService';
  import { ActionButton } from '$shared/components/Button';
  import StaticTime from '$shared/components/Countdown/StaticTime.svelte';
  import { classNames } from '$shared/utils/classNames';
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
  export let error: string | null = null;

  $: diffInSeconds = 0;

  const activePhase: PRECONF_CAMPAIGN_PHASE = PRECONF_CAMPAIGN_PHASE.AFTER;

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
  <h1>After preconfs</h1>

  <StaticTime seconds={diffInSeconds} />

  <ActionButton priority="primary" on:click={handleTrackTime} disabled={loading} {loading}>
    {loading ? 'Tracking...' : 'Track your time'}
  </ActionButton>
</div>
