<script lang="ts">
  import { ActionButton, Button } from '$components/Button';
  import { AbstractProfileCard } from '$components/Profile/Template';
  import { Tooltip } from '$components/Tooltip';
  import type { UserProfile } from '$libs/profile';
  import { currentProfile } from '$stores/profile';
  import { galxeLoading } from '$stores/load';
  import { Galxe } from '$libs/galxe';
  import { onMount } from 'svelte';

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

{#if profile.galxePoints && profile.galxePoints > 0}
  <AbstractProfileCard class="bg-[#310E2F] relative">
    <div slot="back-icon"></div>
    <div slot="title" class="title-subsection-bold flex justify-center w-full">Galxe</div>
    <Tooltip class="absolute right-4" slot="tooltip" position="bottom">
      <div class="bg-white text-black">
        <h2 class=" text-black">Are you a Galxe user?</h2>
        <div class="body-regular text-black">
          Galxe users receive an automatic headstart in Trailblazers as a special benefit. Convert your Galxe points
          directly into Trailblazer points to begin your journey with an advantage!
        </div>
      </div>
    </Tooltip>
    <div slot="status" class="f-center flex-col px-6 w-full justify-between">
      <div class="f-center flex-col py-[28px]">
        <div class="body-bold">{profile.galxePoints} Galxe Points =</div>
        <div class="display-medium-medium">{profile.trailblazerPoints}</div>
        <div>Trailblazer Points</div>
      </div>
    </div>
    <ActionButton
      slot="cta"
      class="h-fit"
      disabled={profile.galxePointsClaimed || profile.galxePoints == 0}
      loading={$galxeLoading}
      priority="primary"
      on:click={handleGalxeClaim}
      >{profile.galxePointsClaimed ? 'Claimed' : 'Claim'}
    </ActionButton>
  </AbstractProfileCard>
{/if}
