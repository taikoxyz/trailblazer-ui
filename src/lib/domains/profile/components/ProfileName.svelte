<script lang="ts">
  import { Icon, IconFlipper } from '$components/Icon';
  import { shortenAddress } from '$libs/util/shortenAddress';

  import profileService from '../services/ProfileServiceInstance';
  import { profileLoading, userProfile } from '../stores/profileStore';
  import { DomainType } from '../types/types';
  import type { UserProfile } from '../types/UserProfile';

  export let profile: UserProfile;
  let dropdown: HTMLDivElement;

  $: profile = $userProfile;

  $: open = false;

  function handleSetDomain(selectedDomain: DomainType) {
    profileService.setSelectedDomain(selectedDomain);
    closeDropdown();
  }

  const closeDropdown = () => {
    const elem = document.activeElement;
    if (elem) {
      (elem as HTMLElement)?.blur();
    }
  };

  function getDisplayName(profile: UserProfile): string {
    if (profile?.domainInfo?.selected === DomainType.DOTTAIKO && profile?.domainInfo.dotTaiko)
      return profile.domainInfo.dotTaiko;
    if (profile?.domainInfo?.selected === DomainType.ZNS && profile?.domainInfo.zns) return profile.domainInfo.zns;
    if (profile?.address) return shortenAddress(profile?.address);
    return '';
  }
</script>

<div class="flex items-center gap-1">
  {#if !$profileLoading}
    <Icon type="user-circle" fillClass="fill-base-content" />
    <a
      href={`https://taikoscan.io/address/${profile?.address}`}
      target="_blank"
      class="body-bold hover:cursor-pointer underline text-base-content">
      {getDisplayName(profile)}
    </a>
  {/if}
  {#if profile?.domainInfo?.dotTaiko || profile?.domainInfo?.zns}
    <div class="dropdown dropdown-bottom" bind:this={dropdown}>
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle btn-sm p-0 items-center justify-center">
        <IconFlipper
          type="swap-rotate"
          iconType1="chevron-left"
          iconType2="chevron-down"
          selectedDefault="chevron-left"
          class="w-[24px] h-[24px] rounded-full"
          size={20}
          bind:flipped={open}
          on:labelclick={() => (open = !open)} />
      </div>
      <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {#if profile?.domainInfo.dotTaiko && profile?.domainInfo.selected != DomainType.DOTTAIKO}
          <li><button on:click={() => handleSetDomain(DomainType.DOTTAIKO)}>{profile.domainInfo.dotTaiko}</button></li>
        {/if}
        {#if profile?.domainInfo.zns && profile?.domainInfo.selected != DomainType.ZNS}
          <li><button on:click={() => handleSetDomain(DomainType.ZNS)}>{profile.domainInfo.zns}</button></li>
        {/if}
        {#if profile?.address && profile?.domainInfo.selected != DomainType.ADDRESS}
          <li>
            <button on:click={() => handleSetDomain(DomainType.ADDRESS)}>{shortenAddress(profile?.address)}</button>
          </li>
        {/if}
      </ul>
    </div>
  {/if}
</div>
