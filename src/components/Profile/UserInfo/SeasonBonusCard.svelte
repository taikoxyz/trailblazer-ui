<script lang="ts">
  import { onMount } from 'svelte';

  import { ActionButton } from '$components/Button';
  import { AbstractProfileCard } from '$components/Profile/Template';
  import { Spinner } from '$components/Spinner';
  import { Tooltip } from '$components/Tooltip';
  import { Season1Bonus } from '$libs/bonus/s1/season1';
  import type { UserProfile } from '$libs/profile';
  import { bonusLoading } from '$stores/load';
  import { currentProfile } from '$stores/profile';

  let profile: UserProfile;
  $: profile = $currentProfile;

  async function handleBonusClaim() {
    $bonusLoading = true;
    await Season1Bonus.claim();
    $bonusLoading = false;
  }

  onMount(async () => {
    await Season1Bonus.refreshData();
  });
</script>

<AbstractProfileCard class="bg-partner-dark relative">
  <div slot="back-icon"></div>
  <div slot="title" class="title-subsection-bold flex justify-center w-full">Season 1 Bonus</div>
  <Tooltip class="" slot="tooltip" position="bottom-left">
    <div class="bg-white text-black">
      <h2 class=" text-black">Participated in Season 1?</h2>
      <div class="body-regular text-black">
        If you participated in Season 1, you will be rewarded some bonus points for season 2. These will be capped. Have
        a look at our official Season 2 announcement for more details.
      </div>
    </div>
  </Tooltip>

  <div slot="status" class="f-center flex-col px-6 w-full justify-between">
    <div class="f-center flex-col">
      {#if $bonusLoading}
        <Spinner />
      {:else}
        <div class="body-bold">{profile.seasonBonusPoints} Season 1 Points =</div>
        <div class="display-medium-medium">{profile.trailblazerPoints}</div>
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
