<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import { zeroAddress } from 'viem';

  import { page } from '$app/stores';
  import { ConnectButton } from '$shared/components/ConnectButton';
  import DisabledMask from '$shared/components/Masks/DisabledMask/DisabledMask.svelte';
  import Note from '$shared/components/Note/Note.svelte';
  import { OnAccount } from '$shared/components/OnAccount';
  import { account } from '$shared/stores/account';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import { getLogger } from '$shared/utils/logger';

  import { BasedLinerService } from '../../service/BasedLinerService';
  import { PRECONF_CAMPAIGN_PHASE, PRECONF_EVENT } from '../../types';
  import AfterPreconf from './AfterPreconf.svelte';
  import BasedlinersLeaderboard from './BasedlinersLeaderboard.svelte';
  import BeforePreconf from './BeforePreconf.svelte';
  import Score from './Score.svelte';

  $: ({ pageInfo } = $page.data);

  const log = getLogger('BasedLiners');

  $: error = null;

  const wrapperClasses = classNames('w-full', 'flex', 'flex-col', 'items-center', 'px-0');

  let isDesktopOrLarger = true;
  $: dynamicAttrs = isDesktopOrLarger ? { 'data-glow-border': true } : {};
  $: noAccount = !$account?.isConnected || $account?.address === zeroAddress;
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
    'mb-[30px]',
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
  $: score = 0;

  $: isPhase2Open = false;

  onMount(async () => {
    // fetch data from backend
    const address = getConnectedAddress();
    const entry = await BasedLinerService.fetchLeaderboardEntry({ eventId: PRECONF_EVENT.BASEDLINER, address });
    log('entry', entry);
    if (entry) {
      diffBefore = entry.phase1 || 0;
      diffAfter = entry.phase2 || 0;
      score = entry.diff || 0;
    }

    isPhase2Open = await BasedLinerService.isPhaseOpen({
      eventId: PRECONF_EVENT.BASEDLINER,
      phaseId: PRECONF_CAMPAIGN_PHASE.AFTER,
    });
  });

  async function onAccountChange() {
    log('Account changed, refreshing data...');
    // Refresh user data when account changes
    const address = getConnectedAddress();

    if (address && address !== zeroAddress) {
      // Fetch updated leaderboard entry for the new account
      try {
        const entry = await BasedLinerService.fetchLeaderboardEntry({
          eventId: PRECONF_EVENT.BASEDLINER,
          address,
        });

        log('Updated entry for new account:', entry);

        if (entry) {
          diffBefore = entry.phase1 || 0;
          diffAfter = entry.phase2 || 0;
          score = entry.diff || 0;
        } else {
          // Reset values if no entry found for this account
          diffBefore = 0;
          diffAfter = 0;
          score = 0;
        }
      } catch (error) {
        console.error('Error fetching leaderboard entry on account change:', error);
        // Reset values on error
        diffBefore = 0;
        diffAfter = 0;
        score = 0;
      }
    } else {
      // No account connected, reset values
      diffBefore = 0;
      diffAfter = 0;
      score = 0;
    }
  }
</script>

<div class={wrapperClasses}>
  <div class={cardClasses}>
    {#if noAccount}
      <DisabledMask title="" textClass="h-full">
        <ConnectButton />
      </DisabledMask>
    {/if}
    <div {...dynamicAttrs} class={bodyClasses} id="basedliners-section">
      <div class="f-col lg:f-row {noAccount ? 'blur-md' : ''} w-full lg:h-[250px] h-full">
        <BeforePreconf bind:error bind:diffBefore />
        <div class="lg:v-sep h-sep" />
        <AfterPreconf bind:error bind:diffAfter />
        <div class="lg:v-sep h-sep" />
        <Score {score} {diffAfter} {diffBefore} {isPhase2Open} />
      </div>
      <!-- <Stats {diffBefore} {diffAfter} /> -->
    </div>
  </div>
  <div class="w-full flex">
    <Note>
      {$t('pages.preconfs.sections.basedliner.note')}
    </Note>
  </div>
  {#if isPhase2Open}
    <BasedlinersLeaderboard {pageInfo} />
  {/if}
</div>

<OnAccount change={onAccountChange} />
