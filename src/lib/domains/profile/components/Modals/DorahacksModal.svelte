<script lang="ts">
  import { onMount } from 'svelte';

  import {
    CoreModalDescription,
    CoreModalFooter,
    CoreModalHeader,
    CoreModalTitle,
  } from '$lib/domains/badges/components/modal/components';
  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { doraHacksModal } from '$shared/stores/modal';
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames('modal');
  const contentWrapperClasses = classNames(
    'z-100',
    'fixed',
    'top-0',
    'left-0',
    'w-[100vw]',
    'h-[100vh]',
    'overflow-hidden',
    'glassy-background-lg',
    'bg-black',
    'bg-opacity-70',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
  );

  const contentClasses = classNames(
    'lg:justify-center',
    'overflow-y-scroll',
    'py-[20px]',
    'w-full',
    'h-full',
    'pt-[74px]',
    'lg:pt-0',
    'flex',
    'flex-col',
    'justify-start',
    'items-center',
    'gap-[24px]',
    'px-[20px]',
    'relative',
  );

  const closeButtonClasses = classNames(
    'w-[50px]',
    'h-[50px]',

    'bg-secondary-icon',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    'hover:bg-grey-900',
    'transition-all',
    // mobile
    'top-[10px]',
    'right-[10px]',
    // bigger

    'absolute',
    'md:top-[40px]',
    'md:right-[40px]',
  );

  const closeButtonIconClasses = classNames('fill-primary-icon', 'absolute', 'left-[11px]', 'top-[11px]');

  function closeModal() {
    confirm();
  }

  function confirm() {
    localStorage.setItem('hasSeenDorahacks', 'true');
    if (!modal) return;
    doraHacksModal.set(false);
    modal.close();
  }

  function load() {
    if ($doraHacksModal && modal) {
      modal.showModal();
    }
  }
  onMount(() => {
    const accepted = localStorage.getItem('hasSeenDorahacks') === 'true';
    if (!accepted) {
      doraHacksModal.set(true);
    }
  });

  $: modal = undefined as HTMLDialogElement | undefined;

  $: $doraHacksModal, load();
</script>

{#if $doraHacksModal}
  <dialog bind:this={modal} class={wrapperClasses} class:modal-open={$doraHacksModal}>
    <div class={contentWrapperClasses}>
      <div class={contentClasses}>
        <CoreModalHeader>
          <CoreModalTitle>Claim your 50k points now!</CoreModalTitle>
          <img src="/news/flame.svg" alt="flame" class="w-[224px] h-[224px]" />
          <CoreModalDescription>
            Have you voted for your favorite projects already and claimed your 50k points?
            <br /> <br />
            <b>Visit Dorahacks now!</b>
          </CoreModalDescription>
        </CoreModalHeader>

        <CoreModalFooter>
          <ActionButton
            class="w-[200px]"
            on:click={(e) => {
              e.preventDefault();
              confirm();
              window.open('https://dorahacks.io/grant/taiko/buidl', '_blank');
            }}
            priority="primary"
            withArrow>Go to Dorahacks</ActionButton>
        </CoreModalFooter>

        <button class={closeButtonClasses} on:click={closeModal}>
          <Icon type="x-close" class={closeButtonIconClasses} size={24} />
        </button>
      </div>
    </div>
  </dialog>
{/if}
