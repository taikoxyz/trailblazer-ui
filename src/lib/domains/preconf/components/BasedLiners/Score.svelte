<script lang="ts">
  import Confetti from 'svelte-confetti';

  import { ActionButton } from '$shared/components/Button';
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames(
    'f-col',
    'gap-[30px]',
    'items-center',
    'justify-start',
    'px-[24px]',
    'md:px-[48px]',
    'relative',
    'w-full',
  );

  const digit = classNames(
    'text-[2.5em]',
    'min-h-[80px]',
    'font-clash-grotesk',
    'text-white',
    'f-col',
    'items-center',
    'text-center',
    'justify-center',
  );

  let loading = false;

  $: disabled = loading || !score;
  export let error: string | null = null;
  export let diffBefore: number = 0;
  export let diffAfter: number = 0;

  // const activePhase: PRECONF_CAMPAIGN_PHASE = PRECONF_CAMPAIGN_PHASE.AFTER;

  async function handleTrackTime() {
    loading = true;
    error = 'Not implemented';
    loading = false;
  }

  $: score =
    diffBefore && diffAfter && diffAfter < diffBefore
      ? Math.min(Number(((diffBefore / diffAfter) * 10_000).toFixed(2)), 150_000)
      : 0;
</script>

<div class={wrapperClasses}>
  <h1>Your score</h1>
  <div class={digit}>
    {#if score}
      <Confetti cone x={[-0.5, 0.5]} />
      {score}
      <Confetti cone amount={10} x={[-1, -0.4]} y={[0.25, 0.75]} />
      <Confetti cone amount={10} x={[0.4, 1]} y={[0.25, 0.75]} />
    {:else}
      0
    {/if}
  </div>
  <div class="absolute bottom-0 left-0 w-full flex flex-col items-center">
    <ActionButton
      class="max-w-[200px] w-[200px] !max-h-[48px]"
      priority="primary"
      on:click={handleTrackTime}
      {disabled}
      {loading}
      withArrow={!disabled}>
      {#if disabled}
        No score yet
      {:else}
        Share your score
      {/if}
    </ActionButton>
  </div>
</div>
{#if score}
  <div
    style="position: fixed; z-index: 50; top: -50px; left: 0; height: 100vh; width: 100vw; pointer-events: none; display: flex; justify-content: center; overflow: hidden;">
    <Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 10000]} duration={5000} amount={200} fallDistance="100vh" />
  </div>
{/if}
<button
  on:click={() => (score === 0 ? (score = 100) : (score = 0))}
  class="btn top-0 absolute right-0 m-4 p-2 bg-gray-800 text-white rounded">
  {score ? 'Stop Debug' : 'Debug'}
</button>
