<script lang="ts">
  import Spinner from '$components/Spinner/Spinner.svelte';
  import { Tooltip } from '$components/Tooltip';
  import { type UserProfile } from '$libs/profile';
  import { classNames } from '$libs/util/classNames';
  import { formatMultiplier } from '$libs/util/formatMultiplier';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { pfpModal } from '$stores/modal';
  import { currentProfile } from '$stores/profile';

  import RankDisplay from '../RankDisplay.svelte';
  import { ProfileName } from '.';

  export let loading;

  let profile: UserProfile;
  let multipliedView = true;
  $: profile = $currentProfile;
  $: totalMultiplier = formatMultiplier(profile?.multipliers.totalMultiplier);
  $: displayedScore = profile?.score;

  const editAvatarButtonClasses = classNames(
    'absolute',
    'w-[32px]',
    'h-[32px]',
    'top-[10px]',
    'right-[10px]',
    'rounded-full',
    'bg-[#2B303B]',
    'p-[8px]',
    'bg-opacity-70',
  );
</script>

<div
  class="flex bg-elevated-background p-5 pt-[84px] lg:pt-5 rounded-3xl w-full flex-col lg:flex-row items-center xl:w-1/2 xl:max-w-[680px]">
  {#if !loading}
    <div class="avatar lg:size-[258px] size-[250px] items-center lg:mr-8">
      <div class="relative h-full bg-orange-400 rounded-3xl">
        <img src={profile?.avatar} alt="avatar" />

        <button on:click={() => ($pfpModal = true)} class={editAvatarButtonClasses}>
          <img alt="Edit avatar" src="/edit.svg" />
        </button>
      </div>
    </div>
    <!-- <ProfileMultipliers /> -->
    <div class="flex lg:items-start items-center flex-col self-center lg:min-w-[300px] w-full">
      <div class="flex align-start justify-between items-center gap-2 mt-5 lg:mt-0 mb-[20px]">
        <ProfileName {profile} />
      </div>

      <!-- Points -->
      <div class="flex flex-col items-center lg:items-start gap-2 w-full mb-[20px]">
        <div class="flex items-center gap-2">
          <div class="font-clash-grotesk font-semibold text-[45px] leading-none">
            {formatNumbers(displayedScore.toFixed(0))}
          </div>
          <!-- <CountUp class="font-clash-grotesk font-semibold text-[45px] leading-none" value={Number(displayedScore)} /> -->
          <div class="body-regular">points</div>
        </div>
        {#if multipliedView}
          <button
            on:click={() => (multipliedView = false)}
            class="w-fit max-w-[150px] h-[24px] flex items-center gap-1 py-2 pl-2 pr-1 body-small-bold border border-divider-border bg-neutral-background rounded-full transition-all duration-300 ease-in-out hover:bg-neutral-hover hover:cursor-pointer">
            <span class="body-small-bold tracking-wide">{totalMultiplier}x boosted</span>
            <Tooltip position="bottom" class="">
              <div class="bg-white text-black rounded-lg">
                <h2 class="text-black font-bold mb-2">Your final score</h2>
                <div class="text-black body-regular">
                  Your end of season rewards will be determined by your final score:
                  <br />
                  <span class="font-semibold">Base score × multipliers = final score</span>
                </div>
              </div>
            </Tooltip>
          </button>
        {:else}
          <button
            on:click={() => (multipliedView = true)}
            class="flex w-fit h-[24px] items-center gap-1 py-2 pl-2 pr-1 body-small-bold border border-transparent rounded-full transition-all duration-300 ease-in-out hover:cursor-pointer">
            <span>≈ {formatNumbers(Number($currentProfile?.boostedPoints))} points</span>
            <Tooltip position="bottom" class="">
              <div class="bg-white text-black rounded-lg">
                <h2 class="text-black font-bold mb-2">Your final score</h2>
                <div class="text-black body-regular">
                  Your end of season rewards will be determined by your final score:
                  <br />
                  <span class="font-semibold">Base score × multipliers = final score</span>
                </div>
              </div>
            </Tooltip>
          </button>
        {/if}
      </div>

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
  {:else}
    <div class="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  {/if}
</div>
