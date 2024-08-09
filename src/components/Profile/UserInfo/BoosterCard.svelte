<script lang="ts">
  import { t } from 'svelte-i18n';

  import { Icon } from '$components/Icon';
  import { AbstractProfileCard } from '$components/Profile/Template';
  import { Spinner } from '$components/Spinner';
  import { Tooltip } from '$components/Tooltip';
  import { formatMultiplier } from '$libs/util/formatMultiplier';
  import { boosterLoading } from '$stores/load';
  import { currentProfile } from '$stores/profile';

  let showBreakdown = false;
  let factionMultiplier = 1;
  let snaefellMultiplier = 1;
  let taikoonMultiplier = 1;
  let totalMultiplier = 1;

  $: profile = $currentProfile;
  $: {
    totalMultiplier = formatMultiplier(profile.multipliers?.totalMultiplier);
    factionMultiplier = formatMultiplier(profile.multipliers?.factionMultiplier);
    snaefellMultiplier = formatMultiplier(profile.multipliers?.snaefellMultiplier);
    taikoonMultiplier = formatMultiplier(profile.multipliers?.taikoonMultiplier);
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
  <div slot="title" class="booster-card-title flex justify-center w-full">{$t('booster.title')}</div>

  <Tooltip class="absolute right-4" slot="tooltip" position="bottom">
    <div class="bg-white text-black">
      <h2 class=" text-black">{$t('booster.tooltip.title')}</h2>
      <div class="body-regular text-black">
        {$t('booster.tooltip.description')}
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
          {$t('booster.breakdown.factionBadges')} <span class="body-bold">{factionMultiplier}x</span>
        </div>
        <div class="flex items-center justify-between w-full">
          {$t('booster.breakdown.snaefellNft')} <span class="body-bold">{snaefellMultiplier}x</span>
        </div>
        <div class="flex items-center justify-between w-full">
          {$t('booster.breakdown.taikoonNft')} <span class="body-bold">{taikoonMultiplier}x</span>
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
        >{$t('booster.cta.yourMultipliers')} <Icon type="chevron-right"></Icon>
      </button>
    {/if}
    <a
      class="flex items-center justify-between gap-2 hover:cursor-pointer"
      href="https://taiko.mirror.xyz/589CthdX0Qw-hRBeZarEQpjck-v4lJ-gtKz3SZvovt8"
      target="_blank"
      >{$t('booster.cta.howToEarn')} <Icon type="chevron-right"></Icon>
    </a>
  </div>
</AbstractProfileCard>
