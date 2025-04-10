<script lang="ts">
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { profileLoading, userProfile } from '$lib/domains/profile/stores/profileStore';
  import { DomainType } from '$lib/domains/profile/types/types';
  import type { UserProfile } from '$lib/domains/profile/types/UserProfile';
  import { Icon } from '$shared/components/Icon';
  import { shortenAddress } from '$shared/utils/shortenAddress';

  export let profile: UserProfile;
  let dropdown: HTMLDivElement;

  $: profile = $userProfile;

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

<div class="flex items-center gap-1 group">
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
    <div class="dropdown dropdown-end group-hover:dropdown-open" bind:this={dropdown}>
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle btn-sm p-0 items-center justify-center">
        <Icon
          type="chevron-left"
          fillClass="fill-base-content"
          size={12}
          class="transition-transform duration-200 ease-in-out group-hover:-rotate-90" />
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
