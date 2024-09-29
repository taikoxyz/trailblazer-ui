<script lang="ts">
  import { pfpModal, profileLoading } from '$lib/domains/profile/stores/';
  import type { UserProfile } from '$lib/domains/profile/types/UserProfile';
  import type { NFT } from '$lib/shared/types/NFT';
  import { classNames } from '$libs/util/classNames';

  export let profile: UserProfile;
  export let isSelfProfile: boolean;

  const editAvatarButtonClasses = classNames(
    'btn',
    'btn-sm',
    'btn-ghost',
    'absolute',
    'max-w-[32px]!',
    'max-h-[32px]!',
    'top-[10px]',
    'right-[10px]',
    'rounded-full',
    'bg-dialog-background',
    'p-[6px]',
    'opacity-50',
    'hover:opacity-100',
  );

  $: pfp = profile?.personalInfo?.avatar || ({} as NFT);
</script>

<div class=" h-full skeleton bg-neutral-background rounded-3xl">
  {#if !$profileLoading}
    <img src={pfp.src || '/avatar.png'} alt="avatar" />
  {/if}

  {#if isSelfProfile}
    <button on:click={() => ($pfpModal = true)} class={editAvatarButtonClasses}>
      <img alt="Edit avatar" src="/edit.svg" class="size-[16px]" />
    </button>
  {/if}
</div>
