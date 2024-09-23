<script lang="ts">
  import { Icon } from '$components/Icon';
  import { Domain, DomainType } from '$libs/domain';
  import { shortenAddress } from '$libs/util/shortenAddress';

  import { userProfile } from '../stores/profileStore';
  import type { UserProfile } from '../types/UserProfile';

  export let profile: UserProfile;
  let dropdown: HTMLDetailsElement | null = null;
  $: profile = $userProfile;

  function handleSetDomain(selectedDomain: DomainType) {
    Domain.setSelectedDomain(selectedDomain);
    if (dropdown) dropdown.removeAttribute('open');
  }

  function getDisplayName(profile: UserProfile): string {
    if (profile?.domainInfo?.selected === DomainType.DOTTAIKO && profile?.domainInfo.dotTaiko)
      return profile.domainInfo.dotTaiko;
    if (profile?.domainInfo?.selected === DomainType.ZNS && profile?.domainInfo.zns) return profile.domainInfo.zns;
    if (profile?.address) return shortenAddress(profile?.address);
    return '';
  }
</script>

<div class="flex items-center gap-1">
  <Icon type="user-circle" />
  <a
    href={`https://taikoscan.io/address/${profile?.address}`}
    target="_blank"
    class="body-bold hover:cursor-pointer underline text-primary-link">
    {getDisplayName(profile)}
  </a>

  {#if profile?.domainInfo?.dotTaiko || profile?.domainInfo?.zns}
    <details bind:this={dropdown} class="dropdown dropdown-end ml-1 flex">
      <summary class="btn p-1 h-[20px] w-[20px] min-h-0 bg-secondary-icon border-secondary-icon">
        <Icon class="-translate-x-[1px] h-[6px] w-[10px]" type="chevron-down" />
      </summary>
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
    </details>
  {/if}
</div>
