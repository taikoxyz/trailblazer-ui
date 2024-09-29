<script lang="ts">
  import { onMount } from 'svelte';

  import { MintDisclaimerModal } from '$components/MintDisclaimerModal';
  import { ProfileTabs } from '$components/Tabs';
  import { Galxe } from '$libs/galxe';
  import { profileLoading } from '$stores/load';

  import UserPfp from '../../lib/domains/profile/components/ProfilePicture/ProfilePictureModal.svelte';
  import { BoosterCard, ProfileCard } from './UserInfo';

  onMount(async () => {
    await Galxe.refreshData();
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full lg:gap-8">
    <div class="flex px-4 lg:px-0 gap-8 h-full box-content flex-col lg:flex-row justify-center">
      <ProfileCard loading={$profileLoading} />

      <BoosterCard />
    </div>

    <ProfileTabs />
  </div>
</div>

<UserPfp />
<MintDisclaimerModal />
