<script lang="ts">
  import { onMount } from 'svelte';

  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';
  import { closeOnEscapeOrOutsideClick } from '$shared/utils/customActions';

  import { statusDistributionModal } from '../stores/statusDistributionModalStore';

  const dialogId = crypto.randomUUID();

  const modalContentWrapperClasses = classNames(
    'w-[100vw]',
    'h-[100vh]',
    'md:rounded-[20px]',
    'md:h-max',
    'bg-neutral-background',
    'md:w-[500px]',
    'flex',
    'flex-col',
    'items-center',
    'relative',
  );

  const modalTitleClasses = classNames('font-[700]', 'w-full', 'text-[18px]/[24px]');

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

  const bodyWrapperClasses = classNames(
    'gap-[30px]',
    'flex',
    'justify-center',
    'items-center',
    'flex-col',
    'px-[50px]',
    'text-grey-200',
    'py-4',
    'md:h-max',
    'h-full',
  );

  const footerWrapperClasses = classNames(
    'border-t',
    'border-divider-border',
    'px-[50px]',
    'py-[20px]',
    'w-full',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'gap-4',
  );

  const closeButtonClasses = classNames(
    'h-[24px]',
    'w-[24px]',
    'focus:outline-none',
    'hover:opacity-80',
    'transition-opacity',
  );

  const iconClasses = classNames('w-[120px]', 'h-[120px]');

  const titleClasses = classNames('text-center', 'text-[24px]/[32px]', 'font-bold', 'text-primary-content');

  const descriptionClasses = classNames('text-center', 'text-[16px]/[24px]', 'text-secondary-content');

  function closeModal() {
    $statusDistributionModal = false;
    // Store the timestamp when modal was dismissed
    localStorage.setItem('statusDistributionModalDismissed', Date.now().toString());
  }

  function openMirrorPost() {
    window.open('https://taiko.mirror.xyz/SfIbIBBE1fDs2IjD4AxgK9r8IFi5LiqzsGpjb3sChIM', '_blank');
    closeModal();
  }

  // Check if modal should be shown (once per week)
  function shouldShowModal(): boolean {
    try {
      const dismissedTimestamp = localStorage.getItem('statusDistributionModalDismissed');
      if (!dismissedTimestamp) return true;

      const dismissedDate = new Date(parseInt(dismissedTimestamp));
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      return dismissedDate < oneWeekAgo;
    } catch (error) {
      console.warn('Error checking status modal timestamp:', error);
      return true; // Show modal if there's an error
    }
  }

  export let points: number = 0;
  export let show: boolean = false;

  $: if (show && shouldShowModal()) {
    $statusDistributionModal = true;
  }

  onMount(() => {
    // Reset modal state on mount
    if (!show) {
      $statusDistributionModal = false;
    }
  });
</script>

{#if $statusDistributionModal}
  <dialog
    id={dialogId}
    class="modal"
    class:modal-open={$statusDistributionModal}
    use:closeOnEscapeOrOutsideClick={{ enabled: $statusDistributionModal, callback: closeModal, uuid: dialogId }}>
    <div class={modalContentWrapperClasses}>
      <div class={modalHeaderClasses}>
        <div class={modalTitleClasses}>Status Points Distribution</div>
        <button on:click={closeModal} class={closeButtonClasses}>
          <Icon type="x-close" size={18} />
        </button>
      </div>

      <div class={bodyWrapperClasses}>
        <img alt="Success" src="/success.svg" class={iconClasses} />

        <div class={titleClasses}>Your new status points have been distributed</div>

        <div class={descriptionClasses}>
          Info: You have received {Math.round(points).toLocaleString()} points for holding TAIKO over the past 7 days!
        </div>
      </div>

      <div class={footerWrapperClasses}>
        <ActionButton on:click={openMirrorPost} priority="primary">Learn more</ActionButton>

        <ActionButton on:click={closeModal} priority="secondary">Close</ActionButton>
      </div>
    </div>
    <button class="overlay-backdrop" data-modal-uuid={dialogId} />
  </dialog>
{/if}
