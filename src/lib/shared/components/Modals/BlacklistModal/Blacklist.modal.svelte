<script lang="ts">
  import { t } from 'svelte-i18n';

  import { ActionButton } from '$shared/components/Button';
  import { blacklistModal } from '$shared/stores/modal';

  const handleButton = () => {
    window.open('https://taiko.mirror.xyz/zTL8AoTXdoTCZKQ5O13nGmbfRIpsObIs93bRVgz9kxk', '_blank');
  };
</script>

<dialog class="modal" class:modal-open={$blacklistModal}>
  <div
    class="modal-box relative px-6 py-[35px] md:py-[35px] bg-neutral-background text-primary-content box-shadow-small space-y-[24px]">
    <h3 class="font-bold text-2xl text-center mb-[30px]">{$t('blackist_modal.title')}</h3>
    <img src="/icons/blacklist.svg" alt="Blacklisted" class="mx-auto mb-[20px] w-[200px]" />
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <p class="body-regular mb-[20px] text-center">{@html $t('blacklist_modal.description')}</p>
    <ActionButton priority="primary" on:click={handleButton}>{$t('common.learn_more')}</ActionButton>
  </div>
  <div class="overlay-backdrop" />
</dialog>
