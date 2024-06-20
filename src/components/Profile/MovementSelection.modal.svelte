<script lang="ts">
  import { onMount } from "svelte";


    export let visible = false

    let modal: any


    $: visible, updateVisibility()

    function updateVisibility(){
        console.log('updateVisibility', {
            modal,
            visible})
        if (!modal) return

        visible ? modal.showModal() : modal.close()
    }

    function onModalClosed(){
        visible = false
    }
</script>

<dialog bind:this={modal} on:close={onModalClosed} class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
