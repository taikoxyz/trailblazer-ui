<script lang="ts">
  import { ZeroAddress } from 'ethers';
  import { onMount } from 'svelte';
  import type { Address } from 'viem';

  import { page } from '$app/stores';
  import { Button } from '$components/Button';
  import { errorToast } from '$components/NotificationToast';
  import { Spinner } from '$components/Spinner';
  import { MovementNames, Movements } from '$libs/badges/const';
  import getMovement from '$libs/badges/getMovement';
  import setMovement from '$libs/badges/setMovement';
  import { account } from '$stores/account';
  import { currentProfile } from '$stores/profile';

  $: isReady = false;
  $: urlAddress = $page.url.pathname.split('/').pop() || ZeroAddress;

  $: movement = -1;

  async function updateMovement(movement: Movements) {
    isReady = false;
    try {
      await setMovement(movement);
      currentProfile.set({
        ...$currentProfile,
        movement,
      });
      movement = await getMovement(urlAddress as Address);
    } catch (e) {
      console.error(e);
      errorToast({
        title: 'Error updating movement',
        message: e.message,
      });
    } finally {
      isReady = true;
    }
  }

  onMount(async () => {
    movement = await getMovement(urlAddress as Address);
    isReady = true;
  });
</script>

<div class="w-full h-max flex justify-center items-center">
  <div class="flex flex-col w-[300px] justify-center items-center gap-3">
    {#if isReady}
      <p>Your movement is <b>#{movement} {MovementNames[movement]}</b></p>
    {:else}
      <Spinner />
    {/if}
    {#if $account && $account.address && $account.address.toLowerCase() === urlAddress.toLowerCase()}
      {#each MovementNames as movementName, movementId}
        <Button
          wide
          block
          type="primary"
          disabled={!isReady || movementId === movement}
          on:click={() => updateMovement(movementId)}>{movementName}</Button>
      {/each}
    {/if}
  </div>
</div>
