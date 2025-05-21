<script lang="ts">
  import { onMount } from 'svelte';

  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import { getLogger } from '$shared/utils/logger';

  import { BasedLinerService } from '../../service/BasedLinerService';
  import { PRECONF_EVENT } from '../../types';
  import AfterPreconf from './AfterPreconf.svelte';
  import BeforePreconf from './BeforePreconf.svelte';
  import Score from './Score.svelte';

  const log = getLogger('BasedLiners');

  $: error = null;

  const wrapperClasses = classNames('w-full', 'flex', 'flex-col', 'items-center', 'px-[24px]', 'md:px-0');

  let isDesktopOrLarger = true;
  $: dynamicAttrs = isDesktopOrLarger ? { 'data-glow-border': true } : {};

  const cardClasses = classNames(
    'f-row',
    'w-full',
    'card',
    'rounded-[30px]',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'h-full',
    $$props.class,
  );

  const bodyClasses = classNames(
    'card-body',
    'body-regular',
    'px-[24px]',
    'py-[54px]',
    'f-col',
    'items-center',
    'justify-between',
    'h-full',
  );

  $: diffBefore = 0;
  $: diffAfter = 0;

  onMount(async () => {
    // fetch data from backend
    const address = getConnectedAddress();
    const entry = await BasedLinerService.getLeaderboardEntry({ eventId: PRECONF_EVENT.BASEDLINER, address });
    log('entry', entry);
    if (entry) {
      diffBefore = entry.phase1 || 0;
      diffAfter = entry.phase2 || 0;
    }
  });
</script>

<div class={wrapperClasses}>
  <div class={cardClasses}>
    <div {...dynamicAttrs} class={bodyClasses}>
      <div class="f-col lg:f-row w-full h-[250px]">
        <BeforePreconf bind:error bind:diffBefore />
        <div class="lg:v-sep h-sep" />
        <AfterPreconf bind:error bind:diffAfter />
        <div class="lg:v-sep h-sep" />
        <Score bind:error {diffAfter} {diffBefore} />
      </div>
      <!-- <Stats {diffBefore} {diffAfter} /> -->
    </div>
  </div>
</div>

{#if error}
  <div class="text-red-500 mt-2">{error}</div>
{/if}
