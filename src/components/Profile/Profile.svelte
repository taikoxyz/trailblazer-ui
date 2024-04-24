<script>
  import Tabs from '$components/Tabs/Tabs.svelte';
  import { Profile } from '$libs/profile';
  import { onMount } from 'svelte';
  import ProfileCard from './ProfileCard.svelte';
  import ProfileSubCard from './ProfileSubCard.svelte';

  onMount(() => {
    Profile.getUserTransactions();
    Profile.getProfile();
  });
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col max-w-section w-full gap-8">
    <div class="flex max-w-section w-full gap-8 box-content h-[264px]">
      <ProfileCard />

      <ProfileSubCard>
        <div class="flex flex-col gap-8 items-center w-full">
          <div class="title-subsection-bold">Bridged</div>
          <div class="flex flex-col w-full">
            <div class="flex w-full justify-between items-center">
              <div class="display-small-medium">0.00</div>
              <div class="display-small-medium">ETH</div>
            </div>
            <div class="flex w-full justify-between items-center">
              <div class="display-small-medium">0.00</div>
              <div class="display-small-medium">TKO</div>
            </div>
          </div>
        </div>
      </ProfileSubCard>

      <ProfileSubCard props={{ color: 'bg-purple-600' }}>
        <div class="flex flex-col gap-8 items-center w-full">
          <div class="title-subsection-bold">Bridged</div>
          <div class="flex flex-col w-full">
            <div class="flex w-full justify-between items-center">
              <div class="display-small-medium">0.00</div>
              <div class="display-small-medium">ETH</div>
            </div>
            <div class="flex w-full justify-between items-center">
              <div class="display-small-medium">0.00</div>
              <div class="display-small-medium">TKO</div>
            </div>
          </div>
        </div>
      </ProfileSubCard>
    </div>

    <Tabs />
  </div>
</div>
