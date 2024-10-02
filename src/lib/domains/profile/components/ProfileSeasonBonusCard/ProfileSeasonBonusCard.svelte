<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { Spinner } from '$components/Spinner';
  import { Tooltip } from '$lib/shared/components/Tooltip';
  import { AbstractProfileCard } from '../templates';
  import { bonusLoading } from '$lib/domains/profile/stores';
  import profileService from '../../services/ProfileServiceInstance';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  import { account } from '$stores/account';
  import type { UserPointsAndRankResponse } from '../../dto/profile.dto';
  import getConnectedAddress from '$libs/util/getConnectedAddress';

  $: seasonBonusPoints = 0;
  $: previousSeasonPointsAndRank = {} as UserPointsAndRankResponse;

  $: hasBonusPoints = seasonBonusPoints > 0;

  async function handleBonusClaim() {
    $bonusLoading = true;
    // await Season1Bonus.claim();
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
  <AbstractProfileCard class="bg-partner-dark relative">
    <!-- <div slot="back-icon"></div> -->
    <div slot="title" class="title-subsection-bold flex justify-center w-full">Season 1 Bonus</div>
    <Tooltip class="" slot="tooltip" position="bottom-left">
      <div class="bg-white text-black">
        <h2 class=" text-black">Participated in Season 1?</h2>
        <div class="body-regular text-black">
          If you participated in Season 1, you will be rewarded some bonus points for season 2. These will be capped.
          Have a look at our official Season 2 announcement for more details.
        </div>
      </div>
    </Tooltip>

    <div slot="status" class="f-center flex-col px-6 w-full justify-between">
      <div class="f-center flex-col">
        {#if $bonusLoading}
          <Spinner />
        {:else}
          <div class="body-bold">~{previousSeasonPointsAndRank?.score?.toFixed(2)} Season 1 Points =</div>
          <div class="display-medium-medium">{seasonBonusPoints}</div>
          <div>Trailblazer Points</div>
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
      Claiming Coming Soon
      <!-- {profile.galxePointsClaimed ? 'Claimed' : 'Claim'} -->
    </ActionButton>
  </AbstractProfileCard>
{/if}
