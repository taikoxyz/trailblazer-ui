<script lang="ts">
  import { userProfile } from '$lib/domains/profile/stores/profileStore';
  import { Spinner } from '$lib/shared/components';
  import { formatNumbers } from '$lib/shared/utils';
  import { classNames } from '$shared/utils/classNames';

  import ProfileName from './ProfileName.svelte';
  import ProfilePicture from './ProfilePicture/ProfilePicture.svelte';
  import ProfileStats from './ProfileStats.svelte';

  export let loading: boolean;
  export let isSelfProfile: boolean;

  let profile;

  $: profile = $userProfile;
  $: displayedScore = profile?.userStats?.score || 0;

  const cardClasses = classNames(
    'relative',
    'bg-elevated-background',
    'p-[20px]',
    'pb-[36px]',
    'overflow-hidden',
    'gap-[24px]',
    'md:pt-5',
    'rounded-3xl',
    'f-col',
    'md:f-row',
    'md:items-start',
    'items-center',
    'w-full',
    'lg:min-w-[566px]',
    'md:h-[290px]',
    'xl:w-1/2',
    'xl:max-w-[680px]',
  );

  const gradientClasses = classNames('absolute', 'h-[66px]', 'w-full', 'profile-card-gradient', 'left-0', 'top-0');

  const hiddenDesktopNameClasses = classNames('hidden', 'md:flex', 'pl-[218px]', 'pt-[27px]');

  const contentWrapperClasses = classNames(
    'flex',
    'md:items-start',
    'items-center',
    'flex-col',
    'self-end',
    'md:min-w-[300px]',
    'h-full',
    'md:pt-[65px]',
    'w-full',
  );

  const mobileNameWrapperClasses = classNames('md:hidden', 'flex', 'items-center', 'gap-1', 'py-[20px]', 'md:py-1');

  const pointsWrapperClasses = classNames(
    'flex',
    'flex-col',
    'items-center',
    'md:items-start',
    'gap-2',
    'w-full',
    'mb-[20px]',
  );

  const scoreClasses = classNames(
    'font-clash-grotesk',
    'font-semibold',
    'text-[35px]',
    'md:text-[45px]',
    'leading-none',
  );

  const rankWrapperClasses = classNames('flex', 'md:items-start', 'items-center', 'flex-col', 'gap-[10px]', 'w-full');

  const spinnerContainerClasses = classNames('flex', 'h-full', 'w-full', 'items-center', 'justify-center');
</script>

<div class={cardClasses}>
  <div class={gradientClasses}>
    <div class={hiddenDesktopNameClasses}>
      <ProfileName {profile} />
    </div>
  </div>

  <!-- Profile Picture -->
  <ProfilePicture {profile} {isSelfProfile} />

  {#if !loading}
    <div class={contentWrapperClasses}>
      <!-- Name (mobile)-->
      <div class={mobileNameWrapperClasses}>
        <ProfileName {profile} />
      </div>
      <!-- Points -->
      <div class={pointsWrapperClasses}>
        <div class="f-col md:f-row items-center gap-2">
          <div class={scoreClasses}>
            {displayedScore ? formatNumbers(displayedScore.toFixed(0)) : '0.00'}
          </div>
        </div>
      </div>

      <div class={rankWrapperClasses}>
        <ProfileStats {profile} />
      </div>
    </div>
  {:else}
    <div class={spinnerContainerClasses}>
      <Spinner />
    </div>
  {/if}
</div>
