<script lang="ts">
  import { ActionButton } from '$shared/components/Button';
  import StaticTime from '$shared/components/Countdown/StaticTime.svelte';
  import { classNames } from '$shared/utils/classNames';

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

  // const activePhase: PRECONF_CAMPAIGN_PHASE = PRECONF_CAMPAIGN_PHASE.AFTER;

  async function handleTrackTime() {
    loading = true;
    error = 'Not implemented';
    loading = false;
  }
</script>

<div class={wrapperClasses}>
  <h1>Your score</h1>

  <StaticTime seconds={diffInSeconds} />

  <ActionButton class="w-[200px]" priority="primary" on:click={handleTrackTime} disabled={loading} {loading} withArrow>
    {loading ? 'Sharing...' : 'Share your score'}
  </ActionButton>
</div>
