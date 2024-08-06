<script lang="ts">
  import { onMount } from 'svelte';

  import ActionButton from '$components/Button/ActionButton.svelte';
  import { MintDisclaimerModal } from '$components/MintDisclaimerModal';
  import { ProfileTabs } from '$components/Tabs';
  import { Tooltip } from '$components/Tooltip';
  import { Galxe } from '$libs/galxe';
  import type { UserProfile } from '$libs/profile';
  import { galxeLoading } from '$stores/load';
  import { currentProfile } from '$stores/profile';
  import { BoosterCard, ProfileCard, GalxeCard } from './UserInfo';

  let profile: UserProfile;
  $: profile = $currentProfile;

  async function handleGalxeClaim() {
    $galxeLoading = true;
    await Galxe.claim();
    $galxeLoading = false;
  }

  onMount(async () => {
    await Galxe.refreshData();
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
      <BoosterCard />
      <!-- Galxe Card -->
      <GalxeCard />
    </div>

    <ProfileTabs />
  </div>
</div>

<MintDisclaimerModal />
