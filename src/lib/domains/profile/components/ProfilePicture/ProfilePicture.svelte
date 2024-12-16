<script lang="ts">
  import { pfpModal, profileLoading } from '$lib/domains/profile/stores/';
  import type { UserProfile } from '$lib/domains/profile/types/UserProfile';
  import { classNames } from '$shared/utils/classNames';

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
  const wrapperClasses = classNames(
    'h-[175px]',
    'w-[175px]',
    'min-w-[175px]',
    'min-h-[175px]',
    'rounded-[20px]',
    'relative',
    'overflow-hidden',
    ' skeleton',
    ' bg-neutral-background',
  );
  const pfpClasses = classNames('rounded-[20px]', 'min-w-[175px]', 'min-h-[175px]');

  $: profilePictureUrl = profile?.personalInfo?.avatar || '/avatar.png';
</script>

<div class={wrapperClasses}>
  {#if !$profileLoading}
    <img src={profilePictureUrl} class={pfpClasses} alt="avatar" />
  {/if}

  {#if isSelfProfile}
    <button on:click={() => ($pfpModal = true)} class={editAvatarButtonClasses}>
      <img alt="Edit avatar" src="/edit.svg" class="size-[16px]" />
    </button>
  {/if}
</div>
