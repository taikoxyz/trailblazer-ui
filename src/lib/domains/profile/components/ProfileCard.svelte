<script lang="ts">
  import { onMount } from 'svelte';
  import { type Address, getAddress } from 'viem';

  import { page } from '$app/stores';
  import { Spinner } from '$lib/shared/components';
  import { formatNumbers } from '$lib/shared/utils';
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
  //   'rounded-full',
  //   'bg-dialog-background',
  //   'p-[8px]',
  //   'bg-opacity-70',
  // );

  let pfp = '';

  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile = getAddress(urlAddress) === getAddress(getConnectedAddress());
    // pfp = await Pfp.get(urlAddress);
  });
</script>

<div
  class="flex bg-elevated-background p-5 pt-[84px] lg:pt-5 rounded-3xl w-full flex-col lg:flex-row items-center xl:w-1/2 xl:max-w-[680px]">
  {#if !loading}
    <div class="avatar lg:size-[258px] size-[250px] items-center lg:mr-8">
      <div class="relative h-full skeleton bg-neutral-background rounded-3xl">
        <img src={pfp || '/avatar.png'} alt="avatar" />

        {#if isSelfProfile}
          <!-- <button on:click={() => ($pfpModal = true)} class={editAvatarButtonClasses}>
            <img alt="Edit avatar" src="/edit.svg" />
          </button> -->
        {/if}
      </div>
    </div>
    <div class="flex lg:items-start items-center flex-col self-center lg:min-w-[300px] w-full">
      <div class="flex align-start justify-between items-center gap-2 mt-5 lg:mt-0 mb-[20px]">
        <ProfileName {profile} />
      </div>

      <!-- Points -->
      <div class="flex flex-col items-center lg:items-start gap-2 w-full mb-[20px]">
        <div class="flex items-center gap-2">
          <div class="font-clash-grotesk font-semibold text-[45px] leading-none">
            {displayedScore?.toFixed(0) && formatNumbers(displayedScore?.toFixed(0))}
          </div>
          <div class="body-regular">points</div>
        </div>
      </div>

      <!-- Rank & Experience -->
      <div class="flex lg:items-start items-center flex-col gap-[10px] w-full">
        <div class="flex gap-[10px] border border-divider-border rounded-full w-fit p-1">
          <div class="body-bold pl-[15px] py-1">Level {profile?.userStats?.level}</div>
          <div class="f-center rounded-full body-bold bg-pink-400 w-fit px-[10px]">{profile?.userStats?.title}</div>
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
