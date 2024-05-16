<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import { chainConfig } from '$chainConfig';
  import { ActionButton, CloseButton } from '$components/Button';
  import { Icon } from '$components/Icon';
  import { Spinner } from '$components/Spinner';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { uid } from '$libs/util/uid';
  import { parseTwitterAvatarId } from '$libs/util/parseTwitterAvatarId';
  import { twitterAvatarUrl } from '$stores/supabase';

  const dialogId = `dialog-${uid()}`;

  export let modalOpen: boolean;

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    modalOpen = false;
  };

  let imageLoaded = false;

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
      <img class="size-[328px]" src="/api/generate/{parseTwitterAvatarId($twitterAvatarUrl)}" alt="avatar" />
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
