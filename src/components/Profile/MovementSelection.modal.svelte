<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import { ActionButton } from '$components/Button';
  import { Icon } from '$components/Icon';
  import { errorToast } from '$components/NotificationToast';
  import Spinner from '$components/Spinner/Spinner.svelte';
  import { Movements } from '$libs/badges/const';
  import getMovement from '$libs/badges/getMovement';
  import setMovement from '$libs/badges/setMovement';
  import { classNames } from '$libs/util/classNames';
  import getConnectedAddress from '$libs/util/getConnectedAddress';
  import { currentProfile } from '$stores/profile';

  import MovementSelectionItem from './MovementSelectionItem.svelte';

  export let visible = true;

  let modal: HTMLDialogElement;

  $: visible, updateVisibility();
  $: isReady = false;
  $: chainMovement = -1;
  $: isUpdating = false;

  function updateVisibility() {
    if (!modal) return;
    visible ? modal.showModal() : modal.close();
  }

  async function updateMovement() {
    isUpdating = true;
    try {
      await setMovement(selectedMovement);
      currentProfile.set({
        ...$currentProfile,
        movement: selectedMovement,
      });
      chainMovement = selectedMovement;
      selectedMovement = await getMovement(getConnectedAddress());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      errorToast({
        title: 'Error updating Movement',
        message: e.shortMessage,
      });
    } finally {
      isUpdating = false;
    }
  }

  const backdropClasses = classNames(
    'modal',

    'fixed',
    'glassy-background-lg',
  );

  const contentWrapperClasses = classNames('flex', 'flex-col', 'justify-center', 'items-center', 'gap-6');

  const titleClasses = classNames('font-clash-grotesk', 'text-[35px]/[36px]', 'font-[500]', 'text-center');

  const descriptionClasses = classNames(
    'text-[16px]/[24px]',
    'font-[400]',
    'font-public-sans',
    'max-w-[800px]',
    'text-[#ADB1B8]',
    'text-center',
  );

  const movementWrapperClasses = classNames('flex', 'flex-row', 'gap-32', 'my-12');

  const buttonWrapperClasses = classNames('w-[250px]');

  const closeButtonClasses = classNames(
    'bg-[#2B303B]',
    'rounded-full',
    'w-[50px]',
    'h-[50px]',
    'flex',
    'justify-center',
    'items-center',
    'text-[#CACBCE]',
    'absolute',
    'top-4',
    'right-4',
  );

  $: selectedMovement = Movements.Neutral;

  onMount(async () => {
    chainMovement = await getMovement(getConnectedAddress());
    selectedMovement = chainMovement;
    isReady = true;
  });

  function setSelectedMovement(movement: Movements) {
    selectedMovement = movement;
  }
</script>

<dialog bind:this={modal} class={backdropClasses} on:close={() => (visible = false)}>
  {#if isReady}
    <div class={contentWrapperClasses}>
      <div class={titleClasses}>{$t('badges.movement.modal.title')}</div>

      <div class={descriptionClasses}>{$t('badges.movement.modal.description')}</div>

      <div class={movementWrapperClasses}>
        <MovementSelectionItem
          movement={Movements.Based}
          on:click={() => setSelectedMovement(Movements.Based)}
          active={selectedMovement === Movements.Based} />

        <MovementSelectionItem
          movement={Movements.Boosted}
          on:click={() => setSelectedMovement(Movements.Boosted)}
          active={selectedMovement === Movements.Boosted} />
      </div>

      <div class={buttonWrapperClasses}>
        <ActionButton
          on:click={updateMovement}
          loading={isUpdating}
          disabled={isUpdating || selectedMovement === Movements.Neutral || selectedMovement === chainMovement}
          priority="primary">
          {$t('badges.movement.modal.continueButton')}
        </ActionButton>
      </div>
    </div>
  {:else}
    <Spinner class="loading-lg" />
  {/if}

  <button class={closeButtonClasses} on:click={() => (visible = false)}>
    <Icon type="x-close" fillClass="fill-primary-icon" vWidth={24} vHeight={24} size={24} />
  </button>
</dialog>
