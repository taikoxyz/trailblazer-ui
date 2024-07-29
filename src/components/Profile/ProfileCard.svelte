<script lang="ts">
  import { Icon } from '$components/Icon';
  import CountUp from '$components/Numbers/CountUp.svelte';
  import { Domain, DomainType } from '$libs/domain';
  import { type UserProfile } from '$libs/profile';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { currentProfile } from '$stores/profile';

  import RankDisplay from './RankDisplay.svelte';

  let profile: UserProfile;
  let dropdown: HTMLDetailsElement | null = null;
  $: profile = $currentProfile;

  function handleSetDomain(selectedDomain: DomainType) {
    Domain.setSelectedDomain(selectedDomain);
    if (dropdown) {
      dropdown.removeAttribute('open');
    }
  }
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
      <div class="flex items-center gap-1">
        <Icon type="user-circle"></Icon>
        <a
          href={`https://taikoscan.io/address/${profile?.address}`}
          target="_blank"
          class="body-bold hover:cursor-pointer underline text-primary-link">
          {#if profile?.selected == DomainType.DOTTAIKO && profile?.dotTaiko}
            {profile.dotTaiko}
          {:else if profile?.selected == DomainType.ZNS && profile?.zns}
            {profile.zns}
          {:else}
            {shortenAddress(profile?.address)}
          {/if}
        </a>
        {#if profile?.dotTaiko || profile?.zns}
          <details bind:this={dropdown} class="dropdown dropdown-end ml-1 flex">
            <summary class="btn p-1 h-[20px] w-[20px] min-h-0 bg-secondary-icon border-secondary-icon"
              ><Icon class="-translate-x-[1px] h-[6px] w-[10px]" type="chevron-down" /></summary>
            <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {#if profile?.dotTaiko && profile?.selected != DomainType.DOTTAIKO}
                <li><button on:click={() => handleSetDomain(DomainType.DOTTAIKO)}>{profile.dotTaiko}</button></li>
              {/if}
              {#if profile?.zns && profile?.selected != DomainType.ZNS}
                <li><button on:click={() => handleSetDomain(DomainType.ZNS)}>{profile.zns}</button></li>
              {/if}
              {#if profile?.address && profile?.selected != DomainType.ADDRESS}
                <li>
                  <button on:click={() => handleSetDomain(DomainType.ADDRESS)}
                    >{shortenAddress(profile?.address)}</button>
                </li>
              {/if}
            </ul>
          </details>
        {/if}
      </div>

      <!-- <div>{shortenAddress(profile?.address)} / {profile?.ens}</div> -->
    </div>

    <!-- Points -->
    <div class="flex items-center gap-2 lg:mb-4">
      <CountUp class="font-clash-grotesk font-semibold text-[45px] leading-none" value={$currentProfile?.score} />
      <div>Points</div>
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
