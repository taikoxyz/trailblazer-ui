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

  $: disabled = !score;

  export let diffBefore: number = 0;
  export let diffAfter: number = 0;

  $: speedIncreaseTimes = diffBefore && diffAfter ? (diffBefore / diffAfter).toFixed(2) : 0;

  // const activePhase: PRECONF_CAMPAIGN_PHASE = PRECONF_CAMPAIGN_PHASE.AFTER;

  $: score =
    diffBefore && diffAfter && diffAfter < diffBefore
      ? Math.min(Number(((diffBefore / diffAfter) * 10_000).toFixed(2)), 150_000)
      : 0;

  $: tweetLink = `https://twitter.com/intent/post?text=%F0%9F%9A%80%20Preconfirmations%20are%20LIVE%20on%20%40taikoxyz%20%E2%80%94%20my%20tx%20was%20${speedIncreaseTimes}x%20faster.%0A%0AThis%20isn%E2%80%99t%20just%20an%20upgrade.%20It%E2%80%99s%20a%20paradigm%20shift.%0AThe%20new%20era%20of%20Ethereum%20starts%20NOW.%0A%0A%F0%9F%94%97%20Try%20it%20yourself%3A%20https%3A%2F%2Ftrailblazers.taiko.xyz%2Fpreconfs%0A%0A%23Taiko%20%23Ethereum%20%23Basedliner`;
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
      href={tweetLink}
      {loading}
      withArrow={!disabled}>
      {#if disabled}
        No score yet
      {:else}
        Share your score
      {/if}
    </ActionButton>
  </div>
  <span class="text-positive-sentiment font-clash-grotesk font-bold mt-[-20px]"
    >{speedIncreaseTimes}x faster transaction speed!</span>
</div>
{#if score}
  <div
    style="position: fixed; z-index: 50; top: -50px; left: 0; height: 100vh; width: 100vw; pointer-events: none; display: flex; justify-content: center; overflow: hidden;">
    <Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 10000]} duration={5000} amount={200} fallDistance="100vh" />
  </div>
{/if}
