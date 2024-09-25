<script lang="ts">
  import { t } from 'svelte-i18n';

  import { ActionButton } from '$components/Button';
  import { Icon } from '$components/Icon';
  import { errorToast, successToast } from '$components/NotificationToast';
  import Spinner from '$components/Spinner/Spinner.svelte';
  import { pfpModal } from '$lib/domains/profile/stores/profileStore';
  import Pfp from '$libs/pfp';
  import getUserNFTs from '$libs/pfp/getUserNFTs';
  import type { IPfp } from '$libs/pfp/types';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';
  import { currentProfile } from '$stores/profile';

  $: profile = $currentProfile;

  const modalContentWrapperClasses = classNames(
    'rounded-[20px]',
    'bg-neutral-background',
    'md:w-[500px]',
    'lg:w-[700px]',
    'w-[calc(100vw-96px)]',
  );

  const modalHeaderClasses = classNames(
    'w-full',
    'flex',
    'flex-row',
    'justify-between',
    'items-center',
    'py-[20px]',
    'px-[24px]',
  );
  const modalTitleClasses = classNames('font-[700]', 'w-full', 'text-[18px]/[24px]');
  const modalFooterClasses = classNames(
    'py-[20px]',
    'px-[24px]',
    'gap-[20px]',
    'w-full',
    'flex',
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
    'border',
    'border-t-1',
    'border-l-0',
    'border-r-0',
    'border-b-0',
    'w-full',
    'border-divider-border',
    'py-[20px]',
    'px-[24px]',
    'flex',
    'flex-row',
    'justify-center',
    'items-center',
  );

  const selectorWrapperClasses = classNames('w-full', 'flex', 'flex-col', 'gap-[20px]');

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
  const refreshButtonClasses = classNames(
    'bg-divider-border',
    'w-[38px]',
    'h-[38px]',
    'aspect-square',
    'rounded-full',
    'absolute',
    'right-0',
    'flex',
    'justify-center',
    'items-center',
    'hover:bg-primary-icon',
    'transition-colors',
    'active:bg-divider-border',
  );

  const selectorGridClasses = classNames(
    'rounded-[20px]',
    'w-full',
    'grid',
    'grid-cols-2',
    'md:grid-cols-3',
    'lg:grid-cols-4',
    'gap-[20px]',
    'h-[350px]',
    'transition-all',
    'bg-elevated-background',
    'p-[20px]',
    'overflow-y-scroll',
    'relative',
  );
  const selectorGridItemClasses = classNames(
    'overflow-hidden',
    'border',
    'border-[3px]',
    'border-transparent',
    'hover:border-primary-focus',
    'transition-all',
    'w-[124px]',
    'h-[124px]',
    'rounded-[10px]',
  );

  $: modal = undefined as HTMLDialogElement | undefined;

  $: $pfpModal, load();

  async function load() {
    if ($pfpModal && modal) {
      modal.showModal();
      await refreshPFPSources();
    }
  }

  $: possiblePFPs = [] as IPfp[];

  $: previewVisible = false;
  $: selectedPfp = null as IPfp | null;

  function selectPfp(pfp: IPfp) {
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

  async function refreshPFPSources() {
    possiblePFPs = [];

    if (!$account || !$account.address) {
      possiblePFPs = [];

      return;
    }
    isLoading = true;
    try {
      possiblePFPs = await getUserNFTs($account.address);
      isLoading = false;
    } catch (error) {
      console.warn(error);
      isLoading = false;
    }
  }

  $: isLoading = false;
  async function handleButtonClick() {
    try {
      if (!selectedPfp) {
        return;
      }
      isLoading = true;
      await Pfp.set(selectedPfp.address, selectedPfp.tokenId);

      profile.avatar = selectedPfp.src;
      currentProfile.set(profile);
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

  const noNftsClasses = classNames('absolute', 'w-full', 'h-full', 'flex', 'justify-center', 'items-center');
</script>

<dialog bind:this={modal} class="modal">
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
        <img alt="Profile picture preview" class={pfpPreviewClasses} src={selectedPfp.src} />
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
            <button on:click={refreshPFPSources} class={refreshButtonClasses}>
              <img src="/refresh.svg" class="w-[14px] h-[14px]" alt="refresh" />
            </button>
          </div>

          <div class={selectorGridClasses}>
            {#if possiblePFPs.length}
              {#each possiblePFPs as pfp}
                <button on:click={() => selectPfp(pfp)} class={selectorGridItemClasses}>
                  <img src={pfp.src} alt="pfp" />
                </button>
              {/each}
            {:else if isLoading}
              <div class={spinnerWrapperClasses}>
                <Spinner size="lg" />
              </div>
            {:else}
              <div class={noNftsClasses}>
                You don't have any eligible NFTs. Currently only Season 1 badges can be used. But we will enable more
                soon!
              </div>
            {/if}
          </div>
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
  </div>
</dialog>
