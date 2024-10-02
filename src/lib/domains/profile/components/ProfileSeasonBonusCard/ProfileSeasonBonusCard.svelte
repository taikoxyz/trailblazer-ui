<script lang="ts">
  import { t } from 'svelte-i18n';

  import { ActionButton } from '$components/Button';
  import { Spinner } from '$components/Spinner';
  import type { UserPointsAndRankResponse } from '$lib/domains/profile/dto/profile.dto';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { bonusLoading } from '$lib/domains/profile/stores';
  import { Tooltip } from '$lib/shared/components/Tooltip';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  import getConnectedAddress from '$lib/shared/utils/getConnectedAddress';
  import { account } from '$stores/account';

  import { AbstractProfileCard } from '../templates';

  const titleClass = 'font-size-[20px] font-weight-500 flex justify-center w-full';
  const tooltipClass = 'bg-white text-black';
  const statusContainerClass = 'f-center flex-col px-6 w-full justify-between';
  const scoreClass = 'f-center flex-col';
  const pointsClass = 'display-medium-medium p-3';
  const bgPartnerDarkClass = 'bg-partner-dark relative';
  const secondaryContentClass = 'text-secondary-content';

  $: seasonBonusPoints = 0;
  $: previousSeasonPointsAndRank = {} as UserPointsAndRankResponse;

  $: hasBonusPoints = seasonBonusPoints > 0;

  async function handleBonusClaim() {
    $bonusLoading = true;
    // await profileService.claimSeasonBonus(); // TODO: Implement profileService.claimSeasonBonus()()
    $bonusLoading = false;
  }

  const loadPoints = async () => {
    if ($account?.address && $activeSeason) {
      $bonusLoading = true;
      seasonBonusPoints = await profileService.getProfileBonusPoints(getConnectedAddress(), $activeSeason);

      if (seasonBonusPoints > 0) hasBonusPoints = true;
      previousSeasonPointsAndRank = await profileService.getProfilePointsAndRank($account.address, $activeSeason - 1);
      $bonusLoading = false;
    }
  };

  $: $account?.address && loadPoints();
</script>

{#if hasBonusPoints}
  <AbstractProfileCard class={bgPartnerDarkClass}>
    <div slot="title" class={titleClass}>Season 1 Bonus</div>

    <Tooltip class="" slot="tooltip" position="bottom-left">
      <div class={tooltipClass}>
        <h2 class="text-black">Participated in Season 1?</h2>
        <div class="body-regular text-black">
          {$t('claim.season1Bonus.tooltip.message')}
        </div>
      </div>
    </Tooltip>

    <div slot="status" class={statusContainerClass}>
      <div class={scoreClass}>
        {#if $bonusLoading}
          <Spinner />
        {:else}
          <div>
            ~{previousSeasonPointsAndRank?.score?.toFixed(2)} <span class={secondaryContentClass}>S1 Points =</span>
          </div>

          <div class={pointsClass}>{seasonBonusPoints}</div>
          <div>S2 Trailblazer Points</div>
        {/if}
      </div>
    </div>
    <ActionButton
      slot="cta"
      class="h-fit"
      disabled={true}
      loading={$bonusLoading}
      priority="primary"
      on:click={handleBonusClaim}>
      {$t('claim.season1Bonus.cta.soon')}
    </ActionButton>
  </AbstractProfileCard>
{/if}
