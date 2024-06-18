<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';

  import { Button } from '$components/Button';
  import { MovementNames, Movements } from '$libs/badges/const';
  import getMovement from '$libs/badges/getMovement';
  import setMovement from '$libs/badges/setMovement';
  import type { UserProfile } from '$libs/profile';
  import { currentProfile } from '$stores/profile';

  let profile: UserProfile;
  $: profile = $currentProfile;

  $: isReady = false;

  $: movement = -1;
  async function load() {
    if (!profile || !profile.address) return;
    isReady = false;
    movement = await getMovement(profile.address as Address);
    isReady = true;
  }

  async function updateMovement(movement: Movements) {
    isReady = false;
    await setMovement(movement);
    await load();
  }

  onMount(async () => {
    await load();
  });
</script>

<div class="w-full h-max flex justify-center items-center">
  <div class="flex flex-col w-[300px] justify-center items-center gap-3">
    {#if isReady}
      <p>Your movement is <b>#{movement} {MovementNames[movement]}</b></p>
    {:else}
      <div class="loading loading-spinner loading-md"></div>
    {/if}

    {#each MovementNames as movementName, movementId}
      <Button
        wide
        block
        type="primary"
        disabled={!isReady || movementId === movement}
        on:click={() => updateMovement(movementId)}>{movementName}</Button>
    {/each}
  </div>
</div>
