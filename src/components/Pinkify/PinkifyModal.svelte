<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  import { ActionButton, CloseButton } from '$components/Button';

  import { uid } from '$libs/util/uid';

  const dialogId = `dialog-${uid()}`;

  export let modalOpen: boolean;

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    modalOpen = false;
  };

  let imageLoaded = false;
  export let pinkifiedAvatar: string;

  function handleImageLoad() {
    imageLoaded = true;
  }

  $: if (modalOpen) {
    // placeholder
  }

  onMount(async () => {
    // placeholder
  });
</script>

<dialog id={dialogId} class="modal modal-bottom md:modal-middle" class:modal-open={modalOpen}>
  <div class="modal-box relative p-0 md:rounded-[20px] bg-neutral-background">
    <CloseButton onClick={closeModal} />
    <div class="f-center f-col w-full space-y-[30px] pt-[35px]">
      <img class="size-[328px]" src={pinkifiedAvatar} alt="avatar" />
      <div class="f-center f-col gap-[10px] w-[370px]">
        <div class="display-small-medium">Pinkified - Now Amplify!</div>
        <div class="body-small-regular text-center">
          Join the Revolution: Share your support with #CallofTaiko and become part of the movement.
        </div>
      </div>
      <div class="divider" />
      <button on:click={() => {}} class="self-center btn btn-block btn-primary body-bold">Share on X</button>
    </div>
  </div>
</dialog>
