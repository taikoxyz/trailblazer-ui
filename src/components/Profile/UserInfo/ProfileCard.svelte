<script lang="ts">
  import CountUp from '$components/Numbers/CountUp.svelte';
  import { Tooltip } from '$components/Tooltip';
  import { type UserProfile } from '$libs/profile';
  import { formatMultiplier } from '$libs/util/formatMultiplier';
  import { currentProfile } from '$stores/profile';

  import RankDisplay from '../RankDisplay.svelte';
  import { ProfileName } from '.';

  let profile: UserProfile;
  let multipliedView = true;
  $: profile = $currentProfile;
  $: totalMultiplier = formatMultiplier(profile?.multipliers.totalMultiplier);
  $: displayedScore = multipliedView ? $currentProfile?.boostedPoints : profile?.score;
</script>

<div
  class="flex bg-elevated-background p-5 pt-[84px] lg:pt-5 rounded-3xl w-full flex-col lg:flex-row items-center xl:w-1/2 xl:max-w-[630px]">
  <!-- <div class="flex flex-col gap-5 lg:w-1/2 w-full items-center lg:items-start lg:max-h-[300px] lg:max-w-[300px]"> -->
  <div class="avatar lg:size-[258px] size-[250px] items-center lg:mr-8">
    <div class="h-full bg-orange-400 rounded-3xl">
      <img src={profile?.avatar} alt="avatar" />
    </div>
  </div>
  <!-- <ProfileMultipliers /> -->
  <div class="flex lg:items-start items-center flex-col gap-2 self-center lg:min-w-[300px] w-full">
    <div class="flex align-start justify-between items-center gap-2 mt-5 lg:mt-0">
      <ProfileName {profile} />
    </div>

    <!-- Points -->
    <div class="flex flex-col items-start lg:mb-2 gap-2 w-full">
      <div class="flex items-center gap-2">
        <CountUp class="font-clash-grotesk font-semibold text-[45px] leading-none" value={Number(displayedScore)} />
        <div class="body-regular">points</div>
      </div>
      <div
        class="relative w-full"
        role="button"
        tabindex="0"
        on:mouseover={() => (multipliedView = false)}
        on:mouseleave={() => (multipliedView = true)}
        on:focus={() => (multipliedView = false)}
        on:blur={() => (multipliedView = true)}
        aria-label="Toggle score view">
        {#if multipliedView}
          <div
            class="w-fit flex items-center gap-1 py-1 px-2 body-small-bold border border-divider-border bg-neutral-background rounded-full transition-all duration-300 ease-in-out hover:bg-neutral-hover">
            <span class="body-small-bold tracking-wide">{totalMultiplier}x boosted</span>
            <Tooltip position="bottom" class="">
              <div class="bg-white text-black p-3 rounded-lg">
                <h2 class="text-black font-bold mb-2">Your Final Score</h2>
                <div class="text-black body-regular">
                  Your end of season rewards will be determined by your final score:
                  <br />
                  <span class="font-semibold">Base Score × Multipliers = Final Score</span>
                </div>
              </div>
            </Tooltip>
          </div>
        {:else}
          <div
            class="flex w-full items-center gap-2 py-1 px-2 body-small-bold rounded-full transition-all duration-300 ease-in-out">
            <span>≈</span>
            <CountUp class="body-regular" value={Number($currentProfile?.boostedPoints)} />
            <Tooltip position="bottom" class="">
              <div class="bg-white text-black p-3 rounded-lg">
                <h2 class="text-black font-bold mb-2">Your Final Score</h2>
                <div class="text-black body-regular">
                  Your end of season rewards will be determined by your final score:
                  <br />
                  <span class="font-semibold">Base Score × Multipliers = Final Score</span>
                </div>
              </div>
            </Tooltip>
          </div>
        {/if}
      </div>
    </div>
    <!-- Faction -->
    <!-- <div class="flex gap-2 items-center">
      <div class="flex rounded-full border border-divider-border p-0.5 pl-[15px] gap-2 items-center w-fit">
        <div class="flex text-secondary-content">Faction</div>
        <div class="flex rounded-full px-[10px] py-[6px] bg-primary-brand items-center body-bold">Ravers</div>
      </div>

      <div class="flex rounded-full px-[10px] py-[6px] bg-purple-600 items-center body-bold">Boosted</div>
    </div> -->
    <!-- Rank & Experience -->
    <div class="flex lg:items-start items-center flex-col gap-[10px] w-full">
      <!-- <div class="flex justify-between body-bold"> -->
      <div class="flex gap-[10px] border border-divider-border rounded-full w-fit p-1">
        <div class="body-bold pl-[15px] py-1">Level {profile?.level}</div>
        <div class="f-center rounded-full body-bold bg-pink-400 w-fit px-[10px]">{profile?.title}</div>
      </div>
      <RankDisplay rank={Number(profile.rank)} total={Number(profile.total)} percentile={profile.rankPercentile} />
    </div>
  </div>

  <!-- Battle and Explore Buttons -->
  <!-- <div class="flex gap-4">
      <button class="btn btn-primary min-w-[156px] body-bold"> Battle </button>
      <button class="btn btn-primary min-w-[156px] body-bold bg-transparent"> Explore </button>
    </div> -->
</div>
