<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import { ActionButton } from '$components/Button';
  import { classNames } from '$libs/util/classNames';
  import { acceptSeason1EndModal, season1EndModal } from '$stores/modal';

  const modalClasses = classNames('modal', 'modal-bottom', 'md:modal-middle');

  const modalContentClasses = classNames(
    'modal-box',
    'relative',
    'px-6',
    'py-[35px]',
    'md:py-[35px]',
    'bg-neutral-background',
    'text-primary-content',
    'box-shadow-small',
    'space-y-[24px]',
  );

  const modalTitleClasses = classNames('font-clash-grotesk', 'font-bold', 'text-2xl', 'text-center', 'mb-[30px]');

  const modalTextClasses = classNames('body-regular', 'mb-[20px]', 'text-center');

  const closeButtonClasses = classNames(
    'btn',
    'btn-sm',
    'btn-circle',
    'btn-ghost',
    'absolute',
    'right-[10px]',
    'top-[10px]',
  );

  $: modal = undefined as HTMLDialogElement | undefined;
  onMount(() => {
    if (!modal) return;

    if ($season1EndModal) {
      modal.showModal();
    }
  });

  function closeModal() {
    if (!modal) return;
    acceptSeason1EndModal();
    modal.close();
  }

  const blogPostUrl = 'pending';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog on:click={closeModal} class={modalClasses} bind:this={modal}>
  <div class={modalContentClasses}>
    <button on:click={closeModal} class={closeButtonClasses}>✕</button>
    <h3 class={modalTitleClasses}>
      {$t('season1_end.title')}
    </h3>
    <img src="/banner/taiko-coin.svg" alt="Blacklisted" class="mx-auto mb-[20px] w-[200px]" />
    <p class={modalTextClasses}>{$t('season1_end.content')}</p>
    <ActionButton priority="primary" href={blogPostUrl}>{$t('common.learn_more')}</ActionButton>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
