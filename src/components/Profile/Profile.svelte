<script lang="ts">
  import { onMount } from 'svelte';

  import { page } from '$app/stores';
  import { Icon } from '$components/Icon';
  import { ProfileTabs } from '$components/Tabs';
  import { Profile } from '$libs/profile';
  import { account } from '$stores/account';
  import type { UserProfile } from '$libs/profile';

  import ProfileCard from './ProfileCard.svelte';
  import ProfileSubCard from './ProfileSubCard.svelte';
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { Galxe } from '$libs/galxe';
  import { currentProfile } from '$stores/profile';
  import { galxeLoading } from '$stores/load';
  import { Tooltip } from '$components/Tooltip';

  $: if ($account) {
    let address = $account.address;
    console.info('🚀 | address:', address);
  }

  let profile: UserProfile;
  $: profile = $currentProfile;

  let galxeClaimLoading = true;
  async function handleGalxeClaim() {
    $galxeLoading = true;
    await Galxe.claim();
    $galxeLoading = false;
  }

  onMount(async () => {
    // get slug
    let address = $page.params.address;
    await Profile.getProfile(address);
    await Profile.getUserPointsHistory(address);
    // await Galxe.refreshData();
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full lg:gap-8">
    <div class="flex px-4 lg:px-0 gap-8 h-full box-content flex-col lg:flex-row justify-center">
      <!-- Profile Card -->
      <ProfileCard />

      <!-- Bridged Card -->
      <!-- <ProfileSubCard> -->
      <!-- <div class="flex flex-col gap-8 items-center w-full">
          <div class="f-center gap-2">
            <div class="title-subsection-bold">Bridged</div>
            <Icon type={'question-circle'}></Icon>
          </div>
          <div class="flex flex-col w-full">
            <div class="flex w-full justify-between items-center">
              <div class="display-small-medium">0.00</div>
              <img src={ETHIcon} alt={ETHIcon} class="size-6" />
            </div>
            <div class="flex w-full justify-between items-center">
              <div class="display-small-medium">0.00</div>
              <img src={TKOIcon} alt={TKOIcon} class="size-6" />
            </div>
          </div>
        </div> -->
      <!-- </ProfileSubCard> -->

      <!-- Booster Card -->
      <ProfileSubCard>
        <div class="flex flex-col gap-6 items-center justify-center w-full">
          <div class="f-center gap-2">
            <div class="title-subsection-bold">Booster</div>
            <Icon type={'question-circle'}></Icon>
          </div>
          <div class="f-center flex-col w-full">
            <div class="display-small-medium text-tertiary-content">Coming Soon</div>
          </div>
        </div>
      </ProfileSubCard>

      <!-- Claim Galxe -->
      {#if profile.galxePoints && profile.galxePoints > 0}
        <ProfileSubCard props={{ color: 'bg-[#310E2F]' }}>
          <div class="flex flex-col items-center justify-start w-full h-full">
            <!-- Top Half -->
            <div class="flex gap-2 pb-3">
              <div class="title-subsection-bold">Galxe</div>
              <Tooltip position="bottom">
                <div>Are you a Galxe user?</div>
                <div>
                  Galxe users receive an automatic headstart in Trailblazers as a special benefit. Convert your Galxe
                  points directly into Trailblazer points to begin your journey with an advantage!
                </div>
              </Tooltip>
            </div>
            <div class="divider m-0"></div>

            <div class="f-center flex-col px-6 w-full justify-between">
              <div class="f-center flex-col py-[28px]">
                <div class="body-bold">{profile.galxePoints} Galxe Points =</div>
                <div class="display-medium-medium">{profile.trailblazerPoints}</div>
                <div>Trailblazer Points</div>
              </div>
              <ActionButton
                class="h-fit"
                disabled={profile.galxePointsClaimed || profile.galxePoints == 0}
                loading={$galxeLoading}
                priority="primary"
                on:click={handleGalxeClaim}>{profile.galxePointsClaimed ? 'Claimed' : 'Claim'}</ActionButton>
            </div>
          </div>
        </ProfileSubCard>
      {/if}
    </div>

    <ProfileTabs />
  </div>
</div>
