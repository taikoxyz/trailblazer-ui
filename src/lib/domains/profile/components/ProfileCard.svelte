<script lang="ts">
  import { userProfile } from '$lib/domains/profile/stores/profileStore';
  import { Spinner } from '$lib/shared/components';
  import { formatNumbers } from '$lib/shared/utils';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';

  import ProfileName from './ProfileName.svelte';
  import ProfilePicture from './ProfilePicture/ProfilePicture.svelte';
  import ProfileRank from './ProfileRank.svelte';

  export let loading: boolean;
  export let isSelfProfile: boolean;

  let profile;

  $: profile = $userProfile;
  $: displayedScore = profile?.userStats?.score || 0;

  $: seasonHistoryPoints = profile?.userStats?.seasonHistory?.[$activeSeason - 1]?.total ?? 0;

  const cardClasses = classNames(
    'relative',
    'bg-elevated-background',
    'p-[20px]',
    'overflow-hidden',
    'md:pt-5',
    'rounded-3xl',
    'f-col',
    'md:f-row',
    'md:items-start',
    'items-center',
    'w-full',
    'md:h-[290px]',
    'xl:w-1/2',
    'xl:max-w-[680px]',
  );
</script>

<div class={cardClasses}>
  <div class="absolute h-[75px] w-full custom left-0 top-0">
    <div class="hidden md:flex pl-[218px] pt-[37px]">
      <ProfileName {profile} />
    </div>
  </div>

  <div class="avatar md:size-[175px] size-[250px] md:mr-8 md:justify-self-start justify-self-center">
    <ProfilePicture {profile} {isSelfProfile} />
  </div>
  {#if !loading}
    <div class="flex md:items-start items-center flex-col self-end md:min-w-[300px] w-full">
      <!-- Name (mobile)-->
      <div class="md:hidden flex items-center gap-1 py-[20px] md:py-0">
        <ProfileName {profile} />
      </div>
      <!-- Points -->
      <div class="flex flex-col items-center md:items-start gap-2 w-full mb-[20px]">
        <div class="f-col md:f-row items-center gap-2 md:mt-[14px]">
          <div class="font-clash-grotesk font-semibold text-[45px] leading-none">
            {displayedScore ? formatNumbers(displayedScore.toFixed(2)) : '0.00'}
          </div>
          <div class="text-secondary-content">points</div>
        </div>
      </div>

      <!-- Rank & Experience -->
      <div class="flex md:items-start items-center flex-col gap-[10px] w-full">
        <div class="flex gap-[10px] border border-divider-border rounded-full w-fit p-1">
          <div class="body-bold pl-[15px] py-1">Level {profile?.userStats?.level || 0}</div>
          <div class="f-center rounded-full body-bold bg-pink-400 w-fit px-[10px]">
            {profile?.userStats?.title || 'Beginner'}
          </div>
        </div>
        <ProfileRank {profile} />
      </div>
      <div class="mt-[20px]">
        <span class="text-secondary-content">Final Season 1 score: </span>
        <span>{seasonHistoryPoints}</span>
      </div>
    </div>
  {:else}
    <div class="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  {/if}
</div>

<style>
  .custom {
    background: linear-gradient(272deg, #5d08c8 -25.65%, #e81899 160.57%);
  }
</style>
