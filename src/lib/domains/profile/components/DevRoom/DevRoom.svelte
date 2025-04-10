<script lang="ts">
  import { writeContract } from '@wagmi/core';
  import { type Address, isAddressEqual, zeroAddress } from 'viem';

  import {
    badgeRecruitmentAbi,
    badgeRecruitmentAddress,
    trailblazersBadgesAbi,
    trailblazersBadgesAddress,
  } from '$generated/abi';
  import { getFactionName } from '$lib/domains/nfts/types/badges/types';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores/account';
  import { pendingTransactions } from '$shared/stores/pendingTransactions';
  import claimBadge from '$shared/utils/badges/claimBadge';
  import { chainId } from '$shared/utils/chain';
  import { classNames } from '$shared/utils/classNames';
  import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';
  import { wagmiConfig } from '$shared/wagmi';

  const containerClass = classNames(
    'container',
    'w-full',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
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

  const stopRecruitmentCylce = async () => {
    try {
      const tx = await writeContract(wagmiConfig, {
        abi: badgeRecruitmentAbi,
        address: badgeRecruitmentAddress[chainId],
        functionName: 'forceDisableAllRecruitments',
        args: [],
        chainId,
      });
      await pendingTransactions.add(tx);

      successToast({
        title: 'Success',
        message: 'Recruitment cycle stopped',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      errorToast({
        title: 'Error',
        message: error.shortMessage || 'Error stopping recruitment cycle',
      });
    }
  };

  const startRecruitments = async () => {
    try {
      const tx = await writeContract(wagmiConfig, {
        abi: badgeRecruitmentAbi,
        address: badgeRecruitmentAddress[chainId],
        functionName: 'enableRecruitments',
        args: [selectedRecruitments],
        chainId,
      });
      await pendingTransactions.add(tx);
      successToast({
        title: 'Success',
        message: 'Recruitment cycle started',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      errorToast({
        title: 'Error',
        message: error.shortMessage || 'Error starting recruitment cycle',
      });
    }
  };

  $: recruitmentArray = [false, false, false, false, false, false, false, false];

  $: selectedRecruitments = recruitmentArray.reduce((acc, curr, index) => {
    if (curr) {
      acc.push(BigInt(index));
    }
    return acc;
  }, [] as bigint[]);
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

    <div class="f-row w-full space-y-[20px] mt-[50px] px-[47px] pt-[34px]">
      <div class="f-col w-full">
        <h2>Recruitments</h2>
        <ActionButton class="max-w-[240px] !min-h-[30px]" priority="primary" on:click={stopRecruitmentCylce}>
          Stop Recruitment Cycle</ActionButton>

        <div class="f-row w-full space-[25px]">
          <div class="grid grid-cols-4 gap-[40px] mt-6">
            <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
            {#each recruitmentArray as _, index}
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">{getFactionName(index)} </span>
                  <input
                    type="checkbox"
                    bind:checked={recruitmentArray[index]}
                    class="checkbox checkbox-primary bg-black bg-opacity-50" />
                </label>
              </div>
            {/each}
          </div>
        </div>
        <ActionButton class="max-w-[240px] !min-h-[30px] mt-6" priority="primary" on:click={startRecruitments}>
          Start Recruitment Cycle
        </ActionButton>
      </div>
    </div>

    <div class="mt-6 py-6 flex flex-col space-y-[20px] mt-[50px] px-[47px] pt-[34px]">
      <h2>Badge transfer</h2>
      <div class={rowClass}>
        <label class="form-control w-full max-w-xs gap-1">
          <div class="label">
            <span class="label-text">TokenId</span>
          </div>
          <input
            value={tokenId}
            on:change={(e) => {
              tokenId = parseInt(e.currentTarget?.value);
            }}
            placeholder="Token ID"
            class=" input input-bordered input-primary w-full max-w-xs w-full h-[48px] rounded-full text-center" />
        </label>

        <label class="form-control w-full max-w-xs gap-1">
          <div class="label">
            <span class="label-text">Receiver Address</span>
          </div>

          <input
            value={receiverAddress}
            on:change={handleReceiverChanged}
            placeholder="Receiver Address"
            class="input input-bordered input-primary w-full max-w-xs w-full h-[48px] rounded-full text-center" />
        </label>

        <ActionButton class="place-self-end" disabled={!canTransfer} on:click={handleTransferClick} priority="primary"
          >Transfer</ActionButton>
      </div>
    </div>
  </div>
{/if}
