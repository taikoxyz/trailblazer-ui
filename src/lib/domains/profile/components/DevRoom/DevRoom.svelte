<script lang="ts">
  import type { Address } from 'viem';

  import ActionButton from '$components/Button/ActionButton.svelte';
  import { errorToast, successToast } from '$components/NotificationToast';
  import claimBadge from '$libs/badges/claimBadge';
  import { classNames } from '$libs/util/classNames';
  import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
  import { account } from '$stores/account';

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
  </div>
{/if}
