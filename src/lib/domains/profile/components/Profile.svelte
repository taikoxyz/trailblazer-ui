<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';

  import { page } from '$app/stores';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  import { classNames } from '$libs/util/classNames';

  import profileService from '../services/ProfileServiceInstance';
  import { profileLoading } from '../stores/profileStore';
  import BoosterCard from './BoosterCard.svelte';
  import ProfileCard from './ProfileCard.svelte';
  import ProfileModals from './ProfileModals.svelte';
  import ProfileTabs from './ProfileTabs.svelte';

  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    await profileService.getProfile(urlAddress, $activeSeason);
  });

  const wrapperClasses = classNames("flex","flex-col","items-center")
  const profileWrapperClasses = classNames(
"flex","flex-col","max-w-section","w-full","lg:gap-8"
  )

  const profileHeaderClasses = classNames(
"flex","px-4","lg:px-0","gap-8","h-full","box-content","flex-col","lg:flex-row","justify-center"
  )
</script>

<div class={wrapperClasses}>
  <div class={profileWrapperClasses}>
    <div class={profileHeaderClasses}>
      <ProfileCard loading={$profileLoading} />
      <BoosterCard />
    </div>

    <div class="mt-[60px]">
      <ProfileTabs />
    </div>
  </div>
</div>

<ProfileModals />
