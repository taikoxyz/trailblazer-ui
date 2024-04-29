<script lang="ts">
  import Skeleton from '$components/Mock/Skeleton.svelte';

  import { currentProfile } from '$stores/profile';

  $: profile = $currentProfile;
</script>

<div class="flex items-center gap-4 bg-neutral rounded-full px-5 py-3 max-w-[364px]">
  Multipliers
  <div class="bg-elevated-background rounded-full px-5 py-3 overflow-x-scroll">
    <div class="flex gap-1 w-fit">
      <Skeleton width="w-4" height="h-4" bgColor="bg-blue-200" shineColor="bg-blue-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-red-200" shineColor="bg-red-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-yellow-200" shineColor="bg-yellow-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-green-200" shineColor="bg-green-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-blue-200" shineColor="bg-blue-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-red-200" shineColor="bg-red-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-yellow-200" shineColor="bg-yellow-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-green-200" shineColor="bg-green-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-blue-200" shineColor="bg-blue-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-red-200" shineColor="bg-red-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-yellow-200" shineColor="bg-yellow-100" />
      <Skeleton width="w-4" height="h-4" bgColor="bg-green-200" shineColor="bg-green-100" />
    </div>
  </div>
</div>
