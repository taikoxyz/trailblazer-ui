<script lang="ts">
  import { Icon } from '$components/Icon';
  import { Domain, DomainType } from '$libs/domain';
  import { type UserProfile } from '$libs/profile';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { currentProfile } from '$stores/profile';

  export let profile: UserProfile;
  let dropdown: HTMLDetailsElement | null = null;
  $: profile = $currentProfile;

  function handleSetDomain(selectedDomain: DomainType) {
    Domain.setSelectedDomain(selectedDomain);
    if (dropdown) dropdown.removeAttribute('open');
  }

  function getDisplayName(profile: UserProfile): string {
    if (profile?.selected === DomainType.DOTTAIKO && profile?.dotTaiko) return profile.dotTaiko;
    if (profile?.selected === DomainType.ZNS && profile?.zns) return profile.zns;
    return shortenAddress(profile?.address);
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

  {#if profile?.dotTaiko || profile?.zns}
    <details bind:this={dropdown} class="dropdown dropdown-end ml-1 flex">
      <summary class="btn p-1 h-[20px] w-[20px] min-h-0 bg-secondary-icon border-secondary-icon">
        <Icon class="-translate-x-[1px] h-[6px] w-[10px]" type="chevron-down" />
      </summary>
      <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {#if profile?.dotTaiko && profile?.selected != DomainType.DOTTAIKO}
          <li><button on:click={() => handleSetDomain(DomainType.DOTTAIKO)}>{profile.dotTaiko}</button></li>
        {/if}
        {#if profile?.zns && profile?.selected != DomainType.ZNS}
          <li><button on:click={() => handleSetDomain(DomainType.ZNS)}>{profile.zns}</button></li>
        {/if}
        {#if profile?.address && profile?.selected != DomainType.ADDRESS}
          <li>
            <button on:click={() => handleSetDomain(DomainType.ADDRESS)}>{shortenAddress(profile?.address)}</button>
          </li>
        {/if}
      </ul>
    </details>
  {/if}
</div>
