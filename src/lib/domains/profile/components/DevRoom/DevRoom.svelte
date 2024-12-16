<script lang="ts">
  import { writeContract } from '@wagmi/core';
  import { type Address, isAddressEqual, zeroAddress } from 'viem';

  import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores/account';
  import claimBadge from '$shared/utils/badges/claimBadge';
  import { chainId } from '$shared/utils/chain';
  import { classNames } from '$shared/utils/classNames';
  import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';
  import { wagmiConfig } from '$shared/wagmi';

  const containerClass = classNames(
    'container',
    'w-full',
    'bg-elevated-background',
    'xl:max-w-[1344px]',
    'sm:rounded-b-[30px]',
    'rounded-t-[30px]',
    'md:rounded-tl-none',
    'rounded-[30px]',
    'relative',
  );

  const rowClass = classNames(
    'w-full',
    'grid',
    'grid-cols-3',
    'gap-y-[30px]',
    'items-center',
    'gap-x-[26px]',
    'px-[16px]',
    'pt-[34px]',
    'md:px-[47px]',
    'body-bold',
    'text-sm',
  );

  async function handleDevButton(handler: (address: Address) => Promise<void>) {
    if (!$account || !$account.address) {
      return;
    }
    const address = $account.address;

    try {
      await handler(address);
      successToast({
        title: 'Success',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error('claim badge error', e);
      errorToast({
        title: 'Error',
        message: e.message,
      });
    }
  }

  const buttons = [
    {
      text: 'Claim S1 Badge #0 - Ravers',
      handler: async (address: Address) => {
        await claimBadge(address, 0);
      },
    },
    {
      text: 'Claim S1 Badge #1 - Robots',
      handler: async (address: Address) => {
        await claimBadge(address, 1);
      },
    },
    {
      text: 'Claim S1 Badge #2 - Bouncers',
      handler: async (address: Address) => {
        await claimBadge(address, 2);
      },
    },
    {
      text: 'Claim S1 Badge #3 - Masters',
      handler: async (address: Address) => {
        await claimBadge(address, 3);
      },
    },
    {
      text: 'Claim S1 Badge #4 - Monks',
      handler: async (address: Address) => {
        await claimBadge(address, 4);
      },
    },
    {
      text: 'Claim S1 Badge #5 - Androids',
      handler: async (address: Address) => {
        await claimBadge(address, 5);
      },
    },
    {
      text: 'Claim S1 Badge #6 - Drummers',
      handler: async (address: Address) => {
        await claimBadge(address, 6);
      },
    },
    {
      text: 'Claim S1 Badge #7 - Shinto',
      handler: async (address: Address) => {
        await claimBadge(address, 7);
      },
    },
  ];

  function handleReceiverChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    receiverAddress = target.value as Address;
  }

  $: receiverAddress = zeroAddress as Address;
  $: tokenId = -1;
  $: canTransfer = true;
  async function handleTransferClick() {
    try {
      if (!canTransfer || !$account.address || tokenId < 0 || isAddressEqual(receiverAddress, zeroAddress)) {
        return;
      }

      canTransfer = false;
      await writeContract(wagmiConfig, {
        abi: trailblazersBadgesAbi,
        address: trailblazersBadgesAddress[chainId],
        functionName: 'safeTransferFrom',
        args: [$account.address, receiverAddress as Address, BigInt(tokenId)],
        chainId,
      });

      successToast({
        title: 'Transfer Success',
        message: `Badge with ID ${tokenId} transferred to ${receiverAddress}`,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      errorToast({
        title: 'Transfer Error',
        message: error.shortMessage || `Error transferring token ${tokenId} to ${receiverAddress}`,
      });
    } finally {
      canTransfer = true;
    }
  }
</script>

{#if isDevelopmentEnv}
  <div class={containerClass}>
    <div class={rowClass}>
      {#each buttons as button}
        <ActionButton
          priority="primary"
          class="!w-[200px]"
          on:click={() => {
            handleDevButton(button.handler);
          }}>
          {button.text}
        </ActionButton>
      {/each}
    </div>

    <div class="mt-6 py-6 flex flex-col">
      <h1>Badge transfer</h1>
      <div class={rowClass}>
        <input
          value={tokenId}
          on:change={(e) => {
            tokenId = parseInt(e.currentTarget?.value);
          }}
          placeholder="Token ID"
          class="w-full h-full rounded-full text-center" />
        <input
          value={receiverAddress}
          on:change={handleReceiverChanged}
          placeholder="Receiver Address"
          class="w-full h-full rounded-full text-center" />
        <ActionButton disabled={!canTransfer} on:click={handleTransferClick} priority="primary">Transfer</ActionButton>
      </div>
    </div>
  </div>
{/if}
