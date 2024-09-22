<script lang="ts">
  import { onMount } from 'svelte';

  import { MintDisclaimerModal } from '$components/MintDisclaimerModal';
  import { ProfileTabs } from '$components/Tabs';
  import { Season1Bonus } from '$libs/bonus/s1/season1';
  import { profileLoading } from '$stores/load';
  import { BoosterCard, ProfileCard } from './UserInfo';
  import SeasonBonusCard from './UserInfo/SeasonBonusCard.svelte';
  import UserPfp from './UserPFP/UserPFP.modal.svelte';

  onMount(async () => {
    await Season1Bonus.refreshData();
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full lg:gap-8">
    <div class="flex px-4 lg:px-0 gap-8 h-full box-content flex-col lg:flex-row justify-center">
      <ProfileCard loading={$profileLoading} />
      <BoosterCard />

      <SeasonBonusCard />

    </div>

    <ProfileTabs />
  </div>
</div>

<UserPfp />
<MintDisclaimerModal />
