<script lang="ts">
  import { t } from 'svelte-i18n';
  import { zeroAddress } from 'viem';

  import { PUBLIC_SEASON_BONUS_CLAIM_ACTIVE } from '$env/static/public';
  import type { UserPointsAndRankResponse } from '$lib/domains/profile/dto/profile.dto';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { bonusLoading } from '$lib/domains/profile/stores';
  import { Tooltip } from '$lib/shared/components/Tooltip';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  import getConnectedAddress from '$lib/shared/utils/getConnectedAddress';
  import { Spinner } from '$shared/components';
  import { ActionButton } from '$shared/components/Button';
  import { successToast } from '$shared/components/NotificationToast';
  import { classNames } from '$shared/utils/classNames';

  import { AbstractProfileCard } from '../templates';

  const titleClass = classNames(
    'font-size-[20px] font-weight-500 f-center w-full',
    'items-center',
    'h-[66px]',
    'gap-[5px]',
  );
  const tooltipClass = 'bg-white text-black';
  const statusContainerClass = 'f-center flex-col px-6 w-full justify-between';
  const scoreClass = 'f-center flex-col';
  const pointsClass = 'display-medium-medium p-3';
  const bgPartnerDarkClass = 'bg-partner-dark relative';
  const secondaryContentClass = 'text-secondary-content';

  $: seasonBonusPoints = 0;
  $: previousSeasonPointsAndRank = {} as UserPointsAndRankResponse;

  $: hasBonusPoints = seasonBonusPoints > 0;

  $: bonusClaimActive = PUBLIC_SEASON_BONUS_CLAIM_ACTIVE === 'true' && hasBonusPoints;

  $: claimButtonDisabled = !bonusClaimActive || $bonusLoading || claiming || alreadyClaimed || !claimActive;

  let claiming: boolean = false;

  let alreadyClaimed = false;

  let claimActive = false;

  async function handleBonusClaim() {
    claiming = true;

    const txhash = await profileService.claimSeasonBonus(getConnectedAddress(), $activeSeason);
    if (txhash) {
      claiming = false;
      alreadyClaimed = true;
      successToast({
        title: 'Claim submitted',
        message: 'Your points will be updated within the next few hours',
      });
    }

    claiming = false;
  }

  const loadPoints = async () => {
    const address = getConnectedAddress();
    if (address && address !== zeroAddress && $activeSeason && bonusClaimActive) {
      $bonusLoading = true;
      const [isOpen, bonusPoints, claimed, pointsAndRank] = await Promise.all([
        profileService.checkRegistrationOpen(0),
        profileService.getProfileBonusPoints(address, $activeSeason),
        profileService.checkBonusClaimRegistered(address, $activeSeason),
        profileService.getPointsAndRankForAddress(address, $activeSeason - 1),
      ]);
      claimActive = isOpen;
      seasonBonusPoints = bonusPoints || 0;
      hasBonusPoints = seasonBonusPoints > 0;
      alreadyClaimed = claimed;
      previousSeasonPointsAndRank = pointsAndRank;

      $bonusLoading = false;
    }
  };

  $: getConnectedAddress() && loadPoints();
</script>

{#if hasBonusPoints}
  <AbstractProfileCard class={bgPartnerDarkClass}>
    <div slot="title" class={titleClass}>
      <span class="text-center font-bold">Season 1 Bonus</span>

      <Tooltip slot="tooltip" position="bottom">
        <div class={tooltipClass}>
          <h2 class="text-black">Participated in Season 1?</h2>
          <div class="body-regular text-black">
            {$t('claim.season1Bonus.tooltip.message')}
          </div>
        </div>
      </Tooltip>
    </div>
    <div slot="status" class={statusContainerClass}>
      <div class={scoreClass}>
        {#if $bonusLoading}
          <Spinner />
        {:else}
          <div>
            {previousSeasonPointsAndRank?.score?.toFixed(2)} <span class={secondaryContentClass}>S1 Points =</span>
          </div>

          <div class={pointsClass}>{seasonBonusPoints}</div>
          <div>S2 Trailblazer Points</div>
        {/if}
      </div>
    </div>
    <ActionButton
      slot="cta"
      class="h-fit"
      disabled={claimButtonDisabled}
      loading={$bonusLoading}
      priority="primary"
      on:click={handleBonusClaim}>
      {#if bonusClaimActive && !$bonusLoading}
        {#if alreadyClaimed}
          Already claimed
        {:else if claiming}
          {$t('common.claiming')} <Spinner />
        {:else if !claimActive}
          {$t('claim.season1Bonus.cta.closed')}
        {:else}
          {$t('common.claim')}
        {/if}
      {:else}
        {$t('claim.season1Bonus.cta.soon')}
      {/if}
    </ActionButton>
  </AbstractProfileCard>
{/if}
