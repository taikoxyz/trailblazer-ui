<script>
  import Tabs from '$components/Tabs/Tabs.svelte';
  import { Profile } from '$libs/profile';
  import { onMount } from 'svelte';
  import ProfileCard from './ProfileCard.svelte';
  import ProfileStatistics from './ProfileStatistics.svelte';

  onMount(() => {
    Profile.getUserTransactions();
    Profile.getProfile();
  });
</script>

<div class="flex flex-col w-full items-center gap-8">
  <div class="flex max-w-section w-full gap-8 box-content">
    <ProfileCard />
    <ProfileStatistics />
  </div>
  <div class="max-w-section w-full title-section-regular">Transaction Details</div>

  <Tabs />
</div>
