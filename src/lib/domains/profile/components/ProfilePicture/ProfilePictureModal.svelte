<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { pfpModal, userProfile } from '$lib/domains/profile/stores';
  import type { NFT } from '$lib/shared/types/NFT';
  import { closeOnEscapeOrOutsideClick } from '$lib/shared/utils/customActions';
  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { errorToast, successToast } from '$shared/components/NotificationToast';
  import Spinner from '$shared/components/Spinner/Spinner.svelte';
  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';
  import getNftImage from '$shared/utils/nfts/getNftImage';

  const log = getLogger('ProfilePictureModal');

  const dialogId = crypto.randomUUID();

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

  const selectorWrapperClasses = classNames('w-full', 'h-full', 'max-h-[85vh]', 'flex', 'flex-col', 'gap-[20px]');

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
    'grid-cols-2',
    'sm:grid-cols-2',
    'md:grid-cols-3',
    'lg:grid-cols-4',
    'md:gap-[20px]',
    'auto-rows-[1fr]',
    'gap-[10px]',
    'h-full',
    'transition-all',
    'bg-elevated-background',
    'md:p-[20px]',
    'p-[10px]',
    'relative',
    'overflow-y-scroll',
    'min-h-[100px]',
  );
  const selectorGridItemClasses = classNames('flex', 'justify-center', 'w-full', 'h-[30vw]', 'md:h-[124px]');

  const selectorGridItemImageClasses = classNames(
    'rounded-[10px]',
    'border',
    'border-[3px]',
    'border-transparent',
    'hover:border-primary',
    'transition-all',
    'max-w-full',
    'w-[30vw]',
    'h-[30vw]',
    'md:w-[124px]',
    'md:h-[124px]',
  );

  $: modal = undefined as HTMLDialogElement | undefined;

  $: possiblePFPs = [] as NFT[];

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

  function filterUniqueNfts(nfts: NFT[]) {
    // filters unique badges to not clog the ui
    const uq: string[] = [];
    return nfts.filter((nft) => {
      if (
        nft.metadata.season === undefined ||
        nft.metadata.movement === undefined ||
        nft.metadata.badgeId === undefined
      )
        return true;
      const key = `${nft.metadata.season}:${nft.metadata.movement}:${nft.metadata.badgeId}`;
      if (uq.includes(key)) return false;
      uq.push(key);
      return true;
    });
  }

  onMount(() => {
    possiblePFPs = filterUniqueNfts($userProfile?.nfts || []);
  });
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
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          alt="Profile picture preview"
          style="image-rendering:pixelated"
          class={pfpPreviewClasses}
          src={getNftImage(selectedPfp)} />
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
            <div class={selectorGridClasses}>
              {#each possiblePFPs as pfp}
                <button on:click={() => selectPfp(pfp)} class={selectorGridItemClasses}>
                  <img
                    src={getNftImage(pfp)}
                    alt="pfp"
                    class={selectorGridItemImageClasses}
                    style="image-rendering:pixelated" />
                </button>
              {/each}
            </div>
          {/if}
          {#if possiblePFPs.length === 0}
            <div class={noNftsClasses}>
              You don't have any eligible NFTs. Currently only Season 1 badges can be used. But we will enable more
              soon!
            </div>
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
