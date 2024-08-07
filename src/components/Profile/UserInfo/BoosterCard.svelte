<script lang="ts">
  import { Button } from '$components/Button';
  import { Icon } from '$components/Icon';
  import { AbstractProfileCard } from '$components/Profile/Template';
  import { Spinner } from '$components/Spinner';
  import { Tooltip } from '$components/Tooltip';
  import { boosterLoading } from '$stores/load';
  import { currentProfile } from '$stores/profile';

  let showBreakdown = false;
  let factionMultiplier = 1;
  let snaefellMultiplier = 1;
  let taikoonMultiplier = 1;
  let totalMultiplier = 1;

  function getMultiplier(multiplier: number): number {
    return Number(((multiplier + 1000) / 1000).toFixed(2));
  }

  $: profile = $currentProfile;
  $: {
    totalMultiplier = getMultiplier(profile.multipliers?.totalMultiplier);
    factionMultiplier = getMultiplier(profile.multipliers?.factionMultiplier);
    snaefellMultiplier = getMultiplier(profile.multipliers?.snaefellMultiplier);
    taikoonMultiplier = getMultiplier(profile.multipliers?.taikoonMultiplier);
  }
</script>

<AbstractProfileCard class="bg-[#1B0E3E] relative">
  <button
    class="absolute"
    slot="back-icon"
    on:click={() => {
      showBreakdown = false;
    }}>
    <Icon class="justify-self-start item {!showBreakdown ? 'hidden' : ''}" type="chevron-left" />
  </button>
  <div slot="title" class="booster-card-title flex justify-center w-full">Multipliers</div>

  <Tooltip class="absolute right-4" slot="tooltip" position="bottom">
    <div class="bg-white text-black">
      <h2 class=" text-black">Earn more with multipliers</h2>
      <div class="body-regular text-black">
        Boost your earnings! Participate in trails, hold badges, and join our 4x DeFi campaign.
      </div>
    </div>
  </Tooltip>
  <div slot="status" class="w-full">
    {#if $boosterLoading}
      <div class="flex items-center justify-center display-medium-medium">
        <Spinner />
      </div>
    {:else if !showBreakdown}
      <div class="flex items-center justify-center display-medium-medium">{totalMultiplier}x</div>
    {:else}
      <div class="flex flex-col gap-2 w-full">
        <div class="flex items-center justify-between w-full">
          Faction Badges <span class="body-bold">{factionMultiplier}x</span>
        </div>
        <div class="flex items-center justify-between w-full">
          Snaefell NFT <span class="body-bold">{snaefellMultiplier}x</span>
        </div>
        <div class="flex items-center justify-between w-full">
          Taikoon NFT <span class="body-bold">{taikoonMultiplier}x</span>
        </div>
      </div>
    {/if}
  </div>

  <div slot="cta" class="flex flex-col gap-2 w-full">
    {#if !showBreakdown}
      <button
        class="flex items-center justify-between gap-2"
        on:click={() => {
          showBreakdown = true;
        }}
        >Your multipliers <Icon type="chevron-right"></Icon>
      </button>
    {/if}
    <a
      class="flex items-center justify-between gap-2 hover:cursor-pointer"
      href="https://taiko.mirror.xyz/589CthdX0Qw-hRBeZarEQpjck-v4lJ-gtKz3SZvovt8"
      target="_blank"
      >How to earn multipliers <Icon type="chevron-right"></Icon>
    </a>
  </div>
</AbstractProfileCard>
