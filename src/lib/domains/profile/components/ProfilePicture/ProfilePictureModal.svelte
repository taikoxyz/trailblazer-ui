<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { pfpModal, userProfile } from '$lib/domains/profile/stores';
  import type { BadgeDetailsByMovement, NFT } from '$lib/shared/types/NFT';
  import { closeOnEscapeOrOutsideClick } from '$lib/shared/utils/customActions';
  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import Spinner from '$shared/components/Spinner/Spinner.svelte';
  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';
  import getNftImage from '$shared/utils/nfts/getNftImage';
  import { badgeStore, taikoonStore, snaefellStore } from '$lib/domains/nfts/stores/nft.store';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import { shortenAddress } from '$shared/utils/shortenAddress';
  import { taikoonTokenAddress, trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
  import { chainId } from '$shared/utils/chain';
  import { isAddressEqual, type Address } from 'viem';

  const log = getLogger('ProfilePictureModal');

  const dialogId = crypto.randomUUID();

  let badgeMovements: BadgeDetailsByMovement | null = $badgeStore;
  let taikoons = $taikoonStore;
  let snaefell: NFT | null = $snaefellStore;

  $: modalContentWrapperClasses = classNames(
    'w-[100vw]',
    'h-[100vh]',
    'md:rounded-[20px]',
    'md:h-max',
    'bg-neutral-background',
    'md:w-[500px]',
    'lg:w-[700px]',
    'flex',
    'flex-col',
    previewVisible ? 'justify-between' : 'justify-start',
    'items-center',
    'relative',
  );

  const modalHeaderClasses = classNames(
    'w-full',
    'flex',
    'flex-row',
    'justify-between',
    'items-center',
    'py-[20px]',
    'px-[24px]',
    'border-divider-border',
    'border',
    'border-b-1',
    'border-l-0',
    'border-r-0',
    'border-t-0',
  );
  const modalTitleClasses = classNames('font-[700]', 'w-full', 'text-[18px]/[24px]');
  const modalFooterClasses = classNames(
    'py-[20px]',
    'px-[24px]',
    'gap-[20px]',
    'w-full',
    'flex',
    'h-max',
    'flex-row',
    'items-center',
    'justify-center',
    'border',
    'border-t-1',
    'border-l-0',
    'border-r-0',
    'border-b-0',
    'border-divider-border',
  );

  const closeButtonClasses = classNames(
    'h-[24px]',
    'w-[24px]',
    'focus:outline-none',
    'flex',
    'items-center',
    'justify-center',
  );

  const modalBodyClasses = classNames(
    'w-full',
    'h-full',
    'py-[20px]',
    'px-[24px]',
    'flex',
    'flex-row',
    'justify-center',
    'justify-center',
  );

  const selectorWrapperClasses = classNames(
    'w-full',
    'overflow-y-scroll',
    'md:max-h-[50vh]',
    'pb-[64px]',
    'md:pb-0',
    'h-full',
    'flex',
    'flex-col',
    'gap-[20px]',
  );

  const selectorTitleRowClasses = classNames(
    'text-[16px]/[24px]',
    'flex',
    'flex-row',
    'justify-start',
    'items-center',
    'relative',
  );
  const selectorTitleClasses = classNames('font-[700]');
  const selectorCounterClasses = classNames('pl-[5px]');

  const selectorGridClasses = classNames(
    'rounded-[20px]',
    'w-full',
    'grid',
    'grid-flow-row',
    'auto-rows-fr',
    'grid-cols-2',
    'md:grid-cols-3',
    'lg:grid-cols-4',
    'gap-[20px]',
    //'h-[600px]',
    'h-max', //'overflow-y-scroll',
    // 'md:h-[350px]',
    'transition-all',
    'bg-elevated-background',
    'p-[20px]',
    'relative',
    // 'min-h-[100px]',
  );
  const selectorGridItemClasses = classNames(
    'overflow-hidden',
    'border',
    'border-[3px]',
    'border-transparent',
    'hover:border-primary-focus',
    'transition-all',
    //'w-[124px]',
    // 'h-[124px]',
    'h-max',
    'w-full',
    'aspect-square',
    'rounded-[10px]',
  );

  $: modal = undefined as HTMLDialogElement | undefined;
  // stores all owned, candidate PFPs
  let possiblePFPs: NFT[] = [];
  // stores filtered PFPs
  let filteredPFPs: NFT[] = [];

  function updateFilteredPFPs() {
    filteredPFPs = possiblePFPs.filter((pfp) => {
      const addresses = activeFilter.addresses;
      let found = false;
      for (const address of addresses) {
        if (isAddressEqual(pfp.address, address as Address)) {
          found = true;
          break;
        }
      }
      return found;
    });
  }

  $: activeFilter, updateFilteredPFPs();

  onMount(async () => {
    const address = getConnectedAddress();
    const possibles = await profileService.getPossibleProfilePictures(address);
    possiblePFPs = possibles;
    filteredPFPs = possibles;
  });

  $: previewVisible = false;
  $: selectedPfp = null as NFT | null;

  function selectPfp(pfp: NFT) {
    selectedPfp = pfp;
    previewVisible = true;
  }

  function closeModal() {
    $pfpModal = false;
    modal?.close();
    previewVisible = false;
  }

  const pfpPreviewClasses = classNames('w-[250px]', 'h-[250px]', 'rounded-[20px]');

  const spinnerWrapperClasses = classNames('w-full', 'h-full', 'absolute', 'flex', 'justify-center', 'items-center');

  $: isLoading = false;
  async function handleButtonClick() {
    try {
      if (!selectedPfp) {
        return;
      }
      isLoading = true;
      log('Setting profile picture', selectedPfp);
      await profileService.setProfilePicture(selectedPfp);

      isLoading = false;
      successToast({
        title: $t('pfp.modal.success.title'),
        message: $t('pfp.modal.success.message'),
      });
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.warn(error);
      errorToast({
        title: $t('pfp.modal.error.title'),
        message: error.message,
      });
      isLoading = false;
    }
  }

  async function handleCancelClick() {
    if (previewVisible) {
      previewVisible = false;
    }
  }

  const noNftsClasses = classNames(
    'w-full',
    'h-full',
    'flex',
    'justify-center',
    'items-center',
    'bg-elevated-background',
    'rounded-[20px]',
    'p-[20px]',
  );

  const pfpPreviewWrapperClasses = classNames(
    'w-full',
    'h-full',
    'flex',
    'flex-col',
    'gap-[10px]',
    'justify-center',
    'items-center',
  );

  const filterWrapperClasses = classNames(
    'justify-center',
    'items-center',
    'flex',
    'p-[10px]',
    'gap-[10px]',
    'flex-wrap',
    'w-full',
  );

  const filters = [
    {
      label: 'All',
      addresses: [
        taikoonTokenAddress[chainId],
        '0xa5804b2a764f9808858355c1f1832588f47ab654',
        trailblazersBadgesAddress[chainId],
        trailblazersBadgesS2Address[chainId],
        '0xb941ac9AD2f10F38d9852B58cbFf709573E665AA',
        '0x56b0d8d04de22f2539945258ddb288c123026775',
      ],
    },
    { label: 'Taikoons', addresses: [taikoonTokenAddress[chainId]] },
    { label: 'Snaefell', addresses: ['0xa5804b2a764f9808858355c1f1832588f47ab654'] },
    {
      label: 'Trailblazer Badges',
      addresses: [trailblazersBadgesAddress[chainId], trailblazersBadgesS2Address[chainId]],
    },
    {
      label: 'Sentinels',
      addresses: ['0xb941ac9AD2f10F38d9852B58cbFf709573E665AA'],
    },
    {
      label: 'Taikonauts',
      addresses: ['0x56b0d8d04de22f2539945258ddb288c123026775'],
    },
  ];

  let activeFilterId = 0;
  $: activeFilter = filters[activeFilterId];
</script>

<dialog
  id={dialogId}
  class="modal"
  class:modal-open={$pfpModal}
  use:closeOnEscapeOrOutsideClick={{ enabled: $pfpModal, callback: closeModal, uuid: dialogId }}>
  <div class={modalContentWrapperClasses}>
    <div class={modalHeaderClasses}>
      <div class={modalTitleClasses}>
        {$t('pfp.modal.title')}
      </div>
      <button on:click={closeModal} class={closeButtonClasses}>
        <Icon type="x-close" size={18} />
      </button>
    </div>

    <div class={modalBodyClasses}>
      {#if previewVisible && selectedPfp}
        <div class={pfpPreviewWrapperClasses}>
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img alt="Profile picture preview" class={pfpPreviewClasses} src={getNftImage(selectedPfp)} />
          <div><b>Token Address:</b>{shortenAddress(selectedPfp.address)}</div>
          <div><b>Token ID:</b>{selectedPfp.tokenId}</div>
          <a
            target="_blank"
            class="text-secondary underline"
            href="https://taikoscan.io/nft/{selectedPfp.address}/{selectedPfp.tokenId}">
            View on Taikoscan</a>
        </div>
      {:else}
        <div class={selectorWrapperClasses}>
          <div class={selectorTitleRowClasses}>
            <div class={selectorTitleClasses}>
              {$t('pfp.modal.yourNfts')}
            </div>

            {#if possiblePFPs.length > 0}
              <div class={selectorCounterClasses}>
                ({possiblePFPs.length}
                {#if possiblePFPs.length > 1}
                  {$t('pfp.modal.item_plural')}
                {:else}
                  {$t('pfp.modal.item_singular')}
                {/if}
              </div>
            {/if}
          </div>
          {#if isLoading}
            <div class={spinnerWrapperClasses}>
              <Spinner size="lg" />
            </div>
          {/if}

          {#if possiblePFPs.length > 0}
            <div class={filterWrapperClasses}>
              {#each filters as filter, index}
                <button
                  on:click={() => (activeFilterId = index)}
                  class={classNames(
                    //'w-full',
                    'badge badge-outline badge-lg',
                    activeFilterId === index ? 'badge-primary' : 'opacity-50',
                  )}>
                  {filter.label}
                </button>
              {/each}
            </div>
            <div class={selectorGridClasses}>
              {#each filteredPFPs as pfp}
                <button on:click={() => selectPfp(pfp)} class={selectorGridItemClasses}>
                  <img
                    style="image-rendering:pixelated"
                    class="w-full h-full object-cover"
                    src={getNftImage(pfp)}
                    alt="pfp" />
                </button>
              {/each}
            </div>
          {/if}
          {#if possiblePFPs.length === 0}
            <div class={noNftsClasses}>You don't have any eligible NFTs.</div>
          {/if}
        </div>
      {/if}
    </div>

    {#if previewVisible}
      <div class={modalFooterClasses}>
        {#if previewVisible}
          <ActionButton on:click={handleCancelClick} disabled={isLoading} onPopup priority="secondary">
            {$t('pfp.modal.buttons.go_back')}
          </ActionButton>
        {/if}

        <ActionButton on:click={handleButtonClick} priority="primary" disabled={isLoading} onPopup loading={isLoading}>
          {$t('pfp.modal.buttons.save')}
        </ActionButton>
      </div>
    {/if}
    <button class="overlay-backdrop" data-modal-uuid={dialogId} />
  </div>
</dialog>
