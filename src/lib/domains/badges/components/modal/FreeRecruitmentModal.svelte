<script lang="ts">
  import { t } from 'svelte-i18n';

  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import CloseButton from '$shared/components/Button/CloseButton.svelte';
  import { freeRecruitmentModal } from '$shared/stores/recruitment';
  import { classNames } from '$shared/utils/classNames';

  const closeDialog = () => {
    freeRecruitmentModal.set(false);
  };

  const h1classes = classNames('text-[35px]', 'font-medium', 'leading-[42px]');
</script>

<dialog class="modal modal-middle backdrop-blur-lg" class:modal-open={$freeRecruitmentModal}>
  <div class="mx-[45px]">
    <div class="modal-box relative w-full bg-partner-dark-background absolute modal-glow">
      <div class="w-full f-between-center">
        <CloseButton onClick={closeDialog} />
        <h3 class="title-body-bold">{$t('badge_recruitment.modal.free_recruitment.title')}</h3>
      </div>
      <div class="h-sep mx-[-24px] mt-[20px] bg-[#5F2B5C]" />

      <div class="w-full h-full f-col items-center text-center">
        <img
          src="/factions/recruitment/free-recruit-modal.png"
          alt="Free recruitment"
          class="w-[150px] h-auto mb-[20px] mt-[50px]" />
        <div class="f-col space-y-[16px]">
          <h1 class={h1classes}>{$t('badge_recruitment.modal.free_recruitment.title')}</h1>
          <span>{$t('badge_recruitment.modal.free_recruitment.description.taikoon')}</span>
        </div>
        <div class="h-sep mx-[-24px] mt-[40px] mb-[20px] bg-[#5F2B5C]" />
        <ActionButton priority="primary" class="min-h-[56px]"
          >{$t('badge_recruitment.buttons.recruit_now')}</ActionButton>
      </div>
    </div>
  </div>
</dialog>

<style>
  .modal-glow {
    box-shadow: 0px 0px 50px 0px #e81899;
  }
</style>
