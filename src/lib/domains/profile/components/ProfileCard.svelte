<script lang="ts">
  import { onMount } from 'svelte';
  import { type Address, getAddress } from 'viem';

  import { page } from '$app/stores';
  import { Spinner } from '$lib/shared/components';
  import { formatNumbers } from '$lib/shared/utils';
  import { classNames } from '$libs/util/classNames';
  import getConnectedAddress from '$libs/util/getConnectedAddress';

  import { userProfile } from '../stores/profileStore';
  import ProfileName from './ProfileName.svelte';

  export let loading: boolean;

  let profile;
  $: profile = $userProfile;
  $: displayedScore = profile?.userStats?.score;
  $: isSelfProfile = false;

  // const editAvatarButtonClasses = classNames(
  //   'absolute',
  //   'w-[32px]',
  //   'h-[32px]',
  //   'top-[10px]',
  //   'right-[10px]',
  //   'rounded-full',s
  //   'bg-dialog-background',
  //   'p-[8px]',
  //   'bg-opacity-70',
  // );

  const cardClasses = classNames(
    'relative',
    'flex',
    'bg-elevated-background',
    'p-[20px]',
    'overflow-hidden',
    'lg:pt-5',
    'rounded-3xl',
    'w-full',
    'lg:h-[290px]',
    'flex-col',
    'lg:flex-row',
    'xl:w-1/2',
    'xl:max-w-[680px]',
  );

  let pfp = '';

  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile = getAddress(urlAddress) === getAddress(getConnectedAddress());
    // pfp = await Pfp.get(urlAddress);
  });
</script>

<div class={cardClasses}>
  <div class="absolute h-[75px] w-full custom left-0 top-0">
    <div class="flex pl-[218px] pt-[37px]">
      <ProfileName {profile} />
    </div>
  </div>
  {#if !loading}
    <div class="avatar lg:size-[175px] lg:mr-8">
      <div class=" h-full skeleton bg-neutral-background rounded-3xl">
        <img src={pfp || '/avatar.png'} alt="avatar" />

        {#if isSelfProfile}
          <!-- <button on:click={() => ($pfpModal = true)} class={editAvatarButtonClasses}>
            <img alt="Edit avatar" src="/edit.svg" />
          </button> -->
        {/if}
      </div>
    </div>
    <div class="flex lg:items-start items-center flex-col self-center lg:min-w-[300px] w-full">
      <!-- Points -->
      <div class="flex flex-col items-center lg:items-start gap-2 w-full mb-[20px]">
        <div class="flex items-center gap-2">
          <div class="font-clash-grotesk font-semibold text-[45px] leading-none">
            {displayedScore?.toFixed(0) && formatNumbers(displayedScore?.toFixed(0))}
          </div>
          <div class="text-secondary-content">points</div>
        </div>
      </div>

      <!-- Rank & Experience -->
      <div class="flex lg:items-start items-center flex-col gap-[10px] w-full">
        <div class="flex gap-[10px] border border-divider-border rounded-full w-fit p-1">
          <div class="body-bold pl-[15px] py-1">Level {profile?.userStats?.level || 0}</div>
          <div class="f-center rounded-full body-bold bg-pink-400 w-fit px-[10px]">
            {profile?.userStats?.title || 'Beginner'}
          </div>
        </div>
        <!-- <RankDisplay rank={Number(profile.rank)} total={Number(profile.total)} percentile={profile.rankPercentile} /> -->
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
