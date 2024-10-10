<script lang="ts">
  import { t } from 'svelte-i18n';

  import { ActionButton } from '$shared/components/Button';
  import { blacklistModal } from '$shared/stores/modal';
  import { classNames } from '$shared/utils/classNames';

  const handleButton = () => {
    window.open('https://taiko.mirror.xyz/zTL8AoTXdoTCZKQ5O13nGmbfRIpsObIs93bRVgz9kxk', '_blank');
  };

  // Define class variables using classNames
  const dialogClasses = classNames('modal');

  const modalBoxClasses = classNames(
    'modal-box relative md:px-[40px] px-[24px] py-[24px] md:py-[40px] bg-neutral-background text-primary-content box-shadow-small',
    'md:w-[500px]',
  );

  const titleClasses = classNames('font-semibold text-[35px] text-center mb-[30px]', 'leading-[42px]');

  const imageClasses = classNames('mx-auto mb-[20px] w-[150px]');

  const descriptionClasses = classNames('body-regular  text-center', 'text-secondary-content');

  const overlayClasses = classNames('overlay-backdrop');

  const buttonClasses = classNames('mt-[40px]');
</script>

<dialog class={dialogClasses} class:modal-open={$blacklistModal}>
  <div class={modalBoxClasses}>
    <img src="/icons/blacklist.svg" alt="Blacklisted" class={imageClasses} />
    <h3 class={titleClasses}>{$t('blackist_modal.title')}</h3>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <p class={descriptionClasses}>{@html $t('blacklist_modal.description')}</p>
    <ActionButton priority="primary" class={buttonClasses} on:click={handleButton}>
      {$t('common.learn_more')}
    </ActionButton>
  </div>
  <div class={overlayClasses} />
</dialog>
